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
     Objective: Your objective is to go through the requirements provided to you above and suggest the three best fitting ITSM tools in the market from following list of tools:
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
     1. First go through following the requirements carefully : {input_data_str}.
     2. While suggesting tools make sure that you keep budget parameter of requirements as the utmost priority. If a tool you suggest fits in budget then good if not then suggest tools that will be within or around the budget.
     3. After going through the instructions and requirements you have to carefully deduce what all ITSM tools fit the exact requirements alongwith its reasons.
     4. While deducing you have to suggest top three tools on the basis of how much a particular tool is matching the requirements.
     5. You also have to rank these tools according to the matching (1st being the one that matches all criteria amd so on and so forth)
     8. Your rank must be provided in the end based on the matching of requirements (1ST MUST BE THE TOOL THAT MATCHES IF NOT ALL OF THE REQUIREMENTS BUT MOST OF THEM).
     9. Output Format:{{"Top_tools" : [tool1,tool2,tool3],"Reasons" : ""}}
     10.Specify the appropriate reasons for choosing the top 3 tools in output format and specify the tools in Top_tools in Output Format according to ascending order of rankings.
     11.Give output in Object format as specified in Output Format.

     Requirement : ${requirementText}
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      seed: 1,
      temperature: 1,
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
