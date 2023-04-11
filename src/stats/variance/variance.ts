import { Operation, Result}  from "../operation";
import { variance } from "simple-statistics";

//Defining the inputs that the operation will take
interface Inputs {
    "Color of the Variance Graph": undefined;
}

//Defining the operation
export const Variance: Operation<Inputs> = {
  name: "Variance",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const graphColor = inputs["Color of the Variance Graph"] as string;
    return selectedCellsByColumn.map((column) => {
      const varianceValue = variance(column.values);
      const title = `${column.name} | Variance`;
      return {
        name: title,
        values: [varianceValue],
        graphs: [{
          chartType: "Normal Distribution",
          data: column.values.map((value, index) => ({x: index + 1, y: value})),
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
  keys: {
    "Color of the Variance Graph" : "Color", 
  },
};

