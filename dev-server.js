const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Simple development server to serve files and environment config
const PORT = 8082;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle environment config endpoint
    if (pathname === '/api/config') {
        try {
            // Read .env file and parse it
            const envPath = path.join(__dirname, '.env');
            const envContent = fs.readFileSync(envPath, 'utf8');
            
            const config = {};
            envContent.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                // Skip empty lines and comments
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const [key, ...valueParts] = trimmedLine.split('=');
                    if (key && valueParts.length > 0) {
                        config[key.trim()] = valueParts.join('=').trim();
                    }
                }
            });
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                GOOGLE_GEMINI_API_KEY: config.GOOGLE_GEMINI_API_KEY,
                APP_NAME: 'KMRL Document Management System',
                APP_VERSION: '1.0.0',
                ENVIRONMENT: 'development'
            }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to load environment configuration' }));
        }
        return;
    }

    // Handle direct .env file requests
    if (pathname === '/.env') {
        try {
            const envPath = path.join(__dirname, '.env');
            const envContent = fs.readFileSync(envPath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(envContent);
        } catch (error) {
            res.writeHead(404);
            res.end('Environment file not found');
        }
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}/`);
});