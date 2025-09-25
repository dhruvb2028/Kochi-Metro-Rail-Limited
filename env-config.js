// Environment Configuration Loader
// Note: For security in production, API keys should be handled server-side
class EnvironmentConfig {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // In a real production environment, this would be loaded from a secure server endpoint
            // For development/demo purposes, we'll use a fallback approach
            
            // Try to load from a config endpoint (you would implement this server-side)
            const response = await fetch('/api/config').catch(() => null);
            
            if (response && response.ok) {
                this.config = await response.json();
            } else {
                // Fallback to environment variables (for local development)
                this.config = this.getLocalConfig();
            }
            
            console.log('Environment configuration loaded');
        } catch (error) {
            console.warn('Failed to load environment config, using defaults:', error);
            this.config = this.getLocalConfig();
        }
    }

    getLocalConfig() {
        // For development - in production, this should come from server
        return {
            GEMINI_API_KEY: process?.env?.GEMINI_API_KEY || 'AIzaSyA7lbppzwlt-2mZwIGualHEYfkGe6NMqOA',
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
        return this.get('GEMINI_API_KEY');
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