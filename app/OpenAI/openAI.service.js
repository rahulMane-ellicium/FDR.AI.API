
import { openai } from '../../config/openai.config.js';
import XLSX from 'xlsx';

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
     
    
     const toolsAndObjectives = `Objective: Your objective is to analyze the requirements provided and suggest the three best-fitting ITSM tools from the list below:
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
 
       
       Task:
 1. Budget Priority: Ensure budget is the utmost priority. If a suggested tool fits within the budget, prioritize it; if not, suggest tools within or around the budget.
 2. Requirement Analysis: Carefully review all the requirements.
 3. Tool Deduction: Deduce which ITSM tools fit the exact requirements.
 4. Top Three Tools: Suggest the top three tools based on requirement matching.
 5. Ranking: Rank the tools (1st matches most criteria, 2nd matches next most, etc.).
 6. Crisp and On-Point: Provide clear, concise, and precise answers without vague details.
 7. Dont repeat the tool names 
 8. Provide output in array
 
 [first tool name,second tool name,third tool name]
      `;
 
     const inputText = requirementText + toolsAndObjectives;
 
     const response = await openai.chat.completions.create({
       model: "gpt-3.5-turbo",
       messages: [{ role: "user", content: inputText }],
 
       temperature: 0.7,
     });
 
     const text = response.choices[0].message.content;

     const arrayGptOutput = text.slice(1, -1).split(', ').map(item => item.trim());
   
     const topToolData = {};
     
     const allToolsData = await readExcelToJson(); 
    
     arrayGptOutput.forEach((toolName)=>{
       topToolData[toolName] = allToolsData[toolName];
     })
    
     return topToolData;
   } catch (error) {
     throw error;
   }
 };

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
   generateData,
 
};


