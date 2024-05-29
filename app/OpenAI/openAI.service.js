// import { openai } from "../../config/openai.config.js"

// import XLSX from 'xlsx'

// const GenerateData = async (filepath) => {
//    try {
//       const workbook = XLSX.readFile(filepath);
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const requirement = XLSX.utils.sheet_to_json(sheet);
   

//       const requirementText = requirement.map(req => req.Requirements).join();
      
     
//       const toolsAndObjectives = `Objective: Your objective is to analyze the requirements provided and suggest the three best-fitting ITSM tools from the list below:
//       - ServiceNow IT Service Management
//       - SolarWinds Service Desk
//       - ServiceDesk Plus
//       - TOPdesk
//       - SymphonyAI IT Service Management
//       - Jira Service Management
      
//       Task:
// 1. Budget Priority: Ensure budget is the utmost priority. If a suggested tool fits within the budget, prioritize it; if not, suggest tools within or around the budget.
// 2. Requirement Analysis: Carefully review all the requirements.
// 3. Tool Deduction: Deduce which ITSM tools fit the exact requirements.
// 4. Top Three Tools: Suggest the top three tools based on requirement matching.
// 5. Ranking: Rank the tools (1st matches most criteria, 2nd matches next most, etc.).
// 6. Crisp and On-Point: Provide clear, concise, and precise answers without vague details.

// Dont repeat the tool names 

// The ouput result in a array
// 1.Tool name
// on the next line 
// 2.Tool name
// on the next line 
// 3.Tool name
//      `;

//       const inputText = requirementText  + toolsAndObjectives;

//       const response = await openai.chat.completions.create({
//          model: "gpt-3.5-turbo",
//          messages: [
//             { role: "user", 
//             content: inputText }
//          ],
        
//          temperature: 0.7,
//       });
     

//       const text = response.choices[0].message.content

//       return convertResponseToJson(text)
//    } catch (error) {
//       throw error
//    }
// }



// const convertResponseToJson = (response) => {
//    let responseStr;
//    if (typeof response === 'string') {
//        responseStr = response;
//    } else {
//        responseStr = JSON.stringify(response);
//    }

//    const toolsArray = responseStr.split('\n').map(line => {
//       const parts = line.split('. ');
//       return parts.length > 1 ? parts[1].trim() : null;
//   }).filter(tool => tool !== null);

//   return toolsArray
 
// };

// const getToolDetails = (topTools, filepath) => {
//    console.log("Inside");
//    const workbook = XLSX.readFile(filepath);
//    const sheetName = workbook.SheetNames[0];
//    const sheet = workbook.Sheets[sheetName];
//    const features = XLSX.utils.sheet_to_json(sheet);

//    const toolDetails = topTools.map(tool => {
//        const toolFeature = features.find(feature => feature.ToolName === tool);
//        return toolFeature ? { tool, details: toolFeature } : { tool, details: 'No details found' };
//    });

//    return toolDetails;
// };


// export default {
//    GenerateData,
//    convertResponseToJson,
//    getToolDetails
// }


import { openai } from '../../config/openai.config.js';
import XLSX from 'xlsx';

const GenerateData = async (requirementsFilePath, featuresFilePath) => {
   try {
      
       const requirementsWorkbook = XLSX.readFile(requirementsFilePath);
       
       const requirementTextArray = [];
       
       requirementsWorkbook.SheetNames.forEach(sheetName => {
           const sheet = requirementsWorkbook.Sheets[sheetName];
         //   console.log(sheet);
           const requirement = XLSX.utils.sheet_to_json(sheet);
           const requirementText = requirement.map(req => req.Requirements).join();
           requirementTextArray.push(requirementText);
       });
       const requirementText = requirementTextArray.join('');
      
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

The output result in a array
1.Tool name
on the next line 
2.Tool name
on the next line 
3.Tool name
       `;

       const inputText = requirementText + toolsAndObjectives;

       const response = await openai.chat.completions.create({
           model: 'gpt-3.5-turbo',
           messages: [
               { role: 'user', content: inputText }
           ],
           temperature: 0.7,
       });

       const text = response.choices[0].message.content;

       const topTools = convertResponseToJson(text);
      

       const featuresWorkbook = XLSX.readFile(featuresFilePath);
       const toolDetails = [];
       
       topTools.forEach(tool => {
           const matchingSheet = featuresWorkbook.SheetNames.find(sheetName => sheetName.includes(tool));
         //   console.log("m",matchingSheet);
           if (matchingSheet) {
            // console.log("inside");
               const sheet = featuresWorkbook.Sheets[matchingSheet];
               const featuresData = XLSX.utils.sheet_to_json(sheet);
               // console.log("featureData",featuresData);
               const details = getToolDetails([tool], featuresData); 
               // console.log("This",details);
               toolDetails.push(details[0]); 
               // console.log("details",details[0]);
           } else {
               toolDetails.push({ tool, details: 'No details found' });
           }
         //   console.log(toolDetails);
       });
       
       return toolDetails;
   } catch (error) {
       throw error;
   }
};

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
   // console.log(toolsArray);
   return toolsArray;
}; 



const getToolDetails = (topTools, toolData) => {
   
   const toolDetails = topTools.map(tool => {
       const details = toolData.find(data => data);
      //  console.log(JSON.parse(details));
      //  const cleanedResponse = details.replace(/```json\n/g, '').replace(/\n```/g, '').replace(/\\n/g, '').replace(/\\"/g, '"');

  
       if (details) {
           return { tool, details };
       } else {
           return { tool, details: 'No details found' };
       }
   });
   return toolDetails;
};





export default {
   GenerateData,
   convertResponseToJson,
   getToolDetails
};


