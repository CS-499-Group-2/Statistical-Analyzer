import { Operation , Result} from "../operation";
import { calculateMode } from "../calculations";


//Defining the inputs
interface Inputs {
    "Color of the mean line": undefined;
}

export const Mode: Operation<Inputs> = {
  name: "Mode",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const modeColor = inputs["Color of Bar"] as string;

    //Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 1) {
        alert("Please select at One Cell.");
        return [];
      }
    }

    //For each column, calculate the mean and return a result
    const results = selectedCellsByColumn.map<Result>((column) => {
      const modeValue = calculateMode(column.values);
      const title = `${column.name} | Mode`;
      return {
        name : title,
        values: [modeValue],
        graphs : [ ]
      };
    });
    results.push({
      values: [],
      name: "",
      graphs: [{
        chartType: "Vertical Bar",
        data: results.map((currentCol) => ({
          value: currentCol.values[0],
          color: modeColor,
          label: currentCol.name,
        }))
      }]
    });
    return results;
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys : {
    "Color of the mean line" : "Color",
  },
};