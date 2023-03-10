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
        contextMenu={["row_above", "row_below", "remove_row" , "col_left", "col_right", "remove_col"]}
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
      />
    </div>);
};