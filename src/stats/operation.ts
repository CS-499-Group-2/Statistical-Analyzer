import {CsvData} from "../file-handling/import";
import {Graph} from "../components/graph-display/graphs";

export type Operation<T = void> = TypedOperation<T> | ComponentOperation;

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

/** If your operation uses a component, these are the props that will be passed in */
export interface OperationProps {
  /** This boolean will be true when your operation has been selected by the user */
  selected: boolean;
  /** Call this function when complete so your component becomes deselected */
  deselect: () => void;
  /** Represents the spreadsheet */
  spreadsheet: CsvData;
  /** Represents the selected cells */
  selectedCellsByColumn: Column[];
  /** Call this function with the result when the user has finished all necessary inputs */
  addResult: (result: Result) => void;
}

/** Represents an operation that can be performed on a stat. */
interface TypedOperation<T> {
  /** The name of the operation */
  name: string;
  type: "Typed";
  /**
   * The function that is called when the operation is selected.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   * @param spreadsheet The spreadsheet that the operation is being performed on.
   * @param inputs The inputs that the user has provided for this operation.
   * @returns Any results from this operation.
   */
  onSelected: (selectedCellsByColumn: Column[], spreadsheet: CsvData, inputs: {[Property in keyof T]: number | string | boolean})
    => Result[];
  /**
   * The function that is called to determine if the operation is valid.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   */
  isValid: (selectedCellsByColumn: Column[]) => boolean;

  /** The names of the inputs that this operation takes along with what the input should be */
  keys: {[Property in keyof T]: "Number" | "Text" | "Checkbox" | "Color"};
}

interface ComponentOperation {
  /** The name of the operation */
  name: string;
  type: "Component";
  /** A component for the operation instead. If this is used, then onSelected becomes invalid */
  component: React.ComponentType<OperationProps>;
  /**
   * The function that is called to determine if the operation is valid.
   * @param selectedCellsByColumn The cells that are selected in the spreadsheet, grouped by column, so each array in the array
   * represents a column.
   */
  isValid: (selectedCellsByColumn: Column[]) => boolean;
}
