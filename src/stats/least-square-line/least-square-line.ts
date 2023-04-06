import { Operation, Result } from "../operation";
import { Graph } from "../../components/graph-display/graphs";

interface Inputs {
  "Which Column Should Be Used For X Values?";
  "Value Line Color";
  "Reference Line Color";
}

export const LeastSquareLine: Operation<Inputs> = {
  name: "Least Square Line",
  isValid: (columns) => columns.length === 2, // The user selects one column, and then we get the X column from the inputs
  onSelected: (columns, spreadsheet, inputs): Result[] => {
    // FORMULA FROM: https://www.mathsisfun.com/data/least-squares-regression.html
    const xColumnHeader = inputs["Which Column Should Be Used For X Values?"] as string;
    const xColumn = columns.findIndex(column => column.name === xColumnHeader);
    const yColumn = xColumn === 0 ? 1 : 0;
    if (xColumn === -1) {
      alert("An X column with that name does not exist.");
      return [];
    }
    const xValues = columns[xColumn].values;
    const yValues = columns[yColumn].values;
    const pointInfo = xValues.map((x, index) => ({
      x,
      y: yValues[index],
      xSquared: x * x,
      xTimesY: x * yValues[index]
    }));
    const sums = {
      x: pointInfo.reduce((sum, point) => sum + point.x, 0),
      y: pointInfo.reduce((sum, point) => sum + point.y, 0),
      xSquared: pointInfo.reduce((sum, point) => sum + point.xSquared, 0),
      xTimesY: pointInfo.reduce((sum, point) => sum + point.xTimesY, 0)
    };
    const n = xValues.length;
    const slope = (n * sums.xTimesY - sums.x * sums.y) / (n * sums.xSquared - sums.x * sums.x);
    const yIntercept = (sums.y - slope * sums.x) / n;
    const graph: Graph = {
      chartType: "Normal Distribution",
      title: "Least Square Line",
      data: pointInfo.sort((a, b) => a.x - b.x).map(point => ({ x: point.x, y: point.y })),
      lineLabel: "Values",
      lineColor: inputs["Value Line Color"] as string,
      annotations: [{
        type: "line",
        xMin: Math.min(...xValues),
        xMax: Math.max(...xValues),
        yMin: slope * Math.min(...xValues) + yIntercept,
        yMax: slope * Math.max(...xValues) + yIntercept,
        borderColor: inputs["Reference Line Color"] as string,
        borderWidth: 2,
        z: 100,
      }],
      xLabel: xColumnHeader,
      yLabel: columns[yColumn].name
    };
    return [{
      name: `Least Square Line for ${columns[yColumn].name} vs ${xColumnHeader}`,
      values: [slope, yIntercept],
      graphs: [graph]
    }];
  },
  keys: {
    "Which Column Should Be Used For X Values?": "Text",
    "Reference Line Color": "Color",
    "Value Line Color": "Color"
  }
};