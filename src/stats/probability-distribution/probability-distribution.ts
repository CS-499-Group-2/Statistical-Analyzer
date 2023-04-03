import { Operation, Result } from "../operation";
import NormalDistribution from "normal-distribution";

interface Inputs {
  Mean: undefined;
  "Standard Deviation": undefined;
}

/**
 * Although I think we could use the column to find the mean and standard dev, it seems that most implementations of this operation
 * (MiniTab, Excel) ask the user to input the mean and standard deviation
 */
export const ProbabilityDistribution: Operation<Inputs> = {
  name: "Probability Distribution",
  isValid: (selectedCellsByColumn) => selectedCellsByColumn.length !== 0,
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const meanValue = inputs.Mean;
    const standardDeviationValue = inputs["Standard Deviation"];
    // Validation
    if (standardDeviationValue < 0) {
      alert("Standard deviation must be a positive number.");
      return [];
    }
    return selectedCellsByColumn.map((column) => {
      const title = `${column.name} | Probability Distribution (Mean: ${meanValue}, Standard Deviation: ${standardDeviationValue})`;
      const normalDist = new NormalDistribution(meanValue, standardDeviationValue);
      const values = column.values.map((value) => normalDist.cdf(value));
      const graphXValues = [2, 3, 4, 5, 6, 7, 8];
      return {
        name: title,
        values: values,
        graphs: [{
          chartType: "Normal Distribution",
          title: title,
          data: graphXValues.map((value) => ({x: value, y: normalDist.pdf(value)})),
          lineLabel: "Normal Distribution Curve",
          curved: true,
          color: "blue",
        }]
      };
    });
  },
  keys: ["Mean", "Standard Deviation"]
};
