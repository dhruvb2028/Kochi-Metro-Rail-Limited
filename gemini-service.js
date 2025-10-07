// Gemini AI Service for Document Chat
class GeminiService {
    constructor() {
        this.client = null;
        this.isInitialized = false;
        this.initializeClient();
    }

    async initializeClient() {
        // Wait for environment config to load
        let retryCount = 0;
        while ((!window.envConfig || !window.envConfig.config) && retryCount < 50) {
            await new Promise(resolve => setTimeout(resolve, 100));
            retryCount++;
        }

        if (!window.envConfig || !window.envConfig.config || !window.envConfig.config.GOOGLE_GEMINI_API_KEY) {
            console.error('GOOGLE_GEMINI_API_KEY not found in environment configuration');
            console.log('Available config:', window.envConfig?.config);
            return false;
        }

        try {
            // Equivalent to: from google import genai; client = genai.Client()
            // In browser environment, we simulate this with the REST API
            this.apiKey = window.envConfig.config.GOOGLE_GEMINI_API_KEY;
            this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
            
            // Create client object matching genai.Client() interface
            this.client = {
                models: {
                    generate_content: this.generateContent.bind(this)
                }
            };
            
            this.isInitialized = true;
            console.log('Gemini client initialized (genai.Client() equivalent) with model gemini-2.5-flash');
            return true;
        } catch (error) {
            console.error('Failed to initialize Gemini client:', error);
            return false;
        }
    }

    async generateContent({ model, contents }) {
        if (!this.isInitialized) {
            await this.initializeClient();
        }

        if (!this.isInitialized) {
            throw new Error('Gemini client not initialized');
        }

        try {
            // Exact equivalent to: client.models.generate_content(model="gemini-2.5-flash", contents="...")
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: Array.isArray(contents) ? contents : [{ parts: [{ text: contents }] }],
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.8,
                        topK: 40,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(`API request failed: ${response.status} ${response.statusText}${errorData ? ' - ' + JSON.stringify(errorData) : ''}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return {
                    text: data.candidates[0].content.parts[0].text
                };
            } else {
                throw new Error('Invalid response format from Gemini API');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw new Error(`Failed to generate response: ${error.message}`);
        }
    }

    buildPrompt(userQuestion, documentContext) {
        const currentLang = window.currentLanguage || 'en';
        const langInstruction = currentLang === 'ml' ? 
            'Please respond in Malayalam.' : 
            'Please respond in English.';

        return `You are an AI assistant helping with document analysis for Kochi Metro Rail Limited (KMRL). 
${langInstruction}

Document Context:
${documentContext}

User Question: ${userQuestion}

Instructions:
1. Answer based primarily on the provided document context
2. If the question cannot be answered from the document, mention this clearly
3. Keep responses concise but informative
4. Use professional language appropriate for a government organization
5. If responding in Malayalam, use proper Malayalam script

Answer:`;
    }

    async chatWithDocument(question, documentData) {
        const documentContext = this.prepareDocumentContext(documentData);
        const prompt = this.buildPrompt(question, documentContext);
        
        // Exact equivalent to:
        // response = client.models.generate_content(
        //     model="gemini-2.5-flash",
        //     contents="Explain how AI works in a few words",
        // )
        const response = await this.client.models.generate_content({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        
        return response.text;
    }

    prepareDocumentContext(documentData) {
        if (!documentData) return '';

        const currentLang = window.currentLanguage || 'en';
        
        let context = `Title: ${documentData.title}\n`;
        context += `Type: ${documentData.type}\n`;
        context += `Source: ${documentData.source}\n`;
        context += `Date: ${documentData.uploadDate}\n\n`;
        
        // Use localized content based on current language
        if (currentLang === 'ml') {
            context += `Summary: ${documentData.summaryML || documentData.summary}\n\n`;
            context += `Content: ${documentData.contentML || documentData.content}`;
        } else {
            context += `Summary: ${documentData.summaryEN || documentData.summary}\n\n`;
            context += `Content: ${documentData.contentEN || documentData.content}`;
        }

        return context;
    }

    async generateDocumentSummary(documentContent, title) {
        const currentLang = window.currentLanguage || 'en';
        const langInstruction = currentLang === 'ml' ? 
            'Please provide the summary in Malayalam.' : 
            'Please provide the summary in English.';

        const prompt = `Please create a concise summary of this document for Kochi Metro Rail Limited.
${langInstruction}

Document Title: ${title}
Document Content: ${documentContent}

Please provide:
1. A brief summary (2-3 sentences)
2. Key points or findings
3. Any actionable items if applicable

Summary:`;

        return await this.generateContent(prompt);
    }

    async generateInsights(documentContent, title) {
        const currentLang = window.currentLanguage || 'en';
        const langInstruction = currentLang === 'ml' ? 
            'Please provide the insights in Malayalam.' : 
            'Please provide the insights in English.';

        const prompt = `Analyze this document for Kochi Metro Rail Limited and provide key insights.
${langInstruction}

Document Title: ${title}
Document Content: ${documentContent}

Please provide:
1. Key insights and observations
2. Potential impacts or implications
3. Recommendations if applicable

Insights:`;

        return await this.generateContent(prompt);
    }
}

// Global Gemini service instance
window.geminiService = new GeminiService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeminiService;
}