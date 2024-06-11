import { openai } from "../../config/openai.config.js";
import XLSX from "xlsx";
import openAiDb from "./openAi.db.js";

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
Objective: Your objective is to go through the requirements provided to you and suggest the Six best fitting ITSM tools in the market from the following list of tools:
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
2. Prioritize the features according to the "Priority Order of features" specified in the input_text. This means you should first evaluate the tools based on the features listed in the "Priority Order of features", and then consider the remaining features provided in the input.
3. Deduce which ITSM tools best fit the exact requirements along with detailed reasons in bullet points for each tool.
4. While giving the reasons, always mention the parameters and features considered for selecting the top 3 tools, highlighting those from the "Priority Order of features" first.
5. Re-evaluate the tools each time based on any changes in the input parameters provided.
6. Suggest the top three tools based on how well each tool matches the requirements and priority order given based on their ranking.
7. Summarize your decision behind choosing the tools under "Reasons" and give a summary in 5 points for each tool.
8. If budget is not provided, then give free ITSM tools strictly, do not include tools that offer free trials.
9. If none of the tools fit in the budget, then give the output as "Nothing fits in budget".
10. Mention the percentage to which the user requirements match with the tool features.
11. STRICTLY FOLLOW THESE INSTRUCTIONS AND THE BELOW OUTPUT FORMAT. DO NOT GIVE YOUR OWN OUTPUT.
12. Regarding the output format: Don't just say it fits the requirements; instead, give the statistical reason behind it. Add some numbers or use the leading companies that use these tools.
13. An Important Point Give me numbers wherever needed to justify the reason.
14. Always add pricing of the tool in the reason for each tool.
15.I want the reasons why arent you giving me results
16.I told you to give the top 6 tools dont give me 3 tools
 
Output Format:
{
    "Top_tools": [tool1, tool2, tool3,tool4,tool5,tool6],
    "Reasons": {
        "toolname1": {{
            "Reason 1": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 2": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        },
        "toolname2": {
            "Reason 1": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 2": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        },
        "toolname3": {
            "Reason 1": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 2": "Explanation (highlight features from 'Priority Order of features')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        }
    },
    Make sure u always give the top 3 companies I dont want less than 3 or greater than 3
    "Leading_companies": {
        "toolname1": {
             
                "company1": "company1_name",
                "company2": "company2_name",
                "company3": "company3_name"
            
        },
        "toolname2": {
             
                "company1": "company1_name",
                "company2": "company2_name",
                "company3": "company3_name"
            
        },
        "toolname3": {
            
                "company1": "company1_name",
                "company2": "company2_name",
                "company3": "company3_name"
            
        }
    }

    Im not able to parse the data of Leading_companies it gives an array I want an object 
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      seed: 1,
      temperature: 0,
    });

    const text = response.choices[0].message.content;


    const parsedJson = JSON.parse(text);
    // console.log(parsedJson);

    const leadingCompanies = {};

    
    
    Object.keys(parsedJson.Leading_companies).forEach((tool) => {
        
        const companiesObject = parsedJson.Leading_companies[tool];
        leadingCompanies[tool] =  {"-Companies that use this tool": companiesObject };
    });
    const arrayGptOutput = parsedJson.Top_tools;
    const topToolData = await openAiDb.getItsmData(arrayGptOutput);
    return { ...topToolData, reason: parsedJson.Reasons, Leading_companies: leadingCompanies };
  } catch (error) {
    throw error;
  }
};

export default {
  generateData,
};
