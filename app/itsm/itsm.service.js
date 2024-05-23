import XLSX from 'xlsx'

const readExcelFileFromBuffer = async (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    let excelData = []; 

    const sheetNames = workbook.SheetNames; 

    for (let sheetIndex = 0; sheetIndex < sheetNames.length; sheetIndex++) {
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[sheetIndex]], { header: 1 });

      if (sheetData.length > 1) {
        const headers = sheetData[0];
        const rows = sheetData.slice(1); 

        rows.forEach(row => {
          const rowData = {}; 
          headers.forEach((header, columnIndex) => {
            rowData[header] = row[columnIndex];
          });
          excelData.push(rowData);
        });
      }
    }
    return excelData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default {
  readExcelFileFromBuffer,
};



