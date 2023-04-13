import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import "./spreadsheet.css";
import { CsvData } from "../../file-handling/import";
import { HyperFormula } from "hyperformula";
import { Column } from "../../stats/operation";
import { transpose } from "matrix-transpose";
import { registerCellType, NumericCellType } from "handsontable/cellTypes";
import { registerLanguageDictionary, enUS } from "handsontable/i18n";
import { registerPlugin, ContextMenu, AutoColumnSize, ManualColumnResize } from "handsontable/plugins";

registerPlugin(ContextMenu);
registerPlugin(AutoColumnSize);
registerPlugin(ManualColumnResize);
registerCellType(NumericCellType);
registerLanguageDictionary(enUS);

const getColumnHeader = (column: number) => {
  let header = "";
  while (column >= 0) {
    header = String.fromCharCode((column % 26) + 65) + header;
    column = Math.floor(column / 26) - 1;
  }
  return header;
};

/**
 * The properties to pass to the spreadsheet component
 */
export interface SpreadsheetProps {
  /** The data to be shown  */
  data: CsvData;
  onCellChange?: (row: number, column: number, value: number) => void;
  onHeaderChange?: (column: number, value: string) => void;
  onCellsSelected?: (columns: Column[]) => void;
}

export const Spreadsheet = (props: SpreadsheetProps) => {
  const spreadsheetRef = React.useRef<HotTable>(null);

  return (
    <div className="sheet">
      <HotTable
        data={props.data.data}
        ref={spreadsheetRef}
        rowHeaders={true}
        colHeaders={props.data.headers}
        formulas={{
          engine: HyperFormula,
        }}
        width="100%"
        height="100%"
        rowHeights={23}
        type="numeric"
        colWidths={100}
        // @ts-expect-error The types for handson table seem to not match up here, even though this is legal; see: https://handsontable.com/docs/react-data-grid/context-menu/#context-menu-with-a-fully-custom-configuration
        contextMenu={{
          items: [
            "row_above",
            "row_below",
            "remove_row",
            "col_left",
            "col_right",
            "remove_col",
            {
              name: "Edit Header",
              key: "edit_header",
              hidden() {
                const selected = this.getSelectedRange();
                if (selected.length !== 1) return true; // Hide if more than one range is selected
                const selectedRange = selected[0]; // Get the first range that is selected
                if (selectedRange.from.col !== selectedRange.to.col) return true; // Hide if the range is more than one column
                return false;
              },
              callback: (_key, selection) => {
                const cell = selection[0]; // Get the first cell that is selected
                const headerIndex = cell.start.col; // Get the column index of the header
                const headerValue = props.data.headers[headerIndex]; // Get the header value
                const newHeaderValue = prompt("Enter the new header value", headerValue); // Prompt the user for the new header value
                if (newHeaderValue) {
                  // If the user entered a value
                  props.onHeaderChange?.(headerIndex, newHeaderValue); // Call the onHeaderChange callback
                }
              },
            },
          ],
        }}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        validator={"numeric"}
        manualColumnResize
        beforeChange={changes => {
          // With the beforeChange callback, we can prevent the change from happening. We do this by returning false. See: https://handsontable.com/docs/react-data-grid/api/hooks/#beforechange
          // We want to prevent the change if any of the new values are not numbers
          if (
            changes.some(([, , , newValue]) => {
              if (isNaN(Number(newValue))) return true;
            })
          ) {
            return false;
          }
          // We don't need the old value
          changes?.forEach(([row, column, , newValue]) => {
            let columnNumber: number;
            // For some reason, the column can be a string or a number. I don't know why, but this is a workaround
            if (typeof column === "string") {
              columnNumber = props.data.headers.indexOf(column);
            } else {
              columnNumber = column;
            }
            // Convert the value to a number
            const newValueAsNumber = parseFloat(newValue);
            // Call the onCellChange callback if it exists
            props.onCellChange?.(row, columnNumber, newValueAsNumber);
          });
        }}
        afterSelectionEnd={() => {
          try {
            const data = props.data.data; // Get the data
            const selectedCells = spreadsheetRef.current?.hotInstance.getSelectedRange(); // Get the selected cells
            const columns = selectedCells.flatMap(group => {
              const cells: number[][] = []; // Create an array to store the cells
              for (let row = group.from.row; row <= group.to.row; row++) {
                // Loop through the rows
                if (!data[row]) continue; // Skip if the row is empty
                cells[row] = data[row].slice(group.from.col, group.to.col + 1); // Add the cells to the array
              }
              for (let row = 0; row < cells.length; row++) {
                // Loop through the rows
                // Remove any empty rows
                if (!cells[row]) {
                  cells.splice(row, 1);
                  row--;
                }
              }
              const transposed = transpose(cells);
              return transposed.map((column, index) => ({
                values: column,
                name: props.data.headers[group.from.col + index] ?? getColumnHeader(group.from.col + index),
              }));
            });
            console.log("Columns", columns);
            props.onCellsSelected?.(columns); // Call the onCellsSelected callback
          } catch (e) {
            console.error(e);
          }
        }}
        outsideClickDeselects={false}
      />
    </div>
  );
};