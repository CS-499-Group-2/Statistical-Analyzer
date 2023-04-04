import { Operation, Result } from "../operation";
import { calculateMedian } from "../calculations";

//Defining the inputs
interface Inputs {
    "Color of the median line": undefined;
}

export const Median: Operation<Inputs> = {
  name: "Median",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const medianColor = inputs["Color of the median line"] as string;

    //Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 1) {
        alert("Please select at One Cell.");
        return [];
      }
    }

    //For each column, calculate the median and return a result
    return selectedCellsByColumn.map((column) => {
      const medianValue = calculateMedian(column.values);
      const title = `${column.name} | Median`;
      return {
        name: title,
        values: [medianValue],
        graphs: [{
          chartType: "Horizontal Bar",
          data: [{
            value: medianValue,
            color: medianColor,
            label: "Median",

          }],
        }],
      };
    });
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys: {
    "Color of the median line": "Color",
  },
};