import { Operation , Result} from "../operation";
import { calculateMode } from "../calculations";


//Defining the inputs
interface Inputs {
    "Color of the mean line": undefined;
}

export const Mode: Operation<Inputs> = {
  name: "Mean",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const meanColor = inputs["Color of the mean line"] as string;

    //Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 1) {
        alert("Please select at One Cell.");
        return [];
      }
    }

    //For each column, calculate the mean and return a result
    return selectedCellsByColumn.map((column) => {
      const modeValue = calculateMode(column.values);
      const title = `${column.name} | Mean`;
      return {
        name : title,
        values: [modeValue],
        graphs: [{
          chartType: "Horizontal Bar",
          data: [{
            value : modeValue,
            color : meanColor,
            label : "Mean",

          }],
        }],
      };
    });
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  },
  keys : {
    "Color of the mean line" : "Color",
  },
};