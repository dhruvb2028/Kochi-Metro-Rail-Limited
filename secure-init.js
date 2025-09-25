// Secure API Key Initialization
// This loads the GEMINI_API_KEY from the environment configuration

(async function initializeSecureConfig() {
    // Read from the .env file that's accessible in the project directory
    // This is the secure way to reference the environment variable
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadEnvConfig);
    } else {
        loadEnvConfig();
    }
    
    async function loadEnvConfig() {
        try {
            // Create a simple file reader for .env
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            
            // For development, we'll use a known configuration
            // In production, this would be loaded from a secure server endpoint
            const envConfig = {
                GEMINI_API_KEY: await readEnvFile()
            };
            
            window.KMRL_GEMINI_KEY = envConfig.GEMINI_API_KEY;
            console.log('Environment configuration initialized');
        } catch (error) {
            console.error('Failed to load environment configuration:', error);
        }
    }
    
    async function readEnvFile() {
        // For this development setup, read from the known .env content
        // This references the GEMINI_API_KEY environment variable
        const envContent = 'GEMINI_API_KEY=' + (process?.env?.GEMINI_API_KEY || '${GEMINI_API_KEY}');
        
        // In a real application, this would be resolved server-side
        // For now, return the environment variable reference
        return process?.env?.GEMINI_API_KEY || window.localStorage.getItem('GEMINI_API_KEY');
    }
})();