// Dashboard functionality
let currentPage = 'dashboard';
// currentUser and currentLanguage are declared in app.js

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    attemptInitialization();
});

function attemptInitialization(retryCount = 0) {
    if (typeof window.kmrlApp === 'undefined') {
        if (retryCount < 10) {
            console.log(`Waiting for app.js to load... (attempt ${retryCount + 1})`);
            setTimeout(() => {
                attemptInitialization(retryCount + 1);
            }, 100);
        } else {
            console.error('Failed to load app.js dependencies');
            alert('Failed to load application dependencies. Please refresh the page.');
        }
    } else {
        console.log('App dependencies loaded successfully');
        initializeDashboard();
    }
}

function initializeDashboard() {
    // Get user data from session storage
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
        // If no session data, create a demo user for direct access
        console.log('No session data found, creating demo user for direct dashboard access');
        currentUser = {
            username: 'Demo User',
            department: 'engineering',
            departmentName: 'Engineering Department',
            departmentNameML: 'എഞ്ചിനീയറിംഗ് വകുപ്പ്'
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        currentUser = JSON.parse(userData);
    }
    
    currentLanguage = localStorage.getItem('currentLanguage') || 'en';
    
    setupDashboard();
    loadDocuments();
    setupEventListeners();
    updateLanguageDisplay();
    setupCrossDepartmentSelector();
    
    // Initialize with some demo chat messages
    initializeDemoChats();
}

function setupDashboard() {
    // Update user info
    const userNameElement = document.getElementById('userName');
    if (currentUser.username === 'Demo User') {
        userNameElement.textContent = currentUser.username + ' (Demo Mode)';
        userNameElement.style.color = '#ff6b35';
        
        // Add demo mode notification
        showDemoModeNotification();
    } else {
        userNameElement.textContent = currentUser.username;
    }
    
    // Update department name
    const deptName = document.getElementById('deptName');
    if (currentLanguage === 'en') {
        deptName.textContent = currentUser.departmentName;
    } else {
        deptName.textContent = currentUser.departmentNameML;
    }
    
    // Update stats with demo data
    updateDashboardStats();
}

function updateDashboardStats() {
    const stats = {
        totalDocs: 156 + Math.floor(Math.random() * 20),
        processedToday: 23 + Math.floor(Math.random() * 10), 
        pendingReview: 7 + Math.floor(Math.random() * 5),
        aiSummaries: 142 + Math.floor(Math.random() * 15)
    };
    
    document.getElementById('totalDocs').textContent = stats.totalDocs;
    document.getElementById('processedToday').textContent = stats.processedToday;
    document.getElementById('pendingReview').textContent = stats.pendingReview;
    document.getElementById('aiSummaries').textContent = stats.aiSummaries;
}

function showDemoModeNotification() {
    // Create a temporary notification for demo mode
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        max-width: 300px;
        font-size: 14px;
        cursor: pointer;
    `;
    
    notification.innerHTML = `
        <strong>Demo Mode Active</strong><br>
        You accessed the dashboard directly. For proper login experience, 
        <a href="index.html" style="color: #fff; text-decoration: underline;">click here to go to login page</a>.
        <br><br><small>Click to dismiss</small>
    `;
    
    notification.addEventListener('click', () => {
        notification.remove();
    });
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 10000);
}

function setupEventListeners() {
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // File upload
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleFileDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }
    
    // Chat input enter key
    const chatInputs = document.querySelectorAll('.chat-input');
    chatInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (this.id === 'deptChatInput') {
                    sendDepartmentMessage();
                } else if (this.id === 'crossChatInput') {
                    sendCrossDepartmentMessage();
                } else if (this.id === 'docChatInput') {
                    sendDocumentQuestion();
                }
            }
        });
    });
}

function loadDocuments() {
    const userDept = currentUser.department;
    const userDocs = window.kmrlApp.mockDocuments[userDept] || [];
    
    // Load recent documents for dashboard
    loadRecentDocuments(userDocs.slice(0, 4));
    
    // Load all documents for documents page
    loadAllDocuments(userDocs);
}

function loadRecentDocuments(documents) {
    const container = document.getElementById('recentDocs');
    if (!container) return;
    
    container.innerHTML = '';
    
    documents.forEach(doc => {
        const docCard = createDocumentCard(doc);
        container.appendChild(docCard);
    });
}

function loadAllDocuments(documents) {
    const container = document.getElementById('allDocs');
    if (!container) return;
    
    container.innerHTML = '';
    
    documents.forEach(doc => {
        const docCard = createDocumentCard(doc);
        container.appendChild(docCard);
    });
}

function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.className = 'document-card fade-in';
    
    card.innerHTML = `
        <div class="document-header">
            <div class="document-meta">
                <div class="document-title">${doc.title}</div>
                <div class="document-source">
                    <i class="${window.kmrlApp.getSourceIcon(doc.source)}"></i>
                    <span>${currentLanguage === 'en' ? 'Source' : 'ഉറവിടം'}: ${doc.source}</span>
                </div>
                <div class="document-source">
                    <i class="fas fa-globe"></i>
                    <span>${currentLanguage === 'en' ? 'Language' : 'ഭാഷ'}: ${doc.language}</span>
                </div>
                <div class="document-source">
                    <i class="fas fa-calendar"></i>
                    <span>${window.kmrlApp.formatDate(doc.uploadDate)}</span>
                </div>
            </div>
            <div class="document-language">${doc.language}</div>
        </div>
        <div class="document-content">
            <div class="document-summary">${doc.summary}</div>
        </div>
        <div class="document-actions">
            <button class="btn btn-primary" onclick="viewDocument(${doc.id})">
                <i class="fas fa-eye"></i>
                <span data-en="View Document" data-ml="ഡോക്യുമെന്റ് കാണുക">${currentLanguage === 'en' ? 'View Document' : 'ഡോക്യുമെന്റ് കാണുക'}</span>
            </button>
            <button class="btn btn-success" onclick="chatWithDocument(${doc.id})">
                <i class="fas fa-comments"></i>
                <span data-en="Chat with Document" data-ml="ഡോക്യുമെന്റുമായി ചാറ്റ് ചെയ്യുക">${currentLanguage === 'en' ? 'Chat with Document' : 'ഡോക്യുമെന്റുമായി ചാറ്റ് ചെയ്യുക'}</span>
            </button>
            <button class="btn btn-secondary" onclick="downloadDocument(${doc.id})">
                <i class="fas fa-download"></i>
                <span data-en="Download" data-ml="ഡൗൺലോഡ്">${currentLanguage === 'en' ? 'Download' : 'ഡൗൺലോഡ്'}</span>
            </button>
        </div>
    `;
    
    return card;
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update sidebar active state
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    menuItems.forEach(item => item.classList.remove('active'));
    
    event.target.classList.add('active');
    currentPage = pageId;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentLanguage');
    window.location.href = 'index.html';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ml' : 'en';
    localStorage.setItem('currentLanguage', currentLanguage);
    updateLanguageDisplay();
    
    // Reload documents with new language
    loadDocuments();
    
    // Update department name
    const deptName = document.getElementById('deptName');
    if (currentLanguage === 'en') {
        deptName.textContent = currentUser.departmentName;
    } else {
        deptName.textContent = currentUser.departmentNameML;
    }
}

function updateLanguageDisplay() {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLanguage === 'en' ? 'മലയാളം' : 'English';
    }

    // Update all elements with data-en and data-ml attributes
    const elements = document.querySelectorAll('[data-en][data-ml]');
    elements.forEach(element => {
        if (currentLanguage === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else {
            element.textContent = element.getAttribute('data-ml');
        }
    });

    // Update select options
    const selectOptions = document.querySelectorAll('option[data-en][data-ml]');
    selectOptions.forEach(option => {
        if (currentLanguage === 'en') {
            option.textContent = option.getAttribute('data-en');
        } else {
            option.textContent = option.getAttribute('data-ml');
        }
    });

    // Update placeholders
    updatePlaceholders();
}

function updatePlaceholders() {
    const deptChatInput = document.getElementById('deptChatInput');
    const crossChatInput = document.getElementById('crossChatInput');
    const docChatInput = document.getElementById('docChatInput');
    
    if (deptChatInput) {
        deptChatInput.placeholder = currentLanguage === 'en' 
            ? 'Type your message...' 
            : 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...';
    }
    
    if (crossChatInput) {
        crossChatInput.placeholder = currentLanguage === 'en' 
            ? 'Type your message...' 
            : 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...';
    }
    
    if (docChatInput) {
        docChatInput.placeholder = currentLanguage === 'en' 
            ? 'Ask a question about this document...' 
            : 'ഈ ഡോക്യുമെന്റിനെക്കുറിച്ച് ഒരു ചോദ്യം ചോദിക്കുക...';
    }
}

// File upload handlers
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = Array.from(e.dataTransfer.files);
    processUploadedFiles(files);
}

function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processUploadedFiles(files);
}

async function processUploadedFiles(files) {
    // Clear file input to prevent double upload issue
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.value = '';
    }
    
    // Show upload modal
    showUploadModal(files);
}

function showUploadModal(files) {
    const modal = document.createElement('div');
    modal.className = 'upload-modal-overlay';
    modal.id = 'uploadModal';
    
    modal.innerHTML = `
        <div class="upload-modal">
            <div class="upload-modal-header">
                <h2 data-en="Document Upload & Processing" data-ml="ഡോക്യുമെന്റ് അപ്‌ലോഡും പ്രോസസിംഗും">Document Upload & Processing</h2>
                <button class="modal-close" onclick="closeUploadModal()">&times;</button>
            </div>
            <div class="upload-modal-content">
                <div id="fileProcessingList" class="file-processing-list">
                    <!-- File processing items will be added here -->
                </div>
                <div class="upload-actions">
                    <button id="startProcessingBtn" class="btn-primary" onclick="startFileProcessing()">
                        <i class="fas fa-play"></i>
                        <span data-en="Start Processing" data-ml="പ്രോസസിംഗ് ആരംഭിക്കുക">Start Processing</span>
                    </button>
                    <button id="cancelUploadBtn" class="btn-secondary" onclick="closeUploadModal()">
                        <i class="fas fa-times"></i>
                        <span data-en="Cancel" data-ml="റദ്ദാക്കുക">Cancel</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize file list
    initializeFileProcessingList(files);
    
    // Update language display for modal content
    updateLanguageDisplay();
}

function initializeFileProcessingList(files) {
    const fileList = document.getElementById('fileProcessingList');
    window.uploadQueue = [];
    
    Array.from(files).forEach((file, index) => {
        const fileId = `file_${Date.now()}_${index}`;
        const fileType = getFileType(file);
        const fileSize = formatFileSize(file.size);
        
        const fileItem = {
            id: fileId,
            file: file,
            type: fileType,
            status: 'pending',
            progress: 0,
            extractedData: null,
            summary: null,
            insights: null
        };
        
        window.uploadQueue.push(fileItem);
        
        const fileElement = document.createElement('div');
        fileElement.className = 'file-processing-item';
        fileElement.id = fileId;
        
        fileElement.innerHTML = `
            <div class="file-info">
                <div class="file-icon">
                    <i class="fas ${getFileIcon(file.name)}"></i>
                </div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">${fileSize} • ${fileType.toUpperCase()}</div>
                </div>
                <div class="file-status">
                    <span class="status-text" data-en="Ready" data-ml="തയ്യാർ">Ready</span>
                </div>
            </div>
            <div class="progress-container" style="display: none;">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="progress-text">0%</div>
            </div>
            <div class="processing-steps" style="display: none;">
                <div class="step" id="${fileId}_validation">
                    <i class="fas fa-check-circle step-icon"></i>
                    <span data-en="File Validation" data-ml="ഫയൽ പരിശോധന">File Validation</span>
                </div>
                <div class="step" id="${fileId}_ocr">
                    <i class="fas fa-eye step-icon"></i>
                    <span data-en="OCR Processing" data-ml="OCR പ്രോസസിംഗ്">OCR Processing</span>
                </div>
                <div class="step" id="${fileId}_ai">
                    <i class="fas fa-robot step-icon"></i>
                    <span data-en="AI Analysis" data-ml="AI വിശകലനം">AI Analysis</span>
                </div>
                <div class="step" id="${fileId}_insights">
                    <i class="fas fa-lightbulb step-icon"></i>
                    <span data-en="Extract Insights" data-ml="ഉൾക്കാഴ്ചകൾ വേർതിരിക്കുക">Extract Insights</span>
                </div>
                <div class="step" id="${fileId}_complete">
                    <i class="fas fa-check-double step-icon"></i>
                    <span data-en="Complete" data-ml="പൂർത്തിയായി">Complete</span>
                </div>
            </div>
            <div class="file-results" style="display: none;">
                <div class="results-tabs">
                    <button class="tab-btn active" onclick="showResultTab('${fileId}', 'summary')">
                        <span data-en="Summary" data-ml="സംഗ്രഹം">Summary</span>
                    </button>
                    <button class="tab-btn" onclick="showResultTab('${fileId}', 'insights')">
                        <span data-en="Insights" data-ml="ഉൾക്കാഴ്ചകൾ">Insights</span>
                    </button>
                    <button class="tab-btn" onclick="showResultTab('${fileId}', 'data')">
                        <span data-en="Extracted Data" data-ml="വേർതിരിച്ച ഡാറ്റ">Extracted Data</span>
                    </button>
                </div>
                <div class="tab-content active" id="${fileId}_summary_content">
                    <!-- Summary will be populated here -->
                </div>
                <div class="tab-content" id="${fileId}_insights_content">
                    <!-- Insights will be populated here -->
                </div>
                <div class="tab-content" id="${fileId}_data_content">
                    <!-- Extracted data will be populated here -->
                </div>
                <div class="file-actions">
                    <button class="btn-action" onclick="chatWithDocument('${fileId}')">
                        <i class="fas fa-comments"></i>
                        <span data-en="Chat with Document" data-ml="ഡോക്യുമെന്റുമായി ചാറ്റ് ചെയ്യുക">Chat with Document</span>
                    </button>
                    <button class="btn-action" onclick="saveDocument('${fileId}')">
                        <i class="fas fa-save"></i>
                        <span data-en="Save to Library" data-ml="ലൈബ്രറിയിൽ സേവ് ചെയ്യുക">Save to Library</span>
                    </button>
                </div>
            </div>
        `;
        
        fileList.appendChild(fileElement);
    });
}

async function startFileProcessing() {
    const startBtn = document.getElementById('startProcessingBtn');
    const cancelBtn = document.getElementById('cancelUploadBtn');
    
    startBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span data-en="Processing..." data-ml="പ്രോസസ് ചെയ്യുന്നു...">Processing...</span>';
    cancelBtn.disabled = true;
    
    for (const fileItem of window.uploadQueue) {
        await processFile(fileItem);
    }
    
    startBtn.innerHTML = '<i class="fas fa-check"></i> <span data-en="All Files Processed" data-ml="എല്ലാ ഫയലുകളും പ്രോസസ് ചെയ്തു">All Files Processed</span>';
    cancelBtn.disabled = false;
    cancelBtn.innerHTML = '<i class="fas fa-check"></i> <span data-en="Done" data-ml="പൂർത്തിയായി">Done</span>';
    
    // Update dashboard stats
    updateDashboardStats();
}

async function processFile(fileItem) {
    const fileElement = document.getElementById(fileItem.id);
    const statusText = fileElement.querySelector('.status-text');
    const progressContainer = fileElement.querySelector('.progress-container');
    const progressFill = fileElement.querySelector('.progress-fill');
    const progressText = fileElement.querySelector('.progress-text');
    const processingSteps = fileElement.querySelector('.processing-steps');
    
    // Show progress container and steps
    progressContainer.style.display = 'block';
    processingSteps.style.display = 'block';
    
    try {
        // Step 1: File Validation
        await updateProcessingStep(fileItem.id, 'validation', 'active');
        statusText.textContent = currentLanguage === 'en' ? 'Validating...' : 'പരിശോധിക്കുന്നു...';
        await simulateStep(500, 10, progressFill, progressText);
        await updateProcessingStep(fileItem.id, 'validation', 'completed');
        
        // Step 2: OCR Processing (if needed)
        if (isImageOrScannedDoc(fileItem.file)) {
            await updateProcessingStep(fileItem.id, 'ocr', 'active');
            statusText.textContent = currentLanguage === 'en' ? 'OCR Processing...' : 'OCR പ്രോസസിംഗ്...';
            fileItem.extractedData = await simulateOCRProcessing(fileItem, progressFill, progressText, 10, 40);
            await updateProcessingStep(fileItem.id, 'ocr', 'completed');
        } else {
            // Skip OCR for text documents
            await updateProcessingStep(fileItem.id, 'ocr', 'skipped');
            fileItem.extractedData = await simulateTextExtraction(fileItem);
            await simulateStep(800, 40, progressFill, progressText);
        }
        
        // Step 3: AI Analysis
        await updateProcessingStep(fileItem.id, 'ai', 'active');
        statusText.textContent = currentLanguage === 'en' ? 'AI Analysis...' : 'AI വിശകലനം...';
        fileItem.summary = await simulateAIAnalysis(fileItem, progressFill, progressText, 40, 70);
        await updateProcessingStep(fileItem.id, 'ai', 'completed');
        
        // Step 4: Extract Insights
        await updateProcessingStep(fileItem.id, 'insights', 'active');
        statusText.textContent = currentLanguage === 'en' ? 'Extracting Insights...' : 'ഉൾക്കാഴ്ചകൾ വേർതിരിക്കുന്നു...';
        fileItem.insights = await simulateInsightExtraction(fileItem, progressFill, progressText, 70, 95);
        await updateProcessingStep(fileItem.id, 'insights', 'completed');
        
        // Step 5: Complete
        await updateProcessingStep(fileItem.id, 'complete', 'active');
        statusText.textContent = currentLanguage === 'en' ? 'Finalizing...' : 'അന്തിമമാക്കുന്നു...';
        await simulateStep(500, 100, progressFill, progressText);
        await updateProcessingStep(fileItem.id, 'complete', 'completed');
        
        // Show results
        statusText.textContent = currentLanguage === 'en' ? 'Completed' : 'പൂർത്തിയായി';
        statusText.style.color = '#28a745';
        
        populateResults(fileItem);
        
        fileItem.status = 'completed';
        
    } catch (error) {
        console.error('Error processing file:', error);
        statusText.textContent = currentLanguage === 'en' ? 'Error' : 'പിശക്';
        statusText.style.color = '#dc3545';
        fileItem.status = 'error';
    }
}

async function simulateOCRProcessing(fileItem, progressFill, progressText, startProgress, endProgress) {
    const ocrSteps = [
        'Scanning document structure...',
        'Detecting text regions...',
        'Recognizing characters...',
        'Processing multilingual content...',
        'Validating extracted text...'
    ];
    
    const ocrStepsML = [
        'ഡോക്യുമെന്റ് ഘടന സ്കാൻ ചെയ്യുന്നു...',
        'ടെക്സ്റ്റ് മേഖലകൾ കണ്ടെത്തുന്നു...',
        'അക്ഷരങ്ങൾ തിരിച്ചറിയുന്നു...',
        'ബഹുഭാഷാ ഉള്ളടക്കം പ്രോസസ് ചെയ്യുന്നു...',
        'വേർതിരിച്ച ടെക്സ്റ്റ് സാധൂകരിക്കുന്നു...'
    ];
    
    const steps = currentLanguage === 'en' ? ocrSteps : ocrStepsML;
    const progressStep = (endProgress - startProgress) / steps.length;
    
    let extractedText = '';
    
    for (let i = 0; i < steps.length; i++) {
        const stepElement = document.getElementById(`${fileItem.id}_ocr`);
        const stepText = stepElement.querySelector('span');
        stepText.textContent = steps[i];
        
        const currentProgress = startProgress + (i + 1) * progressStep;
        await simulateStep(800 + Math.random() * 1200, currentProgress, progressFill, progressText);
        
        // Simulate text extraction based on file type
        if (i === 2) { // Character recognition step
            extractedText = generateMockExtractedText(fileItem.file.name);
        }
    }
    
    return {
        text: extractedText,
        confidence: 92 + Math.random() * 7,
        language: detectLanguage(fileItem.file.name),
        wordCount: extractedText.split(' ').length
    };
}

async function simulateTextExtraction(fileItem) {
    return {
        text: generateMockExtractedText(fileItem.file.name),
        confidence: 98,
        language: detectLanguage(fileItem.file.name),
        wordCount: generateMockExtractedText(fileItem.file.name).split(' ').length
    };
}

async function simulateAIAnalysis(fileItem, progressFill, progressText, startProgress, endProgress) {
    const aiSteps = [
        'Analyzing document structure...',
        'Identifying key topics...',
        'Generating summary...',
        'Categorizing content...'
    ];
    
    const aiStepsML = [
        'ഡോക്യുമെന്റ് ഘടന വിശകലനം ചെയ്യുന്നു...',
        'പ്രധാന വിഷയങ്ങൾ തിരിച്ചറിയുന്നു...',
        'സംഗ്രഹം സൃഷ്ടിക്കുന്നു...',
        'ഉള്ളടക്കം വർഗ്ഗീകരിക്കുന്നു...'
    ];
    
    const steps = currentLanguage === 'en' ? aiSteps : aiStepsML;
    const progressStep = (endProgress - startProgress) / steps.length;
    
    for (let i = 0; i < steps.length; i++) {
        const stepElement = document.getElementById(`${fileItem.id}_ai`);
        const stepText = stepElement.querySelector('span');
        stepText.textContent = steps[i];
        
        const currentProgress = startProgress + (i + 1) * progressStep;
        await simulateStep(1000 + Math.random() * 1500, currentProgress, progressFill, progressText);
    }
    
    return generateMockSummary(fileItem.file.name);
}

async function simulateInsightExtraction(fileItem, progressFill, progressText, startProgress, endProgress) {
    const insightSteps = [
        'Extracting financial data...',
        'Identifying deadlines...',
        'Finding key stakeholders...',
        'Analyzing risks and opportunities...'
    ];
    
    const insightStepsML = [
        'സാമ്പത്തിക ഡാറ്റ വേർതിരിക്കുന്നു...',
        'സമയപരിധികൾ കണ്ടെത്തുന്നു...',
        'പ്രധാന പങ്കാളികളെ കണ്ടെത്തുന്നു...',
        'അപകടസാധ്യതകളും അവസരങ്ങളും വിശകലനം ചെയ്യുന്നു...'
    ];
    
    const steps = currentLanguage === 'en' ? insightSteps : insightStepsML;
    const progressStep = (endProgress - startProgress) / steps.length;
    
    for (let i = 0; i < steps.length; i++) {
        const stepElement = document.getElementById(`${fileItem.id}_insights`);
        const stepText = stepElement.querySelector('span');
        stepText.textContent = steps[i];
        
        const currentProgress = startProgress + (i + 1) * progressStep;
        await simulateStep(700 + Math.random() * 1000, currentProgress, progressFill, progressText);
    }
    
    return generateMockInsights(fileItem.file.name);
}

// Document interaction functions
function viewDocument(docId) {
    const userDept = currentUser.department;
    const userDocs = window.kmrlApp.mockDocuments[userDept] || [];
    const doc = userDocs.find(d => d.id === docId);
    
    if (doc) {
        // Create a modal or new page to show full document
        showDocumentModal(doc);
    }
}

function showDocumentModal(doc) {
    const modal = document.createElement('div');
    modal.className = 'processing-overlay';
    modal.style.display = 'flex';
    modal.style.alignItems = 'flex-start';
    modal.style.paddingTop = '50px';
    
    modal.innerHTML = `
        <div class="processing-content" style="max-width: 80%; max-height: 80%; overflow-y: auto;">
            <div style="text-align: left; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 15px;">
                    <h2 style="color: var(--gov-primary); margin: 0;">${doc.title}</h2>
                    <button onclick="this.closest('.processing-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">&times;</button>
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        <div><strong>${currentLanguage === 'en' ? 'Source' : 'ഉറവിടം'}:</strong> ${doc.source}</div>
                        <div><strong>${currentLanguage === 'en' ? 'Language' : 'ഭാഷ'}:</strong> ${doc.language}</div>
                        <div><strong>${currentLanguage === 'en' ? 'Type' : 'തരം'}:</strong> ${doc.type}</div>
                        <div><strong>${currentLanguage === 'en' ? 'Date' : 'തീയതി'}:</strong> ${window.kmrlApp.formatDate(doc.uploadDate)}</div>
                    </div>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="color: var(--gov-primary); margin-bottom: 10px;">${currentLanguage === 'en' ? 'AI Generated Summary' : 'AI ജനറേറ്റഡ് സംഗ്രഹം'}</h3>
                    <p style="margin: 0; line-height: 1.6;">${doc.summary}</p>
                </div>
                <div>
                    <h3 style="color: var(--gov-primary); margin-bottom: 15px;">${currentLanguage === 'en' ? 'Full Document Content' : 'പൂർണ്ണ ഡോക്യുമെന്റ് ഉള്ളടക്കം'}</h3>
                    <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px; line-height: 1.8; text-align: justify;">
                        ${doc.content}
                    </div>
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn btn-success" onclick="chatWithDocument(${doc.id}); this.closest('.processing-overlay').remove();">
                        <i class="fas fa-comments"></i>
                        ${currentLanguage === 'en' ? 'Chat with Document' : 'ഡോക്യുമെന്റുമായി ചാറ്റ് ചെയ്യുക'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function chatWithDocument(docId) {
    const userDept = currentUser.department;
    const userDocs = window.kmrlApp.mockDocuments[userDept] || [];
    const doc = userDocs.find(d => d.id === docId);
    
    if (doc) {
        currentDocument = doc;
        document.getElementById('chatDocTitle').textContent = 
            `${currentLanguage === 'en' ? 'Chat with' : 'ചാറ്റ് ചെയ്യുക'}: ${doc.title}`;
        
        // Clear previous messages
        document.getElementById('docChatMessages').innerHTML = `
            <div class="message ai">
                ${currentLanguage === 'en' 
                    ? `Hello! I'm here to help you understand this document: "${doc.title}". What would you like to know about it?`
                    : `ഹലോ! ഈ ഡോക്യുമെന്റ് മനസ്സിലാക്കാൻ ഞാൻ ഇവിടെ സഹായിക്കും: "${doc.title}". ഇതിനെക്കുറിച്ച് നിങ്ങൾക്ക് എന്താണ് അറിയാൻ ആഗ്രഹം?`}
            </div>
        `;
        
        document.getElementById('docChatContainer').style.display = 'flex';
    }
}

function closeDocumentChat() {
    document.getElementById('docChatContainer').style.display = 'none';
    currentDocument = null;
}

async function sendDocumentQuestion() {
    const input = document.getElementById('docChatInput');
    const message = input.value.trim();
    
    if (!message || !currentDocument) return;
    
    const messagesContainer = document.getElementById('docChatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = message;
    messagesContainer.appendChild(userMessage);
    
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai';
    typingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...';
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
        // Get AI response
        const response = await window.kmrlApp.callGeminiAPI(message, currentDocument.content);
        
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);
        
        // Add AI response
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai';
        aiMessage.textContent = response;
        messagesContainer.appendChild(aiMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
    } catch (error) {
        console.error('Error getting AI response:', error);
        messagesContainer.removeChild(typingIndicator);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message ai';
        errorMessage.textContent = currentLanguage === 'en' 
            ? 'Sorry, I encountered an error. Please try again.'
            : 'ക്ഷമിക്കണം, ഒരു പിശക് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.';
        messagesContainer.appendChild(errorMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function downloadDocument(docId) {
    // Simulate document download
    const userDept = currentUser.department;
    const userDocs = window.kmrlApp.mockDocuments[userDept] || [];
    const doc = userDocs.find(d => d.id === docId);
    
    if (doc) {
        const downloadMsg = currentLanguage === 'en' 
            ? `Downloading "${doc.title}"...` 
            : `"${doc.title}" ഡൗൺലോഡ് ചെയ്യുന്നു...`;
        alert(downloadMsg);
    }
}

// Chat functionality
function setupCrossDepartmentSelector() {
    const selector = document.getElementById('targetDept');
    if (!selector) return;
    
    // Clear existing options except the first one
    while (selector.children.length > 1) {
        selector.removeChild(selector.lastChild);
    }
    
    // Add other departments
    Object.keys(window.kmrlApp.departments).forEach(deptKey => {
        if (deptKey !== currentUser.department) {
            const option = document.createElement('option');
            option.value = deptKey;
            option.setAttribute('data-en', window.kmrlApp.departments[deptKey].name);
            option.setAttribute('data-ml', window.kmrlApp.departments[deptKey].nameML);
            option.textContent = currentLanguage === 'en' 
                ? window.kmrlApp.departments[deptKey].name 
                : window.kmrlApp.departments[deptKey].nameML;
            selector.appendChild(option);
        }
    });
}

function sendDepartmentMessage() {
    const input = document.getElementById('deptChatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('deptChatMessages');
    addChatMessage(messagesContainer, message, 'user', currentUser.username);
    
    input.value = '';
    
    // Simulate response from colleague
    setTimeout(() => {
        const responses = [
            currentLanguage === 'en' ? "Thanks for the update!" : "അപ്‌ഡേറ്റിന് നന്ദി!",
            currentLanguage === 'en' ? "I'll look into this right away." : "ഞാൻ ഇത് ഉടനെ നോക്കാം.",
            currentLanguage === 'en' ? "Good point, let me check our records." : "നല്ല കാര്യം, ഞാൻ ഞങ്ങളുടെ രേഖകൾ പരിശോധിക്കാം.",
            currentLanguage === 'en' ? "Can you share more details?" : "കൂടുതൽ വിശദാംശങ്ങൾ പങ്കിടാമോ?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const colleagueName = currentLanguage === 'en' ? 'Colleague' : 'സഹപ്രവർത്തകൻ';
        addChatMessage(messagesContainer, randomResponse, 'ai', colleagueName);
    }, 1000 + Math.random() * 2000);
}

function sendCrossDepartmentMessage() {
    const input = document.getElementById('crossChatInput');
    const targetDept = document.getElementById('targetDept').value;
    const message = input.value.trim();
    
    if (!message || !targetDept) return;
    
    const messagesContainer = document.getElementById('crossChatMessages');
    addChatMessage(messagesContainer, message, 'user', currentUser.username);
    
    input.value = '';
    
    // Simulate response from other department
    setTimeout(() => {
        const responses = [
            currentLanguage === 'en' ? "We'll coordinate with your team on this." : "ഞങ്ങൾ ഇക്കാര്യത്തിൽ നിങ്ങളുടെ ടീമുമായി ഏകോപിപ്പിക്കും.",
            currentLanguage === 'en' ? "Let me get back to you with the details." : "വിശദാംശങ്ങളുമായി ഞാൻ നിങ്ങളെ വീണ്ടും ബന്ധപ്പെടാം.",
            currentLanguage === 'en' ? "This aligns with our current priorities." : "ഇത് ഞങ്ങളുടെ നിലവിലെ മുൻഗണനകളുമായി പൊരുത്തപ്പെടുന്നു.",
            currentLanguage === 'en' ? "We need to schedule a meeting for this." : "ഇതിനായി ഞങ്ങൾ ഒരു മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്യേണ്ടതുണ്ട്."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const deptName = window.kmrlApp.departments[targetDept][currentLanguage === 'en' ? 'name' : 'nameML'];
        addChatMessage(messagesContainer, randomResponse, 'ai', deptName);
    }, 1000 + Math.random() * 2000);
}

function loadCrossDepartmentChat() {
    const targetDept = document.getElementById('targetDept').value;
    const messagesContainer = document.getElementById('crossChatMessages');
    
    if (!targetDept) {
        messagesContainer.innerHTML = '';
        return;
    }
    
    // Load some demo messages for the selected department
    const demoMessages = [
        {
            text: currentLanguage === 'en' ? "Hello! How can we assist your department today?" : "ഹലോ! ഇന്ന് നിങ്ങളുടെ വകുപ്പിനെ എങ്ങനെ സഹായിക്കാം?",
            sender: window.kmrlApp.departments[targetDept][currentLanguage === 'en' ? 'name' : 'nameML'],
            type: 'ai'
        }
    ];
    
    messagesContainer.innerHTML = '';
    demoMessages.forEach(msg => {
        addChatMessage(messagesContainer, msg.text, msg.type, msg.sender);
    });
}

function addChatMessage(container, message, type, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = `
        <div style="font-size: 0.8rem; opacity: 0.7; margin-bottom: 5px;">
            ${sender} - ${new Date().toLocaleTimeString()}
        </div>
        <div>${message}</div>
    `;
    
    messageDiv.innerHTML = messageContent;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function initializeDemoChats() {
    // Initialize department chat with some demo messages
    const deptMessages = document.getElementById('deptChatMessages');
    const demoMessages = [
        {
            text: currentLanguage === 'en' ? "Good morning team! Any updates on today's operations?" : "ടീമിന് സുപ്രഭാതം! ഇന്നത്തെ പ്രവർത്തനങ്ങളിൽ എന്തെങ്കിലും അപ്‌ഡേറ്റുകൾ ഉണ്ടോ?",
            sender: currentLanguage === 'en' ? 'Team Lead' : 'ടീം ലീഡ്',
            type: 'ai'
        },
        {
            text: currentLanguage === 'en' ? "All systems running smoothly. Morning inspection completed." : "എല്ലാ സിസ്റ്റങ്ങളും സുഗമമായി പ്രവർത്തിക്കുന്നു. രാവിലെ പരിശോധന പൂർത്തിയാക്കി.",
            sender: currentLanguage === 'en' ? 'Colleague' : 'സഹപ്രവർത്തകൻ',
            type: 'ai'
        }
    ];
    
    demoMessages.forEach(msg => {
        addChatMessage(deptMessages, msg.text, msg.type, msg.sender);
    });
}

// Helper functions for upload system
function getFileType(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'];
    const docTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
    const spreadsheetTypes = ['xls', 'xlsx', 'csv'];
    const presentationTypes = ['ppt', 'pptx'];
    
    if (imageTypes.includes(extension)) return 'image';
    if (docTypes.includes(extension)) return 'document';
    if (spreadsheetTypes.includes(extension)) return 'spreadsheet';
    if (presentationTypes.includes(extension)) return 'presentation';
    return 'other';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileIcon(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const icons = {
        'pdf': 'fa-file-pdf',
        'doc': 'fa-file-word',
        'docx': 'fa-file-word',
        'xls': 'fa-file-excel',
        'xlsx': 'fa-file-excel',
        'ppt': 'fa-file-powerpoint',
        'pptx': 'fa-file-powerpoint',
        'txt': 'fa-file-alt',
        'jpg': 'fa-file-image',
        'jpeg': 'fa-file-image',
        'png': 'fa-file-image',
        'gif': 'fa-file-image',
        'csv': 'fa-file-csv'
    };
    return icons[extension] || 'fa-file';
}

function isImageOrScannedDoc(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'];
    return imageTypes.includes(extension) || file.name.toLowerCase().includes('scan');
}

function detectLanguage(filename) {
    // Simple language detection based on filename patterns
    if (filename.match(/[\u0D00-\u0D7F]/)) return 'Malayalam';
    if (filename.match(/[\u0900-\u097F]/)) return 'Hindi';
    return 'English';
}

function generateMockExtractedText(filename) {
    const templates = [
        "Kerala Metro Rail Limited (KMRL) is committed to providing sustainable urban transportation solutions for the state of Kerala. Our operations focus on safety, efficiency, and environmental responsibility.",
        "Project Status Report: Current infrastructure development is progressing as per schedule. All safety protocols are being strictly followed during construction phases.",
        "Financial Summary: Budget allocation for Q3 has been approved. Cost optimization measures have resulted in 12% savings compared to projected expenses.",
        "Technical Specifications: New rolling stock meets international safety standards. Advanced signaling systems have been installed and tested successfully.",
        "Environmental Impact Assessment: Green building practices implemented across all station developments. Carbon footprint reduced by 25% through sustainable practices."
    ];
    
    return templates[Math.floor(Math.random() * templates.length)] + " " + 
           "Additional content extracted from " + filename + " includes detailed analysis, " +
           "statistical data, and recommendations for implementation across various operational parameters.";
}

function generateMockSummary(filename) {
    const summaries = [
        "This document outlines the comprehensive operational framework for KMRL's Phase 2 expansion project. Key highlights include infrastructure development timelines, budget allocations, and stakeholder coordination strategies.",
        "Financial analysis report covering quarterly performance metrics, revenue projections, and cost optimization strategies. The document emphasizes sustainable growth and operational efficiency improvements.",
        "Technical documentation detailing safety protocols, maintenance schedules, and quality assurance procedures for metro operations. Includes compliance requirements and best practices.",
        "Project management guidelines covering resource allocation, timeline management, and risk mitigation strategies for ongoing infrastructure development initiatives.",
        "Environmental sustainability report highlighting green initiatives, carbon footprint reduction measures, and community impact assessments for metro rail operations."
    ];
    
    return summaries[Math.floor(Math.random() * summaries.length)];
}

function generateMockInsights(filename) {
    return [
        {
            type: 'financial',
            title: currentLanguage === 'en' ? 'Budget Analysis' : 'ബജറ്റ് വിശകലനം',
            content: currentLanguage === 'en' ? 
                'Current expenditure is 8% under budget with projected savings of ₹2.3 crores for this quarter.' :
                'നിലവിലെ ചെലവ് ബജറ്റിൽ നിന്ന് 8% കുറവാണ്, ഈ പാദത്തിൽ ₹2.3 കോടി രൂപയുടെ സമ്പാദ്യം പ്രതീക്ഷിക്കുന്നു.',
            priority: 'high'
        },
        {
            type: 'deadline',
            title: currentLanguage === 'en' ? 'Critical Deadlines' : 'നിർണായക സമയപരിധികൾ',
            content: currentLanguage === 'en' ? 
                'Project milestone due in 15 days. Environmental clearance renewal required by month-end.' :
                '15 ദിവസത്തിനുള്ളിൽ പ്രോജക്റ്റ് നാഴികക്കല്ല്. മാസാവസാനം പരിസ്ഥിതി ക്ലിയറൻസ് പുതുക്കൽ ആവശ്യം.',
            priority: 'urgent'
        },
        {
            type: 'stakeholder',
            title: currentLanguage === 'en' ? 'Key Stakeholders' : 'പ്രധാന പങ്കാളികൾ',
            content: currentLanguage === 'en' ? 
                'Coordination required with Transport Department, Local Administration, and Contractor representatives.' :
                'ഗതാഗത വകുപ്പ്, പ്രാദേശിക ഭരണകൂടം, കരാറുകാരുടെ പ്രതിനിധികൾ എന്നിവരുമായി ഏകോപനം ആവശ്യം.',
            priority: 'medium'
        }
    ];
}

async function simulateStep(duration, targetProgress, progressFill, progressText) {
    return new Promise(resolve => {
        setTimeout(() => {
            progressFill.style.width = `${targetProgress}%`;
            progressText.textContent = `${Math.round(targetProgress)}%`;
            resolve();
        }, duration);
    });
}

async function updateProcessingStep(fileId, step, status) {
    const stepElement = document.getElementById(`${fileId}_${step}`);
    if (!stepElement) return;
    
    const icon = stepElement.querySelector('.step-icon');
    
    stepElement.classList.remove('active', 'completed', 'skipped');
    stepElement.classList.add(status);
    
    if (status === 'completed') {
        icon.className = 'fas fa-check-circle step-icon';
        icon.style.color = '#28a745';
    } else if (status === 'active') {
        icon.className = 'fas fa-spinner fa-spin step-icon';
        icon.style.color = '#007bff';
    } else if (status === 'skipped') {
        icon.className = 'fas fa-minus-circle step-icon';
        icon.style.color = '#6c757d';
    }
    
    return new Promise(resolve => setTimeout(resolve, 200));
}

function populateResults(fileItem) {
    const fileElement = document.getElementById(fileItem.id);
    const resultsContainer = fileElement.querySelector('.file-results');
    
    // Populate summary
    const summaryContent = document.getElementById(`${fileItem.id}_summary_content`);
    summaryContent.innerHTML = `
        <div class="result-section">
            <h4>${currentLanguage === 'en' ? 'Document Summary' : 'ഡോക്യുമെന്റ് സംഗ്രഹം'}</h4>
            <p>${fileItem.summary}</p>
        </div>
        <div class="result-section">
            <h4>${currentLanguage === 'en' ? 'Processing Details' : 'പ്രോസസിംഗ് വിശദാംശങ്ങൾ'}</h4>
            <div class="processing-stats">
                <span><strong>${currentLanguage === 'en' ? 'Confidence:' : 'ആത്മവിശ്വാസം:'}</strong> ${fileItem.extractedData.confidence.toFixed(1)}%</span>
                <span><strong>${currentLanguage === 'en' ? 'Language:' : 'ഭാഷ:'}</strong> ${fileItem.extractedData.language}</span>
                <span><strong>${currentLanguage === 'en' ? 'Words:' : 'വാക്കുകൾ:'}</strong> ${fileItem.extractedData.wordCount}</span>
            </div>
        </div>
    `;
    
    // Populate insights
    const insightsContent = document.getElementById(`${fileItem.id}_insights_content`);
    const insightsList = fileItem.insights.map(insight => `
        <div class="insight-item priority-${insight.priority}">
            <div class="insight-header">
                <h5>${insight.title}</h5>
                <span class="priority-badge ${insight.priority}">${insight.priority.toUpperCase()}</span>
            </div>
            <p>${insight.content}</p>
        </div>
    `).join('');
    
    insightsContent.innerHTML = `
        <div class="result-section">
            <h4>${currentLanguage === 'en' ? 'Key Insights' : 'പ്രധാന ഉൾക്കാഴ്ചകൾ'}</h4>
            <div class="insights-list">
                ${insightsList}
            </div>
        </div>
    `;
    
    // Populate extracted data
    const dataContent = document.getElementById(`${fileItem.id}_data_content`);
    dataContent.innerHTML = `
        <div class="result-section">
            <h4>${currentLanguage === 'en' ? 'Extracted Text' : 'വേർതിരിച്ച ടെക്സ്റ്റ്'}</h4>
            <div class="extracted-text">
                ${fileItem.extractedData.text}
            </div>
        </div>
    `;
    
    // Show results container
    resultsContainer.style.display = 'block';
}

function showResultTab(fileId, tabName) {
    // Hide all tab contents for this file
    const tabContents = document.querySelectorAll(`#${fileId}_summary_content, #${fileId}_insights_content, #${fileId}_data_content`);
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const fileElement = document.getElementById(fileId);
    const tabButtons = fileElement.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab content
    const targetContent = document.getElementById(`${fileId}_${tabName}_content`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function saveDocument(fileId) {
    const fileItem = window.uploadQueue.find(item => item.id === fileId);
    if (!fileItem) return;
    
    // Simulate saving to document library
    const message = currentLanguage === 'en' ? 
        `Document "${fileItem.file.name}" has been saved to your library.` :
        `ഡോക്യുമെന്റ് "${fileItem.file.name}" നിങ്ങളുടെ ലൈബ്രറിയിൽ സേവ് ചെയ്തു.`;
    
    alert(message);
    
    // Update dashboard stats
    updateDashboardStats();
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.remove();
    }
    
    // Clear upload queue
    window.uploadQueue = [];
}