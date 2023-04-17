import { Result, TypedOperation } from "../operation";
import { quantile } from "simple-statistics";

/** Here I define the inputs that the operation will take */
interface Inputs {
  "Percentile Amount": undefined;
  "Reference Line Color": undefined;
  "Point Color": undefined;
}

/** Here I define the operation */
export const Percentile: TypedOperation<Inputs> = {
  name: "Percentile", // The name of the operation
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const percentileAmount = inputs["Percentile Amount"] as number;
    const graphColor = inputs["Point Color"] as string;
    const referenceLineColor = inputs["Reference Line Color"] as string;
    // Validation
    if (percentileAmount < 0 || percentileAmount > 1) {
      alert("Percentile amount must be a decimal between 0 and 1.");
      return [];
    }
    // Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 2) {
        alert("Please select at least two cells in each column.");
        return [];
      }
    }
    // For each column, calculate the percentile and return a result
    return selectedCellsByColumn.map((column) => {
      const quantileValue = quantile(column.values, percentileAmount);
      const title = `${column.name} | Percentile | ${percentileAmount * 100}%`;
      return {
        name: title,
        values: [quantileValue],
        graphs: [{
          chartType: "Normal Distribution",
          data: column.values.map((value, index) => ({ x: index + 1, y: value })),
          title: title,
          color: graphColor,
          lineLabel: "Data",
          annotations: { // The annotation is the line that shows the percentile
            line1: {
              type: "line",
              yMin: quantileValue,
              yMax: quantileValue,
              mode: "horizontal",
              borderColor: referenceLineColor,
              label: {
                display: true,
                content: `Percentile ${percentileAmount * 100}%`,
              }
            }
          }
        }],
      };
    });
  },
  type: "Typed",
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  // Just repeat the input names here, so that the operation knows what to expect
  keys: {
    "Percentile Amount": "Number",
    "Point Color": "Color",
    "Reference Line Color": "Color",
  },
};
