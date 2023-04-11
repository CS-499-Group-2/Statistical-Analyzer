import { Operation , Result } from "../operation";
import { calculateCorrelation } from "calculate-correlation";
//Defining the inputs that the operation will take
interface Inputs {
    "Line color?": undefined;
}

//Defining the operation
export const CorrelationCoeffcient: Operation<Inputs> = {
  name: "Correlation Coefficient",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const lineColor = inputs["Line color?"] as string;
    return selectedCellsByColumn.map((column) => {
      const correlationCoefficient = calculateCorrelation(column.values, column.values);
      const title = `${column.name} | Correlation Coefficient`;
      return {
        name: title,
        values: [correlationCoefficient],
        graphs: [{
          chartType: "Normal Distribution",
          data: column.values.map((value, index) => ({ x: index + 1, y: value })),
          title: title,
          color: lineColor,
          lineLabel: "Data",
        }],
      };
    });
  },
  isValid: (selectedCellsByColumn): boolean => {
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 2) {
        alert("Please select at least two cells in each column.");
        return false;
      }
    }
    return true;
  },
  keys : {
    "Line color?" : "Color",
  },
};