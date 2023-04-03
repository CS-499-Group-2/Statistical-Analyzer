import * as React from "react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import "./spreadsheet.css";
import { CsvData } from "../../file-handling/import";
import { HyperFormula } from "hyperformula";

registerAllModules();

/**
 * The properties to pass to the spreadsheet component
 */
export interface SpreadsheetProps {
  /** The data to be shown  */
  data: CsvData,
  onCellChange?: (row: number, column: number, value: number) => void
  onHeaderChange?: (column: number, value: string) => void
  onCellsSelected?: (cells: number[][]) => void
}

export const Spreadsheet = (props: SpreadsheetProps) => {

  return (
    <div className="sheet">
      <HotTable
        data={props.data.data}
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
                if (newHeaderValue) { // If the user entered a value
                  props.onHeaderChange?.(headerIndex, newHeaderValue); // Call the onHeaderChange callback
                }
              }
            }
          ]
        }}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        validator={"numeric"}
        beforeChange={(changes) => {
          // With the beforeChange callback, we can prevent the change from happening. We do this by returning false. See: https://handsontable.com/docs/react-data-grid/api/hooks/#beforechange
          // We want to prevent the change if any of the new values are not numbers
          if (changes.some(([row, column, oldValue, newValue]) => isNaN(parseFloat(newValue)))) return false;
          // We don't need the old value
          changes?.forEach(([row, column, oldValue, newValue]) => {
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
        afterSelectionEnd={(rowStart, columnStart, rowEnd, columnEnd) => {
          const data = props.data.data; // Get the data
          const cells: number[][] = []; // Create an array to store the cells
          for (let row = rowStart; row <= rowEnd; row++) { // Loop through the rows
            cells[row] = data[row].slice(columnStart, columnEnd + 1); // Add the cells to the array
          }
          props.onCellsSelected?.(cells); // Call the onCellsSelected callback
        }}
        outsideClickDeselects={false}
      />
    </div>);
};