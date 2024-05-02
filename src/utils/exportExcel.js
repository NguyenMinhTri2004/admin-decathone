import * as XLSX from "xlsx/xlsx.mjs";

class ExportExcel {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static exportExcel(data, nameSheet, nameFile) {
    return new Promise((resolve, reject) => {
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(data)
      // ws.setColumnLabel("A", "Tên");
      XLSX.utils.book_append_sheet(wb, ws, nameSheet)
      XLSX.writeFile(wb, `${nameFile}.xlsx`)
    //   const workbook = XLSX.utils.json_to_sheet(data, {
    //     sheetName: "MySheet",
    //   });

    //   const worksheet = workbook.getWorksheet("MySheet");

    //   worksheet.getCellRange("A1:B2").setColumnWidth(20);
    //   worksheet.getCell("A1").setValue("Tên");
    //   worksheet.getCell("B1").setValue("Tuổi");

    //   worksheet.setColumnLabel("A", "Tên");

    //   workbook.save("my-file.xlsx");
      resolve("ok");
    });
  }
}

export default ExportExcel;
