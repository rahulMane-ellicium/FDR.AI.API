import { geminiModel } from "../../config/gemini.config.js";
import XLSX from "xlsx";
import geminiDb from "./gemini.db.js";;
import { gemini_data } from "../constants/gemini.constants.js";

const ITSM_Tools = [
  "ServiceNow ITSM", "SolarWinds Service Desk", "ServiceDesk Plus", "TOPdesk", 
  "SymphonyAI ITSM", "Jira Service Management", "Cherwell Service Management", 
  "Freshservice", "SysAid", "BMC Remedy ITSM", "Ivanti Neurons ITSM", 
  "EV Service Manager", "SolarWinds Web Help Desk", "TeamDynamix ITSM", "InvGate Service Desk"
];

const getItsmData = async () => {
  try {
 
    const results = {};

    for (const tool of ITSM_Tools) {
      const prompt = `Provide detailed ratings and information for the following ITSM tool: "${tool}"
      For this tool, include:
      {{
          "${tool}" : {{
              "ratings": {{
                  "total_reviews": number of reviews,
                  "ease_of_use": rating,
                  "features": rating,
                  "design": rating,
                  "support": rating,
                  "overall": rating
              }},
              "api_and_integration_support": {{
                  "api_access": boolean,
                  "integration_support": {{
                      "active_directory": boolean,
                      "answer_gpt": boolean,
                      "assess360": boolean,
                      "bigid": boolean,
                      "cozyroc_ssis_suite": boolean,
                      "cloudhub": boolean,
                      "elastic_observability": boolean,
                      "exalate": boolean,
                      "incydr": boolean,
                      "nexpose": boolean,
                      "other_available_integrations": "Many other integrations are available"
                  }}
              }},
              "pricing_details": {{
                  "pricing_tiers": starting price/user/month,
                  "free_version_availability": boolean,
                  "free_trial_availability": boolean
              }},
              "deployment_support": {{
                  "saas": boolean,
                  "iphone": boolean,
                  "ipad": boolean,
                  "android": boolean,
                  "windows": boolean,
                  "mac": boolean,
                  "linux": boolean
              }},
              "customer_support_options": {{
                  "phone_support": boolean,
                  "live_support": boolean,
                  "online_support": boolean
              }},
              "training_platforms": {{
                  "documentation": boolean,
                  "webinars": boolean,
                  "live_online_sessions": boolean,
                  "in_person_training": boolean
              }},
              "vendor_details": {{
                  "company_name": "vendor name",
                  "year_founded": year,
                  "country": "country"
              }},
              "features": [
                  "Comprehensive list of features offered by ${tool}"
              ]
          }}
      }}

      Note: Provide all ratings as specific numbers not ranges, Provide response in json format, dont provide any other non object response in it such as default notes. Use boolean values (true/false) where applicable.
      Dont give any additional notes or any other information just give the desired result.
      Dont provide any notes after the output just give the output.`;

      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const jsonData = convertResponseToJson(text);

      results[tool] = jsonData[tool];
    }

    await geminiDb.saveItsmTools(results);
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const convertResponseToJson = (response) => {
  const cleanedResponse = response.replace(/```json\n/g, '').replace(/\n```/g, '').replace(/\\n/g, '').replace(/\\"/g, '"');
  const jsonResponse = JSON.parse(cleanedResponse);
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
  XLSX.writeFile(wb, "PROJECT_features.xlsx");
};

const readExcelToJson = async () => {
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
  readExcelToJson
};
