import XLSX from 'xlsx';
import axios from 'axios';
const generateData = async (file) => {
   try {
    
    const { buffer } = file;
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const requirement = XLSX.utils.sheet_to_json(worksheet);
    
    const response = await axios.post('http://127.0.0.1:8000/tools/', requirement);
  
    const arrayGptOutput = response.data.response.slice(1, -1).split(', ').map(item => item.trim());
    const topToolData = {};
    const allToolsData = await readExcelToJson(); 
    
    arrayGptOutput.forEach((toolName) => {
        const cleanedToolName = toolName.replace(/'/g, ''); 
        topToolData[cleanedToolName] = allToolsData[cleanedToolName];
    });
    
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
    throw error
   }
 }


export default {
   generateData,
};


