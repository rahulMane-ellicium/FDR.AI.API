import XLSX from 'xlsx'




const readExcelFileFromBuffer = async (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    let data = [];

    const sheets = workbook.SheetNames;

    for (let i = 0; i < sheets.length; i++) {
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[i]], { header: 1 });
    
      if (sheetData.length > 1) {
        const headers = sheetData[0];
        const values = sheetData.slice(1);
      
    
        values.forEach(row => {
          const rowObj = {};
          headers.forEach((header, index) => {
            rowObj[header] = row[index];
          });
          data.push(rowObj);
        });
      }
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  readExcelFileFromBuffer,
};



