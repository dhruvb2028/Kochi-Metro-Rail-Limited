# KMRL Document Management System

## Overview
This is an automated document management solution for Kochi Metro Rail Limited (KMRL) designed to address the document overload problem. The system integrates AI-powered document processing, multilingual support, and cross-department communication.

## Features

### 🤖 AI-Powered Document Processing
- **Automatic OCR**: Processes scanned documents and images
- **AI Summarization**: Generates concise summaries using Google Gemini API
- **Document Classification**: Automatically categorizes documents by type and department
- **Multilingual Support**: Handles both English and Malayalam documents

### 💬 Communication Features
- **Department Chat**: Internal communication within departments
- **Cross-Department Chat**: Coordination between different departments
- **Chat with Documents**: AI-powered Q&A with document content
- **Real-time Messaging**: Instant communication capabilities

### 📋 Document Management
- **Multi-source Integration**: Supports documents from email, Maximo, SharePoint, WhatsApp, cloud links
- **Version Control**: Tracks document versions and changes
- **Search & Filter**: Advanced search capabilities across all documents
- **Access Control**: Department-based access permissions

### 🌐 User Interface
- **Government Portal Design**: Official Kerala Government styling
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Language Toggle**: Switch between English and Malayalam
- **Accessibility**: WCAG compliant design

## Technology Stack

### Frontend
- **HTML5/CSS3**: Modern web standards
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons and visual elements
- **Responsive Grid**: Mobile-first design approach

### AI Integration
- **Google Gemini API**: Document analysis and chat functionality
- **OCR Processing**: Text extraction from images and scanned documents
- **Natural Language Processing**: Multilingual text understanding

### Data Management
- **Session Storage**: User authentication state
- **Local Storage**: User preferences and settings
- **Mock Data**: Comprehensive demo dataset for testing

## Department Structure

### Supported Departments
1. **Train Operations** (ട്രെയിൻ ഓപ്പറേഷൻസ്)
2. **Engineering & Maintenance** (എഞ്ചിനീയറിംഗ് & മെയിന്റനൻസ്)
3. **Procurement** (സംഭരണം)
4. **Human Resources** (ഹ്യൂമൻ റിസോഴ്സ്)
5. **Finance & Accounts** (സാമ്പത്തികം & അക്കൗണ്ടുകൾ)
6. **Safety & Security** (സുരക്ഷ & സെക്യൂരിറ്റി)
7. **Legal & Compliance** (നിയമപരം & കംപ്ലയൻസ്)
8. **Administration** (അഡ്മിനിസ്ട്രേഷൻ)

## Document Sources

The system supports documents from various sources:
- **Email**: Outlook, Gmail integrations
- **Maximo Exports**: Asset management system exports
- **SharePoint Repositories**: Collaborative document storage
- **WhatsApp PDFs**: Mobile document sharing
- **Hard-copy Scans**: Physical document digitization
- **Ad-hoc Cloud Links**: Google Drive, OneDrive, etc.
- **Regulatory Directives**: Government and regulatory documents
- **Board Meeting Minutes**: Executive meeting records

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI features
- Google Gemini API key

### Environment Setup
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. The API key will be automatically loaded by the application

**Security Note**: Never commit your `.env` file to version control. The `.env` file is already included in `.gitignore`.

### Installation
1. Download or clone the project files
2. Set up your environment variables (see Environment Setup above)
3. Start a local HTTP server (required for environment loading):
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000/index.html` in your browser

### Demo Login
- **Department**: Select any department from dropdown
- **Username**: Enter any username
- **Password**: Enter any password (demo mode accepts any password)

### Direct Dashboard Access
- You can access the dashboard directly via `http://localhost:8000/dashboard.html`
- The system will automatically create a demo user for testing
- Demo mode is indicated by orange "Demo User (Demo Mode)" text
- A notification will guide you to the proper login page if desired

### Usage Flow
1. **Login**: Choose department and credentials
2. **Dashboard**: View document statistics and recent documents
3. **Upload**: Add new documents for AI processing
4. **Documents**: Browse and search all documents
5. **Chat**: Communicate within and across departments
6. **Document Chat**: Ask questions about specific documents

## API Integration

### Google Gemini API
```javascript
// API key is now loaded from environment configuration
await initializeConfig(); // Loads API key from .env

// Usage example
const response = await callGeminiAPI(prompt, documentContext);
```

### Document Processing Flow
1. **Upload**: User uploads document
2. **OCR**: Extract text from images/scans
3. **AI Analysis**: Generate summary and insights
4. **Classification**: Categorize document type
5. **Storage**: Save with metadata
6. **Notification**: Alert relevant departments

## Multilingual Support

### Language Toggle
- Switch between English and Malayalam
- All UI elements translate automatically
- Document content remains in original language
- AI responses adapt to user's language preference

### Supported Languages
- **English**: Primary interface language
- **Malayalam**: Regional language support
- **Mixed Content**: Handles bilingual documents

## Demo Data

The system includes comprehensive demo data:
- **156+ Mock Documents**: Realistic KMRL documents
- **8 Departments**: Full organizational structure
- **Multiple Document Types**: Reports, incidents, financial statements
- **Various Sources**: Email, SharePoint, WhatsApp, etc.
- **Bilingual Content**: English and Malayalam documents

## Security Features

### Authentication
- Department-based login system
- Session management
- Secure token handling (simulated)

### Access Control
- Department-level document access
- Role-based permissions
- Secure document sharing

## Performance Optimizations

### Frontend
- Lazy loading of documents
- Efficient DOM manipulation
- Optimized CSS and JavaScript
- Responsive image handling

### AI Integration
- Caching of AI responses
- Batch processing for multiple documents
- Error handling and retry logic
- Rate limiting for API calls

## Future Enhancements

### Planned Features
- **Advanced Analytics**: Document processing insights
- **Workflow Automation**: Automated document routing
- **Integration APIs**: Connect with existing KMRL systems
- **Mobile App**: Native mobile application
- **Advanced Search**: Full-text search across all documents
- **Audit Trail**: Complete document access logging

### Technical Improvements
- **Real Database**: Replace mock data with actual database
- **User Management**: Complete user authentication system
- **File Storage**: Cloud-based document storage
- **Real-time Updates**: WebSocket-based live updates
- **Performance Monitoring**: System health and usage analytics

## Browser Support

### Minimum Requirements
- **Chrome**: Version 70+
- **Firefox**: Version 65+
- **Safari**: Version 12+
- **Edge**: Version 79+

### Recommended
- Latest version of any modern browser
- JavaScript enabled
- Minimum 1024x768 screen resolution

## Troubleshooting

### Common Issues
1. **Login Problems**: Clear browser cache and cookies
2. **Language Not Switching**: Refresh the page
3. **Documents Not Loading**: Check internet connection
4. **Chat Not Working**: Verify API connectivity

### Support
For technical support or questions about the KMRL Document Management System, please contact the IT department or system administrators.

## License
This system is developed for the Government of Kerala - Kochi Metro Rail Limited. All rights reserved.

## Acknowledgments
- Government of Kerala
- Kochi Metro Rail Limited
- Google Gemini AI
- Open source libraries and frameworks used