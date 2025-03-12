import XLSX from "xlsx-js-style";

export const currencyFormatter = (currencyColumns, rows, worksheet) => {
    const colKeys = Object.keys(rows[0]); // Get column keys from the first row
    const colIndexes = currencyColumns.map((col) => colKeys.indexOf(col) + 1); // Map column names to their index + 1

    for (let i = 2; i <= rows.length + 1; i++) { // Iterate over row indices
        colIndexes.forEach((colIndex) => { // Iterate over column indices
            const cellAddress = XLSX.utils.encode_cell({ r: i - 1, c: colIndex - 1 }); // Get the cell address
            const cell = worksheet[cellAddress];

            if (cell) {
                // Attempt to parse the value as a number
                const parsedValue = parseFloat(cell.v);

                if (!isNaN(parsedValue)) {
                    // Assign the parsed value to the cell
                    cell.v = parsedValue;
                    cell.t = "n"; // Set cell type to number
                    cell.z = "$#,##0.00"; // Apply currency formatting
                    cell.s = { // Apply styling
                        font: { color: { rgb: "000000" }, bold: true },
                        alignment: { horizontal: "center" },
                    };
                } else {
                    console.warn(`Cell at ${cellAddress} does not contain a valid number:`, cell.v);
                }
            }
        });
    }
};


export const headerFormatter = (worksheet) => {
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c });
      if (worksheet[headerCell]) {
        worksheet[headerCell].s = {
          font: { bold: true, color: { rgb: "000000" } },
          fill: { patternType: "solid", fgColor: { rgb: "BDCAAD" } }, // Green header background
          alignment: { horizontal: "center" },
        };
      }
    }
}