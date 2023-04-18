import { Result, TypedOperation } from "../operation";
import { variance } from "simple-statistics";

//Defining the inputs that the operation will take
interface Inputs {
  "Color of the Variance Graph": undefined;
}
//Defining the operation
export const Variance: TypedOperation<Inputs> = {
  name: "Variance",
  type: "Typed",
  description: "Calculates the variance of a set of numbers. Plots the variance as a normal distribution.",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const graphColor = inputs["Color of the Variance Graph"] as string;
    return selectedCellsByColumn.map(column => {
      const varianceValue = variance(column.values);
      const title = `${column.name} | Variance`;
      return {
        name: title,
        values: [varianceValue],
        graphs: [
          {
            chartType: "Normal Distribution",
            data: column.values.map((value, index) => ({ x: index + 1, y: value })),
            title: title,
            color: graphColor,
            lineLabel: "Data",
          },
        ],
      };
    });
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys: {
    "Color of the Variance Graph": "Color",
  },
};
