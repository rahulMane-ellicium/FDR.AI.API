import { openai } from "../../config/openai.config.js";
import XLSX from "xlsx";

const generateData = async (file) => {
  try {
    const { buffer } = file;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const requirement = XLSX.utils.sheet_to_json(worksheet);

    const requirementText = Object.entries(requirement[0])
      .map(([key, value]) => `  - ${key} : ${value}`)
      .join("\n");

    const prompt = `Role: You are a top IT consultant.
    Objective: Your objective is to go through the requirements provided to you above and suggest the three best fitting ITSM tools in the market from the following list of tools:
    - ServiceNow ITSM
    - SolarWinds Service Desk
    - ServiceDesk Plus
    - TOPdesk
    - SymphonyAI ITSM
    - Jira Service Management
    - Cherwell Service Management
    - Freshservice
    - SysAid
    - BMC Remedy ITSM
    - Ivanti Neurons ITSM
    - EV Service Manager
    - SolarWinds Web Help Desk
    - TeamDynamix ITSM
    - InvGate Service Desk

    Task:
    1. Carefully review the provided requirements: ${requirementText}.
    2. While suggesting tools, prioritize the budget, but also consider other critical parameters such as:
    "Customer Name": "string",
    "Domian": "string",
    "Location": "string",
    "Business Units Using RF": "string",
    "User Control": "Admin: number, Agent: number, End Users: number",
    "Modules Using": "string",
    "CMBD": "string",
    "Custom Portal": "string",
    "SSO": "string",
    "Customization": "string",
    "Integrations": "string",
    "Major Use cases": "string",
    "Must have features": "string",
    "Sentiment/Feedback on RF": "string",
    "Customer Expectations": "string",
    "Limitations of existing tool": "string",
    "Platform Preference": "string",
    "Budget": number,
    "Implementation timeine": "string",
    "Custom Module": "string",
    "Ticket Volume(monthly )": number,
    "No of Catlog/Service Request Forms":number ,
    "Level of approval(max)": number,
    "Full-Copy Sandbox": "string",
    "Ticket Source ": "string",
    "Cross BU Ticket Transfer": "string",
    "Endpoint Management": "string",
    "Reconciliation of Assests": "string",
    "Normalization of Assests": "string",
    "Asset Count": number
   
    3. After analyzing all the parameters in the requirements, deduce which ITSM tools best fit the exact requirements along with reasons.
    4. If any of the parameter's values are changed, then the tools should change.
    5. The input parameters will be present as an array of dictionary where each parameter is key of dictionary.
    6. Suggest the top three tools based on how well each tool matches the requirements.
    7. Rank these tools according to the matching (1st being the one that matches most of the criteria).
    8. Provide the rankings at the end based on the matching of requirements (1st must be the tool that matches most of the requirements).
    9. Output Format: {{"Top_tools" : [tool1,tool2,tool3], "Reasons" : ""}}
    10. Specify the appropriate reasons for choosing the top 3 tools in the output format and specify the tools in Top_tools in the Output Format according to the ascending order of rankings.
    11. Give output in Object format as specified in Output Format.
    12. Ensure to dynamically adjust the output based on any changes in the input parameters provided.
    13. Give output based on the given input parameters and its values.
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      seed: 1,
      temperature: 0,
    });

    const text = response.choices[0].message.content;
    console.log(text);
    const parsedJson = JSON.parse(text);
    const arrayGptOutput = parsedJson.Top_tools;
    console.log(parsedJson.Top_tools);
    const topToolData = {};

    const allToolsData = await readExcelToJson();

    arrayGptOutput.forEach((toolName) => {
      topToolData[toolName] = allToolsData[toolName];
    });

    return {...topToolData,reason : parsedJson.Reasons};
  } catch (error) {
    throw error;
  }
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
  generateData,
};
