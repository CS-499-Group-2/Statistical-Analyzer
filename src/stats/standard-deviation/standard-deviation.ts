import { Result, TypedOperation } from "../operation";
import { calculateStandardDeviation, calculateMean } from "../calculations";

//Defining the inputs
interface Inputs {
  "Point Color": "Color";
  "Line Color": "Color";
  "Fill Color": "Color";
}

export const StandardDeviation: TypedOperation<Inputs> = {
  name: "Standard Deviation",
  type: "Typed",
  description: "Calculates the standard deviation of a set of numbers. Plots the standard deviation as a normal distribution.",
  isValid: selectedCellsByColumn => selectedCellsByColumn.length !== 0,
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const pointColor = inputs["Point Color"] as string;
    const lineColor = inputs["Line Color"] as string;
    const fillColor = inputs["Fill Color"] as string;
    const standardDeviation = calculateStandardDeviation(selectedCellsByColumn[0].values);
    const mean = calculateMean(selectedCellsByColumn[0].values);
    const xValues = selectedCellsByColumn[0].values.sort((a, b) => a - b);
    return [
      {
        name: "Standard Deviation",
        values: [standardDeviation],
        graphs: [
          {
            chartType: "Normal Distribution",
            title: "Standard Deviation",
            data: xValues.map((value, index) => ({
              x: value,
              y:
                (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
                Math.exp(-Math.pow(value - mean, 2) / (2 * Math.pow(standardDeviation, 2))),
            })),
            color: pointColor,
            lineColor: lineColor,
            filled: true,
            curved: true,
          },
        ],
      },
    ];
  },

  keys: {
    "Point Color": "Color",
    "Line Color": "Color",
    "Fill Color": "Color",
  },
};
