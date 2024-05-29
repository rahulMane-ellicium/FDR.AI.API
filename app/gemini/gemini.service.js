import { geminiModel } from "../../config/gemini.config.js";
import XLSX from 'xlsx'
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

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
   
    const text = response.text();
    
    return convertResponseToJson(text);
  } catch (error) {
    throw error;
  }
};


const convertResponseToJson=(response)=> {
   // Removing the surrounding quotes and backslashes
   const cleanedResponse = response.replace(/```json\n/g, '').replace(/\n```/g, '').replace(/\\n/g, '').replace(/\\"/g, '"');
  
   // Parsing the cleaned string to JSON
   const jsonResponse = JSON.parse(cleanedResponse);
   storeJsonToExcel(jsonResponse);
   return jsonResponse;
}



const storeJsonToExcel=(jsonData)=> {
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
           if (typeof value === 'object') {
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
   XLSX.writeFile(wb,"PROJECT_features.xlsx" );
}


const readExcelToJson=async ()=> {
  try {
   const wb = XLSX.readFile("PROJECT_features.xlsx");
   const jsonData = {};

   wb.SheetNames.forEach(sheetName => {
       const ws = wb.Sheets[sheetName];
       const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

       // Convert sheet data to object
       const headers = sheetData[0];
       const values = sheetData.slice(1);

       const sheetObj = {};
       for (let i = 0; i < headers.length; i++) {
           if (values[0][i].startsWith('{') || values[0][i].startsWith('[')) {
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
   throw error
  }
}



export default {
    getItsmData,
    readExcelToJson
}