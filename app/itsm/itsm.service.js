import XLSX from 'xlsx'

const readExcelFileFromBuffer = async (buffer, limit = 3) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const jsonData = {};

    for (let sheetIndex = 0; sheetIndex < Math.min(limit, workbook.SheetNames.length); sheetIndex++) {
      const sheetName = workbook.SheetNames[sheetIndex];
      const ws = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (sheetData.length > 1) {
        const headers = sheetData[0];
        const values = sheetData.slice(1);

        const sheetObj = {};

        values.slice(0, limit).forEach(row => {
          const rowData = {};
          headers.forEach((header, columnIndex) => {
            const cellValue = row[columnIndex];

            if (typeof cellValue === 'string' && (cellValue.startsWith('{') || cellValue.startsWith('['))) {
              
              rowData[header] = JSON.parse(cellValue);
            } else {
              rowData[header] = cellValue;
            }
          });
          sheetObj[sheetName] = rowData;
        });

        Object.assign(jsonData, sheetObj);
      }
    }

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};





// const readExcelToJson = async () => {
//   try {
//     const wb = XLSX.readFile("PROJECT_features.xlsx");
//     const jsonData = {};

//     wb.SheetNames.forEach(sheetName => {
//       const ws = wb.Sheets[sheetName];
//       const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

//       // Convert sheet data to object
//       const headers = sheetData[0];
//       const values = sheetData.slice(1);
//       const sheetObj = {};

//       for (let i = 0; i < headers.length; i++) {
//         if (values[0][i].startsWith('{') || values[0][i].startsWith('[')) {
//           // Parse JSON string to object or array
//           sheetObj[headers[i]] = JSON.parse(values[0][i]);
//         } else {
//           sheetObj[headers[i]] = values[0][i];
//         }
//       }

//       jsonData[sheetName] = sheetObj;
//     });

//     return jsonData;
//   } catch (error) {
//     console.log(error);
//     throw error
//   }
// }



export default {
  readExcelFileFromBuffer,
  // readExcelToJson,
  
};




