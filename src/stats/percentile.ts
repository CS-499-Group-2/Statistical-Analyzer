import { Operation, Result } from "./operation";

/** Here I define the inputs that the operation will take */
interface Inputs {
  Amount: undefined;
}

/** Here I define the operation */
export const Percentile: Operation<Inputs> = {
  name: "Percentile",
  onSelected: (selectedCellsByColumn, spreadsheet, inputNames): Result[] => {
    console.log(selectedCellsByColumn, spreadsheet, inputNames);
    return [];
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  // Just repeat the input names here, so that the operation knows what to expect
  keys: ["Amount"],
};
