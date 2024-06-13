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

    if (!requirement.length) {
      throw new Error("The Excel file is empty or incorrectly formatted.");
    }

    const requirementText = Object.entries(requirement[0])
      .map(([key, value]) => `  - ${key} : ${value}`)
      .join("\n");

    const keysArray = Object.keys(requirement[0]);
    const standardInput = [
      "Customer Name",
      "Domian",
      "Location",
      "Business Units Using RF",
      "User Control",
      "Modules Using",
      "CMBD",
      "Custom Portal",
      "SSO",
      "Customization",
      "Integrations",
      "Major Use cases",
      "Must have features",
      "Sentiment/Feedback on RF",
      "Customer Expectations",
      "Limitations of existing tool",
      "Platform Preference",
      "Budget",
      "Implementation timeine",
      "Custom Module",
      "Ticket Volume(monthly )",
      "No of Catlog/Service Request Forms",
      "Level of approval(max)",
      "Full-Copy Sandbox",
      "Ticket Source ",
      "Cross BU Ticket Transfer",
      "Endpoint Management",
      "Reconciliation of Assests",
      "Normalization of Assests",
       "Asset Count",
      "Priority Order Of features",
      
    ];

    const missingKeys = standardInput.filter(key => !keysArray.includes(key));


    if (missingKeys.length) {
      throw new Error(`The following required keys are missing from the Excel file: ${missingKeys.join(", ")}`);
    }

    if (standardInput.length === keysArray.length) {
      for (const header of keysArray) {
        const check = standardInput.includes(header);
        if (check) {
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
    "Top_tools": [tool1, tool2, tool3,tool4,tool5,tool6]
    Note:-Go through the Priority Order Of features carefully and the justify the reasons.The reasons should be 
    based on the priority.

    For eg. Take the first input in Priority Order Of features and then the Reason 1 should be of that priority
    Having the reasons placed by the order of priority is very important so reason 1 should always have the reasons for priority 1

    "Reasons": {
        "toolname1": {{
            "Reason 1": "Explanation ('Reason 1's explanation should be of the priority 1')",
            "Reason 2": "Explanation ('Reason 2's explanation should be of the priority 2')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        },
        "toolname2": {
            "Reason 1": "Explanation ('Reason 1's explanation should be of the priority 1')",
            "Reason 2": "Explanation ('Reason 2's explanation should be of the priority 2')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        },
        "toolname3": {
            "Reason 1": "Explanation ('Reason 1's explanation should be of the priority 1')",
            "Reason 2": "Explanation ('Reason 2's explanation should be of the priority 2')",
            "Reason 3": "Explanation",
            "Reason 4": "Explanation",
            "Reason 5": "Explanation"
        }
    },
    Make sure u always give the top 3 companies I dont want less than 3 or greater than 3
    The company name should be related to the domain given above
    Try to give domain specific companies

    Note:- Sometimes it give Company2,company3 as company names give real company names related to that domain
        Please look at the domain mentioned above if the company is related to that domain then only give the output take your time to check 
    
    "Leading_companies": {
        "toolname1": {
             
                "company1": "company1_name" (Company should be related to the domain metioned above),
                "company2": "company2_name" (Company should be related to the domain metioned above),
                "company3": "company3_name" (Company should be related to the domain metioned above)
            
        },
        "toolname2": {
             
                "company1": "company1_name" (Company should be related to the domain metioned above),
                "company2": "company2_name" (Company should be related to the domain metioned above),
                "company3": "company3_name" (Company should be related to the domain metioned above)
            
        },
        "toolname3": {
            
                "company1": "company1_name" (Company should be related to the domain metioned above),
                "company2": "company2_name" (Company should be related to the domain metioned above),
                "company3": "company3_name" (Company should be related to the domain metioned above)            
        }
    }

}`;

          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            seed: 1,
            temperature: 0,
          });

          const text = response.choices[0].message.content;
          const parsedJson = JSON.parse(text);

          const leadingCompanies = {};

          Object.keys(parsedJson.Leading_companies).forEach((tool) => {
            const companiesObject = parsedJson.Leading_companies[tool];
            leadingCompanies[tool] = {
              "-Companies that use this tool": companiesObject,
            };
          });
          const arrayGptOutput = parsedJson.Top_tools;

          const topToolData = await openAiDb.getItsmData(arrayGptOutput);
          return {
            ...topToolData,
            reason: parsedJson.Reasons,
            Leading_companies: leadingCompanies,
          };
        } else {
          console.log("Inside else");
          return false;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

export default {
  generateData,
};
