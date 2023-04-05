import { Operation, Result } from "../operation";
import { calculateStandardDeviation } from "../calculations";

//Defining the inputs
interface Inputs {
    "Point Color": "Color"
    "Line Color": "Color"
    "Fill Color": "Color"
} 

export const StandardDeviation: Operation<Inputs> = {
  name: "Standard Deviation",
  isValid: (selectedCellsByColumn) => selectedCellsByColumn.length !== 0,
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const pointColor = inputs["Point Color"] as string;
    const lineColor = inputs["Line Color"] as string;
    const fillColor = inputs["Fill Color"] as string;
    const standardDeviation = calculateStandardDeviation(selectedCellsByColumn[0].values);
    const xValues = selectedCellsByColumn[0].values.sort((a, b) => a - b);
    const yValues = xValues.map(() => standardDeviation);

    return [{
      name: "Standard Deviation",
      values: [standardDeviation],
      graphs: [{
        chartType: "Standard Deviation",
        data: { xValues, yValues} , 
        curved: true,
        color: lineColor,
        fillColor: fillColor,
        pointColor: pointColor,
        filled: true,

      }]
    }];


  },


  keys: {
    "Point Color" : "Color",
    "Line Color" : "Color",
    "Fill Color": "Color",
  }



};
