import { Operation , Result} from "../operation";
import { calculateMean } from "../calculations";

//Defining the inputs
interface Inputs {
    "Color of the mean line": undefined;
    "Horizontal Bar" : false | undefined;
    "Vertical Bar" : false | undefined;
    "Pie" : false | undefined;
} 


export const Mean: Operation<Inputs> = {
  name: "Mean",
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const meanColor = inputs["Color of graph"] as string;
    const isHorizontalBar = inputs["Horizontal Bar"] as boolean;
    const isVerticalBar = inputs["Vertical Bar"] as boolean;
    const isPie = inputs["Pie"] as boolean;
    const chartType = isPie ? "Pie" : isHorizontalBar ? "Horizontal Bar" : isVerticalBar ? "Vertical Bar" : undefined;
    

    //Validation
    for (const column of selectedCellsByColumn) {
      if (column.values.length < 1) {
        alert("Please select at One Cell.");
        return [];
      }
    }
        
    //For each column, calculate the mean and return a result
    const results =  selectedCellsByColumn.map<Result>((column) => {
      const meanValue = calculateMean(column.values);
      const title = `${column.name} | Mean`;
      return {
        name : title,
        values: [meanValue],
        graphs : [ ], 
      };
    });
    results.push({
      values: [],
      name: "",
      graphs: [{
        chartType: chartType,
        data: results.map((currentCol) => ({
          value: currentCol.values[0],
          color: meanColor,
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
    "Horizontal Bar" : "Checkbox",
    "Vertical Bar" : "Checkbox",
    "Pie" : "Checkbox",
  },
};
