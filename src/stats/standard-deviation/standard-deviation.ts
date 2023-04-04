import { Operation, Result } from "../operation";
import { calculateStandardDeviation } from "../calculations";

//Defining the inputs
interface Inputs {
    "Color": "color";
} 

export const StandardDeviation: Operation<Inputs> = {
  name: "Standard Deviation",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const color = inputs["Color"] as string;
    const standardDeviation = calculateStandardDeviation(selectedCellsByColumn[0].values);
    return [{
      name: "Standard Deviation",
      values: [standardDeviation],
      graphs: [{
        chartType: "Horizontal Bar",
        data: [{
          value: standardDeviation,
          label: standardDeviation.toString(),
          color: color,
        }],
      }],
    }];
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys: {
    "Color": "Color",
  }
};
