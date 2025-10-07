// Configuration file for KMRL Document Management System

const KMRL_CONFIG = {
    // API Configuration
    api: {
        geminiApiKey: (window.envConfig?.getGeminiApiKey && window.envConfig?.getGeminiApiKey()) || null,
        geminiModel: 'gemini-2.5-flash',
        maxTokens: 1000,
        temperature: 0.7
    },

    // System Settings
    system: {
        name: 'KMRL Document Management System',
        version: '1.0.0',
        organization: 'Government of Kerala',
        department: 'Kochi Metro Rail Limited',
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'ml'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        supportedFileTypes: ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg'],
        sessionTimeout: 30 * 60 * 1000 // 30 minutes
    },

    // UI Configuration
    ui: {
        theme: {
            primaryColor: '#003366',
            secondaryColor: '#FFF700',
            accentColor: '#FF6B35',
            successColor: '#28A745',
            warningColor: '#FFC107',
            dangerColor: '#DC3545'
        },
        animations: {
            fadeInDuration: 500,
            slideInDuration: 300,
            loadingSpinnerSize: '60px'
        },
        pagination: {
            documentsPerPage: 12,
            messagesPerPage: 50
        }
    },

    // Document Processing
    processing: {
        ocrTimeout: 30000, // 30 seconds
        aiSummaryTimeout: 45000, // 45 seconds
        maxSummaryLength: 500,
        autoClassification: true,
        autoSummarization: true,
        supportedOcrLanguages: ['en', 'ml', 'hi'],
        processingSteps: {
            upload: 'File Upload',
            ocr: 'OCR Processing',
            classification: 'Document Classification',
            summarization: 'AI Summarization',
            storage: 'Secure Storage',
            notification: 'Notification'
        }
    },

    // Chat Configuration
    chat: {
        maxMessageLength: 1000,
        typingIndicatorDelay: 1000,
        messageRetentionDays: 90,
        maxChatHistory: 100,
        aiResponseDelay: {
            min: 1000,
            max: 3000
        },
        autoSave: true,
        enableFileSharing: true,
        maxFileShareSize: 5 * 1024 * 1024 // 5MB
    },

    // Security Settings
    security: {
        enableEncryption: true,
        sessionStorageEncryption: false, // For demo purposes
        maxLoginAttempts: 3,
        passwordMinLength: 6,
        enableAuditLog: true,
        dataRetentionPeriod: 365, // days
        securityHeaders: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
        }
    },

    // Notification Settings
    notifications: {
        enablePushNotifications: false, // For demo
        enableEmailNotifications: true,
        enableInAppNotifications: true,
        notificationTypes: {
            newDocument: true,
            documentProcessed: true,
            chatMessage: true,
            systemAlert: true,
            maintenanceMode: true
        },
        retryAttempts: 3,
        retryDelay: 5000
    },

    // Analytics & Reporting
    analytics: {
        enableTracking: true,
        trackUserInteractions: true,
        generateReports: true,
        reportFrequency: 'weekly',
        metricsToTrack: [
            'documentsProcessed',
            'userLogins',
            'chatMessages',
            'searchQueries',
            'downloadCount',
            'errorRate',
            'responseTime'
        ]
    },

    // Demo Mode Settings
    demo: {
        enabled: true,
        autoLogin: false,
        mockApiResponses: true,
        simulateProcessingDelay: true,
        showDemoIndicators: false, // Set to false to hide demo badges
        preloadSampleData: true,
        enableAllFeatures: true
    },

    // Integration Settings
    integrations: {
        maximo: {
            enabled: false,
            apiEndpoint: '',
            apiKey: ''
        },
        sharepoint: {
            enabled: false,
            siteUrl: '',
            clientId: ''
        },
        email: {
            enabled: false,
            smtpServer: '',
            port: 587,
            username: '',
            password: ''
        },
        whatsapp: {
            enabled: false,
            businessApiKey: ''
        }
    },

    // Performance Settings
    performance: {
        enableCaching: true,
        cacheExpiration: 3600000, // 1 hour
        enableCompression: true,
        enableLazyLoading: true,
        maxConcurrentUploads: 3,
        chunkedUploadSize: 1024 * 1024, // 1MB chunks
        enableServiceWorker: false // For demo
    },

    // Backup & Recovery
    backup: {
        enableAutoBackup: false, // For demo
        backupFrequency: 'daily',
        retentionPeriod: 30, // days
        backupLocation: 'cloud',
        enablePointInTimeRecovery: false
    },

    // Accessibility
    accessibility: {
        enableScreenReader: true,
        enableHighContrast: true,
        enableKeyboardNavigation: true,
        fontSize: {
            min: 12,
            default: 14,
            max: 20
        },
        supportedScreenReaders: ['NVDA', 'JAWS', 'VoiceOver']
    },

    // Localization
    localization: {
        defaultTimezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        timeFormat: '24-hour',
        currencyFormat: 'INR',
        numberFormat: 'en-IN',
        rtlSupport: false,
        pluralizationRules: {
            en: 'english',
            ml: 'malayalam'
        }
    },

    // Error Handling
    errorHandling: {
        enableGlobalErrorHandler: true,
        logLevel: 'info', // debug, info, warn, error
        enableErrorReporting: false, // For demo
        maxErrorLogs: 1000,
        enableUserFeedback: true,
        fallbackLanguage: 'en'
    },

    // Development Settings
    development: {
        enableDebugMode: false,
        enableConsoleLogging: true,
        enablePerformanceMonitoring: false,
        enableA11yTesting: false,
        mockDataDelay: {
            min: 500,
            max: 2000
        }
    }
};

// Environment-specific configurations
const ENVIRONMENTS = {
    development: {
        api: {
            baseUrl: 'http://localhost:3000',
            timeout: 30000
        },
        logging: {
            level: 'debug',
            enableConsole: true
        }
    },
    staging: {
        api: {
            baseUrl: 'https://staging-api.kmrl.gov.in',
            timeout: 15000
        },
        logging: {
            level: 'info',
            enableConsole: false
        }
    },
    production: {
        api: {
            baseUrl: 'https://api.kmrl.gov.in',
            timeout: 10000
        },
        logging: {
            level: 'error',
            enableConsole: false
        },
        security: {
            enableEncryption: true,
            enforceHttps: true
        }
    }
};

// Feature flags for gradual rollout
const FEATURE_FLAGS = {
    aiDocumentChat: true,
    crossDepartmentChat: true,
    advancedSearch: true,
    bulkUpload: true,
    documentVersioning: false,
    realTimeCollaboration: false,
    advancedAnalytics: false,
    mobileApp: false,
    voiceCommands: false,
    blockchainVerification: false
};

// Export configuration
window.KMRL_CONFIG = KMRL_CONFIG;
window.ENVIRONMENTS = ENVIRONMENTS;
window.FEATURE_FLAGS = FEATURE_FLAGS;

// Utility function to get current environment
window.getCurrentEnvironment = function() {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    } else if (hostname.includes('staging')) {
        return 'staging';
    } else {
        return 'production';
    }
};

// Utility function to check if feature is enabled
window.isFeatureEnabled = function(featureName) {
    return FEATURE_FLAGS[featureName] === true;
};

// Utility function to get configuration value
window.getConfig = function(path) {
    const keys = path.split('.');
    let value = KMRL_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    
    return value;
};