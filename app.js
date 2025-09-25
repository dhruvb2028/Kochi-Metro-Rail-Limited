// Global variables
let currentUser = null;
let currentLanguage = 'en';
let currentDocument = null;

// Gemini API Configuration - Now loaded from environment
let GEMINI_API_KEY = null;

// Initialize API key from environment config
async function initializeConfig() {
    // Wait for environment config to load
    if (window.envConfig) {
        await window.envConfig.loadConfig();
        GEMINI_API_KEY = window.envConfig.getGeminiApiKey();
    } else {
        // Fallback for development
        GEMINI_API_KEY = 'AIzaSyA7lbppzwlt-2mZwIGualHEYfkGe6NMqOA';
    }
    console.log('API configuration initialized');
}

// Mock data for demo
const mockDocuments = {
    operations: [
        {
            id: 1,
            title: "Daily Operations Report - Phase 2 Extension",
            source: "SharePoint repositories",
            language: "English",
            uploadDate: "2024-09-24",
            content: "The Phase 2 extension of Kochi Metro has been showing remarkable progress with daily ridership exceeding 85,000 passengers. The new stations at Kakkanad and InfoPark have been particularly successful in attracting IT professionals and students. Train frequency has been optimized to every 4 minutes during peak hours and every 8 minutes during off-peak hours. The operations team has successfully managed 347 train services daily with 99.2% on-time performance. Key operational highlights include implementation of new crowd management protocols at major interchange stations, introduction of digital passenger information systems across all platforms, and integration of real-time tracking systems for better service reliability. Maintenance windows have been scheduled between 11:30 PM and 5:30 AM to ensure minimal disruption to passenger services. The technical team has reported excellent performance from the rolling stock with minimal breakdown incidents. Energy consumption has been optimized through regenerative braking systems, resulting in 15% reduction in overall power consumption compared to previous quarters.",
            summary: "Phase 2 extension shows excellent performance with 85,000+ daily passengers, 99.2% on-time performance, and optimized energy consumption through regenerative braking systems.",
            type: "Operations Report"
        },
        {
            id: 2,
            title: "Incident Report - Signal Malfunction at Aluva Station",
            source: "Maximo exports",
            language: "English",
            uploadDate: "2024-09-23",
            content: "On September 23, 2024, at approximately 14:30 hours, a signal malfunction was reported at Aluva station affecting the northbound track. The incident was triggered by a power fluctuation in the signaling control system, causing automatic safety protocols to activate and halt train movements for 23 minutes. The technical response team was immediately dispatched and arrived on-site within 8 minutes of the incident report. Initial diagnostics revealed a faulty relay in the signal control panel, which was promptly replaced with a backup unit from the station's emergency inventory. During the incident period, passenger announcements were made in both English and Malayalam explaining the delay and expected resolution time. Alternative transportation arrangements were coordinated with KSRTC for passengers requiring immediate connectivity. The signaling system was fully restored at 14:53 hours, and normal train operations resumed with a minor 5-minute delay propagation across the network. Post-incident analysis revealed that the relay had exceeded its operational lifecycle and was due for replacement as per the preventive maintenance schedule. All similar relays across the network have been marked for immediate inspection and replacement if necessary.",
            summary: "Signal malfunction at Aluva station on Sept 23 caused 23-minute delay. Faulty relay replaced within 23 minutes, normal operations resumed with preventive maintenance scheduled for similar components.",
            type: "Incident Report"
        }
    ],
    engineering: [
        {
            id: 3,
            title: "Rolling Stock Maintenance Schedule - Q4 2024",
            source: "e-mail",
            language: "English",
            uploadDate: "2024-09-22",
            content: "The comprehensive rolling stock maintenance schedule for Q4 2024 has been finalized after detailed consultation with technical teams and operational requirements. The schedule includes major overhauls for 8 train sets, minor maintenance for 24 units, and routine inspections for all 32 operational trains. Major overhaul activities will focus on traction motor replacements, brake system upgrades, and air conditioning system modernization. Each major overhaul is estimated to take 15 days per train set, requiring careful coordination with operations to maintain service levels. The maintenance facility at Muttom depot has been equipped with new diagnostic equipment including ultrasonic testing apparatus, thermal imaging cameras, and computerized alignment systems. Spare parts inventory has been updated with critical components including traction motors, brake discs, door mechanisms, and HVAC units. The engineering team has developed a predictive maintenance program using IoT sensors to monitor train performance parameters in real-time. This system will help identify potential issues before they cause service disruptions. Additionally, the maintenance schedule includes upgrades to the train control and management systems (TCMS) to improve energy efficiency and passenger comfort. All maintenance activities will be conducted in compliance with Commissioner of Metro Railway Safety guidelines and international best practices.",
            summary: "Q4 2024 maintenance schedule covers 32 trains with major overhauls for 8 units, IoT-based predictive maintenance implementation, and TCMS upgrades for improved efficiency.",
            type: "Maintenance Schedule"
        },
        {
            id: 4,
            title: "Track Infrastructure Assessment Report",
            source: "hard-copy scans",
            language: "Malayalam",
            uploadDate: "2024-09-21",
            content: "കൊച്ചി മെട്രോയുടെ ട്രാക്ക് ഇൻഫ്രാസ്ട്രക്ചർ വിലയിരുത്തൽ റിപ്പോർട്ട് 2024 സെപ്റ്റംബറിൽ പൂർത്തിയാക്കി. മൊത്തം 25.612 കിലോമീറ്റർ ട്രാക്കിന്റെ വിശദമായ പരിശോധന നടത്തി. റെയിൽ വെയർ, ബോൾട്ട് കണക്ഷനുകൾ, സ്ലീപ്പറുകൾ, ബാലസ്റ്റ് എന്നിവയുടെ അവസ്ഥ വിലയിരുത്തി. എലിവേറ്റഡ് സെക്ഷനുകളിൽ കോൺക്രീറ്റ് സ്ലാബുകളുടെ അവസ്ഥ മികച്ചതാണെന്ന് കണ്ടെത്തി. ഭൂഗർഭ സെക്ഷനുകളിൽ ട്രാക്ക് ഗുണനിലവാരം അന്താരാഷ്ട്ര മാനദണ്ഡങ്ങൾക്കനുസൃതമാണ്. മൺസൂൺ കാലത്തെ ഡ്രെയിനേജ് സിസ്റ്റത്തിന്റെ പ്രവർത്തനം സംതൃപ്തികരമാണ്. പാലങ്ങളുടെയും വയഡക്ടുകളുടെയും ഘടനാപരമായ സുരക്ഷ ഉറപ്പാക്കുന്നതിനുള്ള പരിശോധന പൂർത്തിയാക്കി. സിഗ്നലിംഗ് സിസ്റ്റത്തിന്റെ കേബിൾ ലേഔട്ടും കണക്റ്റിവിറ്റിയും പരിശോധിച്ചു. ട്രാക്ക് ജ്യാമിതി മാനദണ്ഡങ്ങൾ അനുസരിച്ചാണ് എന്ന് സ്ഥിരീകരിച്ചു. ട്രാക്ക് സർക്യൂട്ടുകളുടെ പ്രവർത്തനം തൃപ്തികരമാണ്. ശബ്ദ നിയന്ത്രണ നടപടികൾ ഫലപ്രദമായി പ്രവർത്തിക്കുന്നു.",
            summary: "25.612 km ട്രാക്ക് പരിശോധനയിൽ എല്ലാ ഘടകങ്ങളും അന്താരാഷ്ട്ര മാനദണ്ഡങ്ങൾക്കനുസൃതമാണെന്ന് സ്ഥിരീകരിച്ചു. ഡ്രെയിനേജ്, സിഗ്നലിംഗ്, ശബ്ദ നിയന്ത്രണം എല്ലാം തൃപ്തികരം.",
            type: "Assessment Report"
        }
    ],
    procurement: [
        {
            id: 5,
            title: "Vendor Agreement - Spare Parts Supply Contract",
            source: "WhatsApp PDFs",
            language: "English",
            uploadDate: "2024-09-20",
            content: "The vendor agreement for spare parts supply has been finalized with M/s Metro Components International Ltd. for a period of 3 years with an estimated contract value of ₹45 crores. The agreement covers supply of critical components including traction motors, brake systems, door mechanisms, air conditioning units, and electronic control systems. The vendor has committed to maintaining a local inventory worth ₹5 crores at their Kochi facility to ensure quick delivery of emergency requirements. Quality assurance protocols have been established requiring all components to meet original equipment manufacturer specifications and international standards. The contract includes performance guarantees with penalty clauses for delayed deliveries and quality non-compliance. Vendor has agreed to provide technical support and training for KMRL maintenance staff on new components and technologies. Payment terms are structured with 30% advance, 60% on delivery and inspection, and 10% retention for warranty period. The agreement includes provisions for price escalation based on material cost indices and exchange rate fluctuations. Delivery schedule is set for monthly supplies with emergency delivery within 48 hours for critical components. The vendor will maintain detailed inventory management system integrated with KMRL's enterprise resource planning system. Quality control procedures include factory acceptance tests, pre-delivery inspections, and post-installation performance monitoring for first year of operation.",
            summary: "3-year spare parts supply contract worth ₹45 crores finalized with M/s Metro Components International. Includes local inventory, 48-hour emergency delivery, and comprehensive quality assurance.",
            type: "Vendor Agreement"
        }
    ],
    hr: [
        {
            id: 6,
            title: "Staff Training Program - Safety Protocols Update",
            source: "ad-hoc cloud links",
            language: "Malayalam",
            uploadDate: "2024-09-19",
            content: "കേരള സർക്കാരിന്റെ പുതിയ സുരക്ഷാ നയങ്ങൾക്കനുസൃതമായി KMRL-ലെ എല്ലാ ജീവനക്കാർക്കും പുതിയ പരിശീലന പരിപാടി ആരംഭിച്ചു. ട്രെയിൻ ഓപ്പറേറ്റർമാർ, സ്റ്റേഷൻ കൺട്രോളർമാർ, മെയിന്റനൻസ് സ്റ്റാഫ്, സെക്യൂരിറ്റി പേഴ്സണൽ എന്നിവർക്കുള്ള പ്രത്യേക പരിശീലന മൊഡ്യൂളുകൾ തയ്യാറാക്കി. അടിയന്തിര സാഹചര്യങ്ങളിലെ പ്രതികരണ രീതികൾ, യാത്രക്കാരുടെ സുരക്ഷാ ക്രമീകരണങ്ങൾ, അഗ്നി സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ, മെഡിക്കൽ എമർജൻസി ഹാൻഡ്ലിംഗ് എന്നിവ പരിശീലന പരിപാടിയിൽ ഉൾപ്പെടുത്തിയിട്ടുണ്ട്. വിവിധ വകുപ്പുകളിലെ 850 ജീവനക്കാർ ഈ പരിശീലനത്തിൽ പങ്കെടുക്കും. സിമുലേഷൻ അധിഷ്ഠിത പരിശീലനം, പ്രായോഗിക പരിശീലനം, എഴുത്തുപരീക്ഷ എന്നിവയിലൂടെ വിലയിരുത്തൽ നടത്തും. പരിശീലന കാലാവധി ഓരോ ബാച്ചിനും 5 ദിവസം. സർട്ടിഫിക്കേഷൻ പരീക്ഷയിൽ കുറഞ്ഞത് 80% മാർക്ക് നേടേണ്ടതുണ്ട്. റീ-സർട്ടിഫിക്കേഷൻ ഓരോ 2 വർഷത്തിലും നടത്തും. പരിശീലന സാമഗ്രികൾ ഇംഗ്ലീഷ്, മലയാളം ഇരു ഭാഷകളിലും തയ്യാറാക്കിയിട്ടുണ്ട്.",
            summary: "850 ജീവനക്കാർക്കുള്ള പുതിയ സുരക്ഷാ പരിശീലന പരിപാടി ആരംഭിച്ചു. 5 ദിവസത്തെ സിമുലേഷൻ അധിഷ്ഠിത പരിശീലനം, 80% പാസ് മാർക്ക്, 2 വർഷത്തിലൊരിക്കൽ റീ-സർട്ടിഫിക്കേഷൻ.",
            type: "Training Program"
        }
    ],
    finance: [
        {
            id: 7,
            title: "Monthly Financial Statement - August 2024",
            source: "e-mail",
            language: "English",
            uploadDate: "2024-09-18",
            content: "The monthly financial statement for August 2024 reflects strong operational performance with total revenue of ₹8.2 crores against operational expenses of ₹6.1 crores, resulting in an operational surplus of ₹2.1 crores. Passenger revenue contributed ₹7.1 crores, representing a 12% increase compared to July 2024. Non-fare revenue from advertising, retail spaces, and parking contributed ₹1.1 crores. Major expense categories include staff costs (₹2.8 crores), energy consumption (₹1.4 crores), maintenance activities (₹1.2 crores), and administrative expenses (₹0.7 crores). Capital expenditure for the month totaled ₹15.3 crores, primarily allocated to Phase 2 extension works, rolling stock procurement, and infrastructure upgrades. The financial performance indicates healthy cash flow generation and improved cost efficiency through optimized operations. Debt servicing obligations were met on schedule with ₹3.2 crores paid towards loan installments. The cash and bank balance stands at ₹47.8 crores as of August 31, 2024. Revenue per passenger kilometer improved to ₹4.2, indicating better pricing efficiency. Energy cost per train kilometer reduced by 8% due to regenerative braking implementation. The audit committee has approved the financial statements with recommendations for enhanced cost control measures in administrative expenses.",
            summary: "August 2024 shows ₹2.1 crores operational surplus with 12% revenue growth. Improved energy efficiency and healthy cash flow of ₹47.8 crores maintained.",
            type: "Financial Statement"
        }
    ],
    safety: [
        {
            id: 8,
            title: "Safety Audit Report - Third Quarter 2024",
            source: "regulatory directives",
            language: "English",
            uploadDate: "2024-09-17",
            content: "The comprehensive safety audit for Q3 2024 conducted by the Commissioner of Metro Railway Safety (CMRS) has been completed with overall satisfactory ratings across all safety parameters. The audit covered 127 safety checkpoints including signaling systems, emergency evacuation procedures, fire safety measures, platform safety barriers, train protection systems, and staff safety protocols. Key findings indicate 98.5% compliance with safety standards, with minor observations in 3 areas requiring attention. The automatic train protection system demonstrated 100% reliability with zero false activations or missed interventions. Emergency evacuation drills were conducted successfully at all 22 operational stations with average evacuation time of 4.2 minutes, well within the prescribed 6-minute standard. Fire safety systems including detection, suppression, and evacuation showed excellent performance with all systems functional and tested monthly. Platform screen doors operated flawlessly with 99.8% availability, contributing significantly to passenger safety. The central control system's ability to manage emergency situations was tested through simulated scenarios with satisfactory response times. Safety training compliance among staff reached 96%, with the remaining 4% scheduled for completion by October 2024. Incident reporting and investigation procedures were found to be robust and in compliance with regulatory requirements. The audit recommended enhancement of passenger safety awareness programs and installation of additional CCTV coverage in certain station areas.",
            summary: "Q3 2024 safety audit shows 98.5% compliance with CMRS standards. Emergency systems performing excellently with 4.2-minute evacuation time and 100% train protection reliability.",  
            type: "Safety Audit"
        }
    ],
    legal: [
        {
            id: 9,
            title: "Environmental Clearance Update - Phase 3 Extension",
            source: "regulatory directives",
            language: "English",
            uploadDate: "2024-09-16",
            content: "The environmental clearance application for Phase 3 extension of Kochi Metro has received preliminary approval from the Ministry of Environment, Forest and Climate Change. The proposed 11.2 km extension from Kakkanad to Angamaly will include 9 stations and is expected to serve approximately 60,000 additional passengers daily. Environmental impact assessment studies have been completed covering air quality, noise pollution, water resources, flora and fauna, and socio-economic impact on local communities. The assessment confirms minimal adverse environmental impact with several positive outcomes including reduced vehicular traffic, lower carbon emissions, and improved urban mobility. Mitigation measures have been proposed for construction phase impacts including dust control, noise barriers, and waste management protocols. The project will incorporate green building standards for all stations with rainwater harvesting, solar power generation, and energy-efficient lighting systems. Tree plantation program will offset any vegetation loss during construction with a 3:1 replacement ratio. Community consultation meetings have been conducted in affected areas with overall positive response from residents and local bodies. The final environmental clearance is expected by November 2024, conditional upon implementation of proposed mitigation measures and compliance monitoring protocols. Construction activities will be scheduled to minimize impact on monsoon seasons and local festivals. Regular environmental monitoring will be conducted throughout the project lifecycle with quarterly reports to regulatory authorities.",
            summary: "Phase 3 extension environmental clearance progressing well with minimal impact identified. 11.2 km route with green building standards and 3:1 tree replacement ratio planned.",
            type: "Environmental Clearance"
        }
    ],
    admin: [
        {
            id: 10,
            title: "Board Meeting Minutes - September 2024",
            source: "board-meeting minutes",
            language: "English", 
            uploadDate: "2024-09-15",
            content: "The monthly board meeting of Kochi Metro Rail Limited was held on September 15, 2024, under the chairmanship of Managing Director with participation from 8 board members and senior officials. Key agenda items included review of operational performance, financial status, Phase 2 extension progress, and Phase 3 planning approvals. Operational performance for August 2024 was presented showing daily ridership of 87,000 passengers with 99.2% service reliability. The board appreciated the improved performance metrics and directed continuation of customer satisfaction initiatives. Financial review indicated healthy cash flow with operational surplus of ₹2.1 crores for August. The board approved allocation of ₹25 crores for rolling stock maintenance and infrastructure upgrades. Phase 2 extension update showed 94% completion with commercial operations expected to commence in December 2024. The board approved the environmental impact assessment for Phase 3 extension and authorized submission to regulatory authorities. Discussion on technology upgrades included approval for implementation of unified payments system and mobile application enhancements. The board reviewed and approved updates to procurement policies to ensure transparency and competitive bidding. Staff welfare measures including medical insurance upgrades and training programs received board approval. The meeting concluded with approval of quarterly safety audit findings and directions for addressing minor compliance observations. Next board meeting scheduled for October 20, 2024.",
            summary: "September 2024 board meeting approved ₹25 crores for maintenance, Phase 3 environmental assessment, and technology upgrades. Phase 2 extension 94% complete, targeting December launch.",
            type: "Board Minutes"
        }
    ]
};

// Department data
const departments = {
    operations: {
        name: "Train Operations",
        nameML: "ട്രെയിൻ ഓപ്പറേഷൻസ്",
        icon: "fas fa-train",
        users: ["ops_manager", "station_controller", "train_operator"]
    },
    engineering: {
        name: "Engineering & Maintenance",
        nameML: "എഞ്ചിനീയറിംഗ് & മെയിന്റനൻസ്",
        icon: "fas fa-cogs",
        users: ["eng_manager", "maintenance_supervisor", "technician"]
    },
    procurement: {
        name: "Procurement",
        nameML: "സംഭരണം", 
        icon: "fas fa-shopping-cart",
        users: ["proc_manager", "purchase_officer", "vendor_coordinator"]
    },
    hr: {
        name: "Human Resources",
        nameML: "ഹ്യൂമൻ റിസോഴ്സ്",
        icon: "fas fa-users",
        users: ["hr_manager", "training_coordinator", "admin_assistant"]
    },
    finance: {
        name: "Finance & Accounts", 
        nameML: "സാമ്പത്തികം & അക്കൗണ്ടുകൾ",
        icon: "fas fa-calculator",
        users: ["finance_manager", "accounts_officer", "audit_assistant"]
    },
    safety: {
        name: "Safety & Security",
        nameML: "സുരക്ഷ & സെക്യൂരിറ്റി",
        icon: "fas fa-shield-alt",
        users: ["safety_officer", "security_supervisor", "emergency_coordinator"]
    },
    legal: {
        name: "Legal & Compliance",
        nameML: "നിയമപരം & കംപ്ലയൻസ്",
        icon: "fas fa-gavel",
        users: ["legal_advisor", "compliance_officer", "documentation_specialist"]
    },
    admin: {
        name: "Administration", 
        nameML: "അഡ്മിനിസ്ട്രേഷൻ",
        icon: "fas fa-building",
        users: ["admin_manager", "office_coordinator", "records_keeper"]
    }
};

// Language translations
const translations = {
    en: {
        "Government of Kerala": "Government of Kerala",
        "Kochi Metro Rail Limited": "Kochi Metro Rail Limited",
        "Automated Document Management System": "Automated Document Management System",
        "Smart Automation for Efficient Document Processing": "Smart Automation for Efficient Document Processing",
        "Department Login": "Department Login",
        "Select your department and login to access the system": "Select your department and login to access the system",
        "Department": "Department",
        "Select Department": "Select Department",
        "Username": "Username",
        "Password": "Password",
        "Login": "Login",
        "Secure Government Portal": "Secure Government Portal",
        "© 2024 Government of Kerala. All rights reserved.": "© 2024 Government of Kerala. All rights reserved.",
        "Powered by Smart Automation Initiative": "Powered by Smart Automation Initiative",
        "Dashboard": "Dashboard",
        "Documents": "Documents", 
        "Upload Document": "Upload Document",
        "Department Chat": "Department Chat",
        "Cross-Department Chat": "Cross-Department Chat",
        "Settings": "Settings",
        "Logout": "Logout",
        "Welcome": "Welcome",
        "Total Documents": "Total Documents",
        "Processed Today": "Processed Today",
        "Pending Review": "Pending Review",
        "AI Summaries": "AI Summaries",
        "Recent Documents": "Recent Documents",
        "View Document": "View Document",
        "Chat with Document": "Chat with Document",
        "Download": "Download"
    },
    ml: {
        "Government of Kerala": "കേരള സർക്കാർ",
        "Kochi Metro Rail Limited": "കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ്",
        "Automated Document Management System": "ഓട്ടോമേറ്റഡ് ഡോക്യുമെന്റ് മാനേജ്മെന്റ് സിസ്റ്റം",
        "Smart Automation for Efficient Document Processing": "കാര്യക്ഷമമായ ഡോക്യുമെന്റ് പ്രോസസ്സിംഗിനുള്ള സ്മാർട്ട് ഓട്ടോമേഷൻ",
        "Department Login": "വകുപ്പ് ലോഗിൻ",
        "Select your department and login to access the system": "സിസ്റ്റം ആക്സസ് ചെയ്യാൻ നിങ്ങളുടെ വകുപ്പ് തിരഞ്ഞെടുത്ത് ലോഗിൻ ചെയ്യുക",
        "Department": "വകുപ്പ്",
        "Select Department": "വകുപ്പ് തിരഞ്ഞെടുക്കുക",
        "Username": "ഉപയോക്തൃനാമം",
        "Password": "പാസ്‌വേഡ്",
        "Login": "ലോഗിൻ",
        "Secure Government Portal": "സുരക്ഷിത സർക്കാർ പോർട്ടൽ",
        "© 2024 Government of Kerala. All rights reserved.": "© 2024 കേരള സർക്കാർ. എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.",
        "Powered by Smart Automation Initiative": "സ്മാർട്ട് ഓട്ടോമേഷൻ ഇനിഷ്യേറ്റീവ് പവർഡ്",
        "Dashboard": "ഡാഷ്ബോർഡ്",
        "Documents": "ഡോക്യുമെന്റുകൾ",
        "Upload Document": "ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക",
        "Department Chat": "വകുപ്പ് ചാറ്റ്",
        "Cross-Department Chat": "ക്രോസ്-ഡിപ്പാർട്ട്മെന്റ് ചാറ്റ്",
        "Settings": "സെറ്റിംഗുകൾ",
        "Logout": "ലോഗൗട്ട്",
        "Welcome": "സ്വാഗതം",
        "Total Documents": "മൊത്തം ഡോക്യുമെന്റുകൾ",
        "Processed Today": "ഇന്ന് പ്രോസസ്സ് ചെയ്തത്",
        "Pending Review": "അവലോകനത്തിനായി കാത്തിരിക്കുന്നു",
        "AI Summaries": "AI സംഗ്രഹങ്ങൾ",
        "Recent Documents": "സമീപകാല ഡോക്യുമെന്റുകൾ",
        "View Document": "ഡോക്യുമെന്റ് കാണുക",
        "Chat with Document": "ഡോക്യുമെന്റുമായി ചാറ്റ് ചെയ്യുക",
        "Download": "ഡൗൺലോഡ്"
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    updateLanguage();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const department = document.getElementById('department').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!department || !username || !password) {
        alert(currentLanguage === 'en' ? 'Please fill all fields' : 'എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക');
        return;
    }

    // Mock authentication - any password works
    currentUser = {
        username: username,
        department: department,
        departmentName: departments[department].name,
        departmentNameML: departments[department].nameML
    };

    // Store in sessionStorage
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ml' : 'en';
    localStorage.setItem('currentLanguage', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
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
    const inputs = document.querySelectorAll('input[placeholder]');
    inputs.forEach(input => {
        if (currentLanguage === 'en') {
            if (input.name === 'username') {
                input.placeholder = 'Enter your username';
            } else if (input.name === 'password') {
                input.placeholder = 'Enter your password';
            }
        } else {
            if (input.name === 'username') {
                input.placeholder = 'നിങ്ങളുടെ ഉപയോക്തൃനാമം നൽകുക';
            } else if (input.name === 'password') {
                input.placeholder = 'നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക';
            }
        }
    });
}

// Gemini AI Functions
async function callGeminiAPI(prompt, context = '') {
    try {
        // Ensure API key is loaded
        if (!GEMINI_API_KEY) {
            await initializeConfig();
        }
        
        const fullPrompt = context ? `Context: ${context}\n\nQuestion: ${prompt}` : prompt;
        
        // Try to call actual Gemini API first
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                }
            }
        } catch (apiError) {
            console.log('Gemini API unavailable, using mock response:', apiError.message);
        }
        
        // Fallback to mock response if API fails
        const mockResponse = generateMockGeminiResponse(prompt, context);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        return mockResponse;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return currentLanguage === 'en' 
            ? "I apologize, but I'm unable to process your request at the moment. Please try again later."
            : "ക്ഷമിക്കണം, ഇപ്പോൾ നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ് ചെയ്യാൻ കഴിയുന്നില്ല. കുറച്ച് സമയത്തിന് ശേഷം വീണ്ടും ശ്രമിക്കുക.";
    }
}

function generateMockGeminiResponse(prompt, context) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (context) {
        // Document-specific responses
        if (lowerPrompt.includes('summary') || lowerPrompt.includes('summarize')) {
            return currentLanguage === 'en' 
                ? "Based on the document, here's a concise summary: The document covers key operational aspects with important findings and recommendations for improved efficiency and compliance."
                : "ഡോക്യുമെന്റിന്റെ അടിസ്ഥാനത്തിൽ ഇതാ ഒരു സംക്ഷിപ്ത സംഗ്രഹം: പ്രധാന പ്രവർത്തന വശങ്ങൾ, സുപ്രധാന കണ്ടെത്തലുകൾ, മെച്ചപ്പെട്ട കാര്യക്ഷമതയ്ക്കും കംപ്ലയൻസിനുമുള്ള ശുപാർശകൾ എന്നിവ ഉൾക്കൊള്ളുന്നു.";
        }
        
        if (lowerPrompt.includes('key points') || lowerPrompt.includes('main points')) {
            return currentLanguage === 'en'
                ? "The key points from this document are: 1) Operational performance metrics, 2) Safety compliance status, 3) Financial implications, 4) Recommended actions for improvement."
                : "ഈ ഡോക്യുമെന്റിൽ നിന്നുള്ള പ്രധാന കാര്യങ്ങൾ: 1) പ്രവർത്തന പ്രകടന മെട്രിക്സ്, 2) സുരക്ഷാ കംപ്ലയൻസ് സ്ഥിതി, 3) സാമ്പത്തിക പ്രത്യാഘാതങ്ങൾ, 4) മെച്ചപ്പെടുത്തലിനുള്ള ശുപാർശിത നടപടികൾ.";
        }
        
        if (lowerPrompt.includes('action') || lowerPrompt.includes('recommendation')) {
            return currentLanguage === 'en'
                ? "The document recommends several action items: immediate attention to maintenance schedules, enhanced safety protocols, staff training updates, and improved coordination between departments."
                : "ഡോക്യുമെന്റ് നിരവധി നടപടികൾ ശുപാർശ ചെയ്യുന്നു: മെയിന്റനൻസ് ഷെഡ്യൂളുകളിൽ ഉടനടി ശ്രദ്ധ, മെച്ചപ്പെട്ട സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ, സ്റ്റാഫ് പരിശീലന അപ്‌ഡേറ്റുകൾ, വകുപ്പുകൾ തമ്മിലുള്ള മെച്ചപ്പെട്ട ഏകോപനം.";
        }
    } else {
        // General responses
        if (lowerPrompt.includes('help') || lowerPrompt.includes('assist')) {
            return currentLanguage === 'en'
                ? "I'm here to help you with document analysis, summarization, and answering questions about KMRL operations. You can ask me about specific documents, request summaries, or get insights about operational procedures."
                : "KMRL പ്രവർത്തനങ്ങളെക്കുറിച്ചുള്ള ഡോക്യുമെന്റ് വിശകലനം, സംഗ്രഹം, ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകൽ എന്നിവയിൽ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. നിങ്ങൾക്ക് പ്രത്യേക ഡോക്യുമെന്റുകളെക്കുറിച്ച് ചോദിക്കാം, സംഗ്രഹങ്ങൾ അഭ്യർത്ഥിക്കാം, അല്ലെങ്കിൽ പ്രവർത്തന നടപടിക്രമങ്ങളെക്കുറിച്ച് ഉൾക്കാഴ്ച നേടാം.";
        }
        
        if (lowerPrompt.includes('kmrl') || lowerPrompt.includes('metro')) {
            return currentLanguage === 'en'
                ? "KMRL (Kochi Metro Rail Limited) is a significant urban transit system serving the Kochi metropolitan area. I can help you understand various aspects of its operations, maintenance, safety protocols, and administrative procedures through document analysis."
                : "KMRL (കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ്) കൊച്ചി മെട്രോപൊളിറ്റൻ പ്രദേശത്തെ സേവിക്കുന്ന ഒരു പ്രധാന നഗര ഗതാഗത സംവിധാനമാണ്. ഡോക്യുമെന്റ് വിശകലനത്തിലൂടെ അതിന്റെ പ്രവർത്തനങ്ങൾ, അറ്റകുറ്റപ്പണികൾ, സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ, അഡ്മിനിസ്ട്രേറ്റീവ് നടപടിക്രമങ്ങൾ എന്നിവയുടെ വിവിധ വശങ്ങൾ മനസ്സിലാക്കാൻ എനിക്ക് നിങ്ങളെ സഹായിക്കാനാകും.";
        }
    }
    
    // Default response
    return currentLanguage === 'en' 
        ? "I understand your question. Could you please provide more specific details so I can give you a more accurate and helpful response?"
        : "നിങ്ങളുടെ ചോദ്യം ഞാൻ മനസ്സിലാക്കി. കൂടുതൽ കൃത്യവും സഹായകരമായ പ്രതികരണം നൽകാൻ കൂടുതൽ വ്യക്തമായ വിശദാംശങ്ങൾ നൽകാമോ?";
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    
    if (currentLanguage === 'en') {
        return date.toLocaleDateString('en-IN', options);
    } else {
        return date.toLocaleDateString('ml-IN', options);
    }
}

function getSourceIcon(source) {
    const iconMap = {
        'e-mail': 'fas fa-envelope',
        'Maximo exports': 'fas fa-database',
        'SharePoint repositories': 'fas fa-cloud',
        'WhatsApp PDFs': 'fab fa-whatsapp',
        'hard-copy scans': 'fas fa-scanner',
        'ad-hoc cloud links': 'fas fa-link',
        'regulatory directives': 'fas fa-gavel',
        'board-meeting minutes': 'fas fa-users'
    };
    
    return iconMap[source] || 'fas fa-file';
}

function showProcessingAnimation(text) {
    const overlay = document.createElement('div');
    overlay.className = 'processing-overlay';
    overlay.style.display = 'flex';
    
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="processing-spinner"></div>
            <div class="processing-text">${text}</div>
            <div class="processing-subtext">Please wait...</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
}

function hideProcessingAnimation(overlay) {
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
}

// Export functions for use in other files
window.kmrlApp = {
    callGeminiAPI,
    mockDocuments,
    departments,
    currentLanguage,
    translations,
    formatDate,
    getSourceIcon,
    showProcessingAnimation,
    hideProcessingAnimation
};