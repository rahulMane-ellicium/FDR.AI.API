import XLSX from "xlsx";
import { openAImessages } from '../messages/openAImessages.js';

const { empty_File, wrong_file } = openAImessages;

const standardInput = [
  "Customer Name",
  "Domain",
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
  "Implementation timeline",
  "Custom Module",
  "Ticket Volume(monthly )",
  "No of Catalog/Service Request Forms",
  "Level of approval(max)",
  "Full-Copy Sandbox",
  "Ticket Source",
  "Cross BU Ticket Transfer",
  "Endpoint Management",
  "Reconciliation of Assets",
  "Normalization of Assets",
  "Asset Count",
  "Priority Order Of features"
];

const validateFileMiddleware = (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
        
        throw new Error("No file uploaded");
      }
  
      

    const { buffer } = file;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const requirement = XLSX.utils.sheet_to_json(worksheet);

    if (!requirement.length) {
      
      throw empty_File;
    }

    const keysArray = Object.keys(requirement[0]);

    const missingKeys = standardInput.filter(key => !keysArray.includes(key));

    if (missingKeys.length>0) {
       
      throw wrong_file
     

    }
    

   
    req.requirement = requirement;
    next();
  } catch (error) {
    
    next(error);
  }
};

export default validateFileMiddleware;
