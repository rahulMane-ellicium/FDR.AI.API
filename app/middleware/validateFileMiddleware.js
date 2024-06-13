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
        console.error("No file uploaded");
        throw new Error("No file uploaded");
      }
  
      console.log("Processing file:", file.originalname);

    const { buffer } = file;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const requirement = XLSX.utils.sheet_to_json(worksheet);

    if (!requirement.length) {
        console.error("Empty file error:", empty_File);
      throw empty_File;
    }

    const keysArray = Object.keys(requirement[0]);
    console.log("Extracted keys from Excel file:", keysArray);
    const missingKeys = standardInput.filter(key => !keysArray.includes(key));

    if (missingKeys.length>0) {
        console.error("Missing keys error:", missingKeys);
      throw {
        wrong_file,
      details: `The following required keys are missing from the Excel file: ${missingKeys.join(", ")}`
    };
    }
    

    console.log("File validation successful");
    req.requirement = requirement;
    next();
  } catch (error) {
    console.error("Error in file validation middleware:", error);
    next(error);
  }
};

export default validateFileMiddleware;
