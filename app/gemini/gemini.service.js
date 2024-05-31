import { geminiModel } from "../../config/gemini.config.js";
import XLSX from "xlsx";
import geminiDb from "./gemini.db.js";
const getItsmData = async () => {
  try {
    const prompt = `
   Provide detailed ratings and information for the following ITSM tools: 
   - ServiceNow ITSM
   - SolarWinds Service Desk
   - ServiceDesk Plus
   - TOPdesk
   - SymphonyAI IT Service Management
   - Jira Service Management
   - Cherwell Service Management (Legacy)
   - Freshservice
   - SysAid
   - BMC Remedy Service Management Suite (Legacy)
   - Ivanti Neurons for ITSM
   - EV Service Manager
   - SolarWinds Web Help Desk
   - TeamDynamix ITSM
   - InvGate Service Desk
   
   
   For each tool, include:
   1. Ratings:
      - Total number of reviews
      - Ease of use rating
      - Features rating
      - Design rating
      - Support rating
      - Overall rating
   
   2. API and Integration Support:
      - API access (boolean)
      - Integration support for:
        - Active Directory
        - Answer GPT
        - Assess360
        - BigID
        - Cozyroc SSIS+ Suite
        - CloudHub
        - Elastic Observability
        - Exalate
        - Incydr
        - Nexpose
        - Other available integrations
   
   3. Pricing Details:
      - Pricing tiers
      - Free version availability (boolean)
      - Free trial availability (boolean)
   
   4. Deployment Support:
      - SaaS
      - iPhone
      - iPad
      - Android
      - Windows
      - Mac
      - Linux
   
   5. Customer Support Options:
      - Phone Support
      - 24/7 Live Support
      - Online Support
   
   6. Training Platforms:
      - Documentation
      - Webinars
      - Live online sessions
      - In-person training
   
   7. Vendor Details:
      - Company name
      - Year founded
      - Country
   
   8. List of Features:
      - Comprehensive list of features offered by each tool
   
   Note: Provide all ratings as specific numbers not ranges,provide response in json format only, dont provide any other non object response in it such as default notes. Use boolean values (true/false) where applicable.
   `;

    //  const result = await geminiModel.generateContent(prompt);
    //  const response = await result.response;

    //  const text = response.text();

    //  const jsonResponse = convertResponseToJson(text);
    const jsonResponse = {
      "ServiceNow ITSM": {
        Ratings: {
          "Total Reviews": 1200,
          "Ease of Use": 4.5,
          Features: 4.7,
          Design: 4.2,
          Support: 4.3,
          Overall: 4.6,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": true,
            Assess360: true,
            BigID: true,
            "Cozyroc SSIS+ Suite": true,
            CloudHub: true,
            "Elastic Observability": true,
            Exalate: true,
            Incydr: true,
            Nexpose: true,
            Other: "Hundreds of other integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on features and users",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: true,
          Linux: true,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": true,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": true,
          "In-Person Training": true,
        },
        "Vendor Details": {
          "Company Name": "ServiceNow",
          "Year Founded": 2004,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "AI-powered insights",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
          "Business Process Management",
        ],
      },
      "SolarWinds Service Desk": {
        Ratings: {
          "Total Reviews": 450,
          "Ease of Use": 4.2,
          Features: 4,
          Design: 3.8,
          Support: 4.1,
          Overall: 4,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: true,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "SolarWinds",
          "Year Founded": 1999,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "ServiceDesk Plus": {
        Ratings: {
          "Total Reviews": 350,
          "Ease of Use": 4,
          Features: 4.2,
          Design: 3.5,
          Support: 4,
          Overall: 4.1,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "ManageEngine",
          "Year Founded": 2002,
          Country: "India",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      TOPdesk: {
        Ratings: {
          "Total Reviews": 250,
          "Ease of Use": 4.1,
          Features: 4.3,
          Design: 3.7,
          Support: 4.2,
          Overall: 4.2,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "TOPdesk",
          "Year Founded": 1994,
          Country: "Netherlands",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
      "SymphonyAI IT Service Management": {
        Ratings: {
          "Total Reviews": 150,
          "Ease of Use": 4,
          Features: 4.5,
          Design: 3.8,
          Support: 4.1,
          Overall: 4.3,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": true,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Contact sales for pricing",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": true,
        },
        "Vendor Details": {
          "Company Name": "SymphonyAI",
          "Year Founded": 2017,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "AI-powered insights",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "Jira Service Management": {
        Ratings: {
          "Total Reviews": 800,
          "Ease of Use": 4.3,
          Features: 4.4,
          Design: 3.9,
          Support: 4.2,
          Overall: 4.4,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: true,
            Incydr: false,
            Nexpose: false,
            Other: "Hundreds of other integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: true,
          Linux: true,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": true,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "Atlassian",
          "Year Founded": 2002,
          Country: "Australia",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "Cherwell Service Management (Legacy)": {
        Ratings: {
          "Total Reviews": 200,
          "Ease of Use": 4,
          Features: 4.2,
          Design: 3.5,
          Support: 4,
          Overall: 4.1,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Contact sales for pricing",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "Cherwell Software",
          "Year Founded": 2004,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
      Freshservice: {
        Ratings: {
          "Total Reviews": 600,
          "Ease of Use": 4.5,
          Features: 4.3,
          Design: 4,
          Support: 4.1,
          Overall: 4.4,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": true,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: true,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": true,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "Freshworks",
          "Year Founded": 2010,
          Country: "India",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      SysAid: {
        Ratings: {
          "Total Reviews": 300,
          "Ease of Use": 4.2,
          Features: 4.1,
          Design: 3.7,
          Support: 4,
          Overall: 4.1,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "SysAid",
          "Year Founded": 1999,
          Country: "Israel",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "BMC Remedy Service Management Suite (Legacy)": {
        Ratings: {
          "Total Reviews": 180,
          "Ease of Use": 3.8,
          Features: 4.1,
          Design: 3.4,
          Support: 3.9,
          Overall: 3.9,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Contact sales for pricing",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": true,
        },
        "Vendor Details": {
          "Company Name": "BMC Software",
          "Year Founded": 1980,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "Ivanti Neurons for ITSM": {
        Ratings: {
          "Total Reviews": 280,
          "Ease of Use": 4.1,
          Features: 4.3,
          Design: 3.8,
          Support: 4,
          Overall: 4.2,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Contact sales for pricing",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": true,
        },
        "Vendor Details": {
          "Company Name": "Ivanti",
          "Year Founded": 1994,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Configuration Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "AI-powered insights",
          "Mobile Access",
          "Integration with other tools",
          "Customizable dashboards",
        ],
      },
      "EV Service Manager": {
        Ratings: {
          "Total Reviews": 100,
          "Ease of Use": 3.9,
          Features: 4,
          Design: 3.5,
          Support: 3.8,
          Overall: 3.9,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Contact sales for pricing",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "EVault",
          "Year Founded": 1999,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
      "SolarWinds Web Help Desk": {
        Ratings: {
          "Total Reviews": 200,
          "Ease of Use": 4,
          Features: 3.8,
          Design: 3.5,
          Support: 3.9,
          Overall: 3.8,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "SolarWinds",
          "Year Founded": 1999,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Knowledge Management",
          "Service Level Management",
          "Reporting and Analytics",
          "Workflow Automation",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
      "TeamDynamix ITSM": {
        Ratings: {
          "Total Reviews": 150,
          "Ease of Use": 4.2,
          Features: 4.1,
          Design: 3.6,
          Support: 4,
          Overall: 4,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "TeamDynamix",
          "Year Founded": 2003,
          Country: "United States",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
      "InvGate Service Desk": {
        Ratings: {
          "Total Reviews": 120,
          "Ease of Use": 4.3,
          Features: 4.2,
          Design: 3.8,
          Support: 4.1,
          Overall: 4.2,
        },
        "API and Integration Support": {
          "API access": true,
          Integrations: {
            "Active Directory": true,
            "Answer GPT": false,
            Assess360: false,
            BigID: false,
            "Cozyroc SSIS+ Suite": false,
            CloudHub: false,
            "Elastic Observability": false,
            Exalate: false,
            Incydr: false,
            Nexpose: false,
            Other: "Limited integrations available",
          },
        },
        "Pricing Details": {
          "Pricing Tiers": "Multiple tiers based on users and features",
          "Free Version Availability": false,
          "Free Trial Availability": true,
        },
        "Deployment Support": {
          SaaS: true,
          iPhone: true,
          iPad: true,
          Android: true,
          Windows: true,
          Mac: false,
          Linux: false,
        },
        "Customer Support Options": {
          "Phone Support": true,
          "24/7 Live Support": false,
          "Online Support": true,
        },
        "Training Platforms": {
          Documentation: true,
          Webinars: true,
          "Live Online Sessions": false,
          "In-Person Training": false,
        },
        "Vendor Details": {
          "Company Name": "InvGate",
          "Year Founded": 2005,
          Country: "Argentina",
        },
        Features: [
          "Incident Management",
          "Problem Management",
          "Change Management",
          "Knowledge Management",
          "Service Level Management",
          "Asset Management",
          "IT Service Catalog",
          "Request Management",
          "Workflow Automation",
          "Reporting and Analytics",
          "Mobile Access",
          "Integration with other tools",
        ],
      },
    };
    await geminiDb.saveItsmTools(jsonResponse);
    return "";
  } catch (error) {
    throw error;
  }
};

const convertResponseToJson = (response) => {
  // Removing the surrounding quotes and backslashes
  const cleanedResponse = response
    .replace(/```json\n/g, "")
    .replace(/\n```/g, "")
    .replace(/\\n/g, "")
    .replace(/\\"/g, '"');
  console.log(cleanedResponse);
  // Parsing the cleaned string to JSON
  const jsonResponse = JSON.parse(cleanedResponse);
  // storeJsonToExcel(jsonResponse);
  return jsonResponse;
};

const storeJsonToExcel = (jsonData) => {
  const wb = XLSX.utils.book_new();

  for (const project in jsonData) {
    const sheetData = jsonData[project];
    const sheetName = project.substring(0, 31); // Limit sheet name to 31 characters

    const wsData = [];

    // Add headers
    const headers = Object.keys(sheetData);
    wsData.push(headers);

    // Add data rows
    const row = [];
    for (const key in sheetData) {
      const value = sheetData[key];
      if (typeof value === "object") {
        row.push(JSON.stringify(value));
      } else {
        row.push(value);
      }
    }
    wsData.push(row);

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  }

  // Write to file
  XLSX.writeFile(wb, "PROJECT_features.xlsx");
};

const readExcelToJson = async () => {
  try {
    const wb = XLSX.readFile("PROJECT_features.xlsx");
    const jsonData = {};

    wb.SheetNames.forEach((sheetName) => {
      const ws = wb.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Convert sheet data to object
      const headers = sheetData[0];
      const values = sheetData.slice(1);

      const sheetObj = {};
      for (let i = 0; i < headers.length; i++) {
        if (values[0][i].startsWith("{") || values[0][i].startsWith("[")) {
          // Parse JSON string to object or array
          sheetObj[headers[i]] = JSON.parse(values[0][i]);
        } else {
          sheetObj[headers[i]] = values[0][i];
        }
      }

      jsonData[sheetName] = sheetObj;
    });

    return jsonData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getItsmData,
  readExcelToJson,
};
