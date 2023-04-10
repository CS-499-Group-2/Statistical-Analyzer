import { Operation , Result} from "../operation";
import { calculateMean } from "../calculations";
import { Graph } from "../../components/graph-display/graphs";

//Defining the inputs
interface Inputs {
  "Color of graph": undefined;
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
    const columnNames = selectedCellsByColumn.map((column) => column.name);

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
    const charts: Graph[] = [];
    if (isHorizontalBar) {
      charts.push(getChart("Horizontal Bar", meanColor, results));
    }
    if (isVerticalBar) {
      charts.push(getChart("Vertical Bar", meanColor, results));
    }
    if (isPie) {
      charts.push(getChart("Pie", meanColor, results));
    }
    results.push({
      name: `Mean Graphs | ${columnNames.join(", ")}`,
      values: [],
      graphs: charts,
    });
    return results;
  },
  isValid: (selectedCellsByColumn): boolean => {
    return selectedCellsByColumn.length !== 0;
  }, 
  keys : { 
    "Color of graph" : "Color", 
    "Horizontal Bar" : "Checkbox",
    "Vertical Bar" : "Checkbox",
    "Pie" : "Checkbox",
  },
};

/**
 * Creates a graph object given the chart type, color, and results
 * @param chartType The type of chart to create
 * @param color The color of the chart
 * @param results The results to create the chart from
 * @returns A graph object
 */
const getChart = (chartType: "Pie" | "Horizontal Bar" | "Vertical Bar", color: string, results: Result[]): Graph => {
  return {
    chartType: chartType,
    data: results.map((currentCol) => ({
      value: currentCol.values[0],
      color,
      label: currentCol.name.split("|")[0].trim(),
    })),
    title: `Mean Graphs | ${results.map((currentCol) => currentCol.name.split("|")[0].trim()).join(", ")}`,
  };
};