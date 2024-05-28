import { openai } from "../../config/openai.config.js"

import XLSX from 'xlsx'

const GenerateData = async (filepath) => {
   try {
      const workbook = XLSX.readFile(filepath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const requirement = XLSX.utils.sheet_to_json(sheet);
   


      const requirementText = requirement.map(req => req.Requirements).join();
      
     
      const toolsAndObjectives = `Objective: Your objective is to analyze the requirements provided and suggest the three best-fitting ITSM tools from the list below:
      - ServiceNow IT Service Management
      - SolarWinds Service Desk
      - ServiceDesk Plus
      - TOPdesk
      - SymphonyAI IT Service Management
      - Jira Service Management
      
      Task:
1. Budget Priority: Ensure budget is the utmost priority. If a suggested tool fits within the budget, prioritize it; if not, suggest tools within or around the budget.
2. Requirement Analysis: Carefully review all the requirements.
3. Tool Deduction: Deduce which ITSM tools fit the exact requirements.
4. Top Three Tools: Suggest the top three tools based on requirement matching.
5. Ranking: Rank the tools (1st matches most criteria, 2nd matches next most, etc.).
6. Crisp and On-Point: Provide clear, concise, and precise answers without vague details.

Dont repeat the tool names 

The ouput result in a array
1.Tool name
on the next line 
2.Tool name
on the next line 
3.Tool name
     `;

      const inputText = requirementText  + toolsAndObjectives;

      const response = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: [
            { role: "user", 
            content: inputText }
         ],
        
         temperature: 0.7,
      });
     

      const text = response.choices[0].message.content

      return convertResponseToJson(text)
   } catch (error) {
      throw error
   }
}

const convertResponseToJson = (response) => {
   let responseStr;
   if (typeof response === 'string') {
       responseStr = response;
   } else {
       responseStr = JSON.stringify(response);
   }

   const toolsArray = responseStr.split('\n').map(line => {
      const parts = line.split('. ');
      return parts.length > 1 ? parts[1].trim() : null;
  }).filter(tool => tool !== null);

  return toolsArray
  
};


export default {
   GenerateData,
   convertResponseToJson
}
