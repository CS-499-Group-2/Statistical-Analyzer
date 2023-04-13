import { Operation , Result, TypedOperation } from "../operation";
import { variance , standardDeviation , mean } from "simple-statistics";
import { calculateMean  } from "../calculations";
//Defining the inputs that the operation will take
interface Inputs {
    "Color of the Variance Graph": undefined;
}
//Defining the operation
export const CoeficientOfVariance: TypedOperation<Inputs> = {
  name: "Coefficient of Variation",
  type : "Typed",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const graphColor = inputs["Color of the Variance Graph"] as string;
    return selectedCellsByColumn.map((column) => {
      const meanValue = mean(column.values);
      const standardDeviationValue = standardDeviation(column.values);
      const coefficientOfVariationValue = standardDeviationValue / meanValue;
      const title = `${column.name} | Coefficient of Variation`;
      return {
        name: title,
        values: [coefficientOfVariationValue],
        graphs: [{
          chartType: "Normal Distribution",
          data: column.values.map((value, index) => ({ x: index + 1, y: value })),
          title: title,
          color: graphColor,
          lineLabel: "Data",
        }],
      };
    });
  },
  isValid: (selectedCellsByColumn): boolean => {
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 2) {
        return false;
      }
    }
    return true;
  },
  keys : {
    "Color of the Variance Graph" : "Color",
  },
};


