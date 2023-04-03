import {CsvData} from "../file-handling/import";
import {Graph} from "../components/graph-display/graphs";

/**
 * Component with name and values attributes
 */
export interface Result {
  /** Represents type of stats */
  name: string;
  /** Represents number(s) returned from calculating those stats */
  values: number[];
  /** Represents the graph(s) to be displayed */
  graphs: Graph[];
}

export interface Column {
  /** Represents the column name */
  name: string;
  /** Represents the column values */
  values: number[];
}

/** Represents an operation that can be performed on a stat. */
export interface Operation<T> {
  /** The name of the operation */
  name: string;
  /**
   * The function that is called when the operation is selected.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   * @param spreadsheet The spreadsheet that the operation is being performed on.
   * @param inputs The inputs that the user has provided for this operation.
   * @returns Any results from this operation.
   */
  onSelected: (selectedCellsByColumn: Column[], spreadsheet: CsvData, inputs: {[Property in keyof T]: number}) => Result[];
  /**
   * The function that is called to determine if the operation is valid.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   */
  isValid: (selectedCellsByColumn: Column[]) => boolean;

  /** The names of the inputs that this operation takes along with what the input should be */
  keys: {[Property in keyof T]: "Number" | "Text" | "Checkbox" | "Color"};
}
