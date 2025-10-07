// Environment Configuration Loader
// Note: For security in production, API keys should be handled server-side
class EnvironmentConfig {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // Try to load from secure config endpoint first
            const configResponse = await fetch('/api/config').catch(() => null);
            
            if (configResponse && configResponse.ok) {
                this.config = await configResponse.json();
                console.log('Environment configuration loaded from /api/config');
            } else {
                // Fallback to local config
                this.config = await this.getLocalConfig();
                console.log('Environment configuration loaded from fallback');
            }
        } catch (error) {
            console.warn('Failed to load environment config, using defaults:', error);
            this.config = await this.getLocalConfig();
        }
    }

    getEnvApiKey() {
        // In a development environment, we need to securely reference the API key
        // This is a placeholder - in practice, you'd have this loaded via a secure method
        // For now, we'll return null and handle this in the service layer
        const apiKey = process?.env?.GEMINI_API_KEY;
        
        if (!apiKey) {
            // For development, read from window context if available
            // This would be set by a secure initialization script
            return window.KMRL_GEMINI_KEY || null;
        }
        
        return apiKey;
    }

    parseEnvFile(envText) {
        const config = {};
        const lines = envText.split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                if (key && valueParts.length > 0) {
                    config[key.trim()] = valueParts.join('=').trim();
                }
            }
        }
        
        // Add default values
        config.APP_NAME = config.APP_NAME || 'KMRL Document Management System';
        config.APP_VERSION = config.APP_VERSION || '1.0.0';
        config.ENVIRONMENT = config.ENVIRONMENT || 'development';
        config.PORT = config.PORT || 8000;
        config.HOST = config.HOST || 'localhost';
        
        return config;
    }

    async getLocalConfig() {
        // Load configuration from .env file
        try {
            const envResponse = await fetch('/.env').catch(() => null);
            if (envResponse && envResponse.ok) {
                const envText = await envResponse.text();
                const parsedConfig = this.parseEnvFile(envText);
                console.log('Environment configuration loaded from .env file');
                return parsedConfig;
            }
        } catch (error) {
            console.warn('Could not load .env file:', error);
        }
        
        // Fallback configuration - NO hardcoded API key
        return {
            GOOGLE_GEMINI_API_KEY: null, // Must be loaded from .env file
            APP_NAME: 'KMRL Document Management System',
            APP_VERSION: '1.0.0',
            ENVIRONMENT: 'development',
            PORT: 8000,
            HOST: 'localhost'
        };
    }

    get(key) {
        return this.config[key];
    }

    getGeminiApiKey() {
        const apiKey = this.get('GOOGLE_GEMINI_API_KEY');
        if (!apiKey) {
            console.error('GOOGLE_GEMINI_API_KEY not found in environment configuration');
            console.warn('Make sure your .env file contains GOOGLE_GEMINI_API_KEY');
            return null;
        }
        return apiKey;
    }

    getAppName() {
        return this.get('APP_NAME');
    }

    getVersion() {
        return this.get('APP_VERSION');
    }

    isProduction() {
        return this.get('ENVIRONMENT') === 'production';
    }

    isDevelopment() {
        return this.get('ENVIRONMENT') === 'development';
    }
}

// Global environment configuration instance
window.envConfig = new EnvironmentConfig();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnvironmentConfig;
}