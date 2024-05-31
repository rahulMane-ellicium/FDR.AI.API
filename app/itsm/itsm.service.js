import XLSX from "xlsx";

const readExcelFileFromBuffer = async (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const jsonData = {};

    workbook.SheetNames.forEach(sheetName => {
      const ws = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (sheetData.length > 1) {
        const headers = sheetData[0];
        const values = sheetData.slice(1);

        jsonData[sheetName] = values.map(row => {
          const rowData = {};
          headers.forEach((header, columnIndex) => {
            const cellValue = row[columnIndex];
            if (typeof cellValue === "string" && (cellValue.startsWith("{") || cellValue.startsWith("["))) {
              try {
                rowData[header] = JSON.parse(cellValue);
              } catch (error) {
                rowData[header] = cellValue;
              }
            } else {
              rowData[header] = cellValue;
            }
          });
          return rowData;
        });
      }
    });

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// const processExcelFile = async (buffer) => {
//   try {
//     // Read Excel file and convert to JSON
//     const jsonData = await readExcelFileFromBuffer(buffer);

//     // Insert data into the database
//     await itsmDB.insertDataIntoDB(jsonData);
//   } catch (error) {
//     console.error('Error processing Excel file:', error);
//     throw error;
//   }
// };

export default {
  readExcelFileFromBuffer,
  // processExcelFile
};
