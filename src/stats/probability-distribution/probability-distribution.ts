import { Result, TypedOperation } from "../operation";
import NormalDistribution from "normal-distribution";
import { mean, standardDeviation } from "simple-statistics";

interface Inputs {
  "Line Color",
  "Fill Color"
}

/**
 * Although I think we could use the column to find the mean and standard dev, it seems that most implementations of this operation
 * (MiniTab, Excel) ask the user to input the mean and standard deviation
 */
export const ProbabilityDistribution: TypedOperation<Inputs> = {
  name: "Probability Distribution",
  type: "Typed",
  isValid: (selectedCellsByColumn) => selectedCellsByColumn.length !== 0,
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const lineColor = inputs["Line Color"] as string;
    const fillColor = inputs["Fill Color"] as string;
    return selectedCellsByColumn.map((column) => {
      const title = `${column.name} | Probability Distribution`;
      const meanValue = mean(column.values);
      const standardDeviationValue = standardDeviation(column.values);
      const normalDist = new NormalDistribution(meanValue, standardDeviationValue);
      const values = column.values.map((value) => normalDist.cdf(value));
      const graphXValues = column.values.sort((a, b) => a - b); // Sort the values in ascending order
      return {
        name: title,
        values: values,
        graphs: [{
          chartType: "Normal Distribution",
          title: title,
          data: graphXValues.map((value) => ({x: value, y: normalDist.pdf(value)})),
          lineLabel: "Normal Distribution Curve",
          curved: true,
          color: fillColor,
          lineColor: lineColor,
          filled: true
        }]
      };
    });
  },
  keys: {
    "Line Color": "Color",
    "Fill Color": "Color"
  }
};
