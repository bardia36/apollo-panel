import * as XLSX from "xlsx";

export interface ExcelExportConfig {
  data: any[];
  filename: string;
  sheetName?: string;
  columns?: { key: string; header: string }[];
  columnWidth?: number;
}

export const exportToExcel = ({
  data,
  filename,
  sheetName = "Sheet1",
  columns,
  columnWidth = 20, // Default column width of 20 characters
}: ExcelExportConfig) => {
  try {
    // If columns are provided, transform data to match column configuration
    const processedData = columns
      ? data.map((item) => {
          const row: any = {};
          columns.forEach((col) => {
            row[col.header] = item[col.key];
          });
          return row;
        })
      : data;

    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // Set column widths
    const columnCount = Object.keys(processedData[0] || {}).length;
    const columnWidths = Array(columnCount).fill({ wch: columnWidth });
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw new Error("Failed to export data to Excel");
  }
};
