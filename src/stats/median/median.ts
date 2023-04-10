import { Operation, Result } from "../operation";
import { calculateMedian } from "../calculations";

//Defining the inputs
interface Inputs {
    "Color of the median graph": undefined;
}

export const Median: Operation<Inputs> = {
  name: "Median",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const medianColor = inputs["Color of the median graph"] as string;
    const columnNames = selectedCellsByColumn.map((column) => column.name);

    //Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 1) {
        alert("Please select at One Cell.");
        return [];
      }
    }

    //For each column, calculate the median and return a result
    const results = selectedCellsByColumn.map<Result>((column) => {
      const medianValue = calculateMedian(column.values);
      const title = `${column.name} | Median`;
      return {
        name : title,
        values: [medianValue],
        graphs : [ ]
      };
    });
    results.push({
      values: [],
      name: `Median Graphs | ${columnNames.join(", ")}`,
      graphs: [{
        chartType: "Vertical Bar",
        data: results.map((currentCol) => ({
          value: currentCol.values[0],
          color: medianColor,
          label: currentCol.name,
        })),
        title: `Median Graphs | ${columnNames.join(", ")}`,
      }]
    });
    return results;
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys: {
    "Color of the median graph": "Color",
  },
};