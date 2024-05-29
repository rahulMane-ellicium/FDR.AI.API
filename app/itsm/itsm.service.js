import XLSX from "xlsx";

const readExcelFileFromBuffer = async (buffer, limit = 3) => {
  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const jsonData = {};

    for (
      let sheetIndex = 0;
      sheetIndex < Math.min(limit, workbook.SheetNames.length);
      sheetIndex++
    ) {
      const sheetName = workbook.SheetNames[sheetIndex];
      const ws = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (sheetData.length > 1) {
        const headers = sheetData[0];
        const values = sheetData.slice(1);

        const sheetObj = {};

        values.slice(0, limit).forEach((row) => {
          const rowData = {};
          headers.forEach((header, columnIndex) => {
            const cellValue = row[columnIndex];

            if (
              typeof cellValue === "string" &&
              (cellValue.startsWith("{") || cellValue.startsWith("["))
            ) {
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




export default {
  readExcelFileFromBuffer,

};
