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
import { NumericCellType, TextCellType, registerCellType } from "handsontable/cellTypes";
import { registerLanguageDictionary, enUS } from "handsontable/i18n";
import {
  registerPlugin,
  ContextMenu,
  AutoColumnSize,
  ManualColumnResize,
  Autofill,
  Formulas,
  DragToScroll,
  UndoRedo,
} from "handsontable/plugins";
import { useThemeStore } from "../../stores/theme-store";

registerPlugin(ContextMenu);
registerPlugin(AutoColumnSize);
registerPlugin(ManualColumnResize);
registerPlugin(Autofill);
registerPlugin(Formulas);
registerPlugin(DragToScroll);
registerPlugin(UndoRedo);
registerCellType(NumericCellType);
registerCellType(TextCellType);
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
  const theme = useThemeStore(state => state.isDark);

  return (
    <HotTable
      id = {theme ? "dark" : "light"}
      tableClassName={theme ? "dark-table" : "light-table"}
      activeHeaderClassName="ht__active_highlight"
      currentHeaderClassName="ht__highlight"
      currentRowClassName={theme ? "dark-row" : "light-row"}
      currentColClassName={theme ? "dark-col" : "light-col"}
      data={props.data.data}
      ref={spreadsheetRef}
      rowHeaders={true}
      colHeaders={props.data.headers}
      formulas={{
        engine: HyperFormula,
      }}
      rowHeights={23}
      height={"100%"}
      stretchH="all"
      width={"100%"}
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
      afterSelectionEnd={() => {
        try {
          const data = spreadsheetRef.current?.hotInstance.getData(); // Get the data from the spreadsheet
          const selectedCells = spreadsheetRef.current?.hotInstance.getSelectedRange(); // Get the selected cells
          const columns = selectedCells.flatMap(group => {
            const cells: number[][] = []; // Create an array to store the cells
            const startRow = Math.min(group.from.row, group.to.row); // Get the start row
            const startCol = Math.min(group.from.col, group.to.col); // Get the start column
            const endRow = Math.max(group.from.row, group.to.row); // Get the end row
            const endCol = Math.max(group.from.col, group.to.col);
            for (let row = startRow; row <= endRow; row++) {
              // Loop through the rows
              if (!data[row]) continue; // Skip if the row is empty
              cells[row] = data[row].slice(startCol, endCol + 1); // Add the cells to the array
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
            // Loop through every column. Filter out the columns to only their numbers. If there are no numbers, remove the column
            for (let i = 0; i < transposed.length; i++) {
              const column = transposed[i];
              const columnButOnlyNumbers = column.filter(value => typeof value === "number");
              if (columnButOnlyNumbers.length === 0) {
                transposed.splice(i, 1);
                i--;
              }
              transposed[i] = columnButOnlyNumbers;
            }
            return transposed.map((column, index) => ({
              values: column,
              name: props.data.headers[startCol + index] ?? getColumnHeader(startCol + index),
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
  );
};
