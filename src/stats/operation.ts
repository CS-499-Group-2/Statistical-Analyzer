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
  onSelected: (selectedCellsByColumn: number[][], spreadsheet: CsvData, inputs: {[Property in keyof T]: number}) => Result[];
  /**
   * The function that is called to determine if the operation is valid.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   */
  isValid: (selectedCellsByColumn: number[][]) => boolean;

  /** The names of the inputs that this operation takes. */
  keys: Array<keyof T & string>;
}

/**
 * Transposes a 2D array of numbers.
 * @param cells The 2D array of numbers to transpose.
 */
export const transpose = (cells: number[][]): number[][] => {
  return cells[0].map((_, colIndex) => cells.map(row => row[colIndex]));
};

