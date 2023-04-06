import { Operation } from "../operation";
import * as ss from "simple-statistics";

interface Inputs {
  "Observed Column Header"
}

export const ChiSquare: Operation<Inputs> = {
  name: "Chi Squared",
  isValid: (columns) => columns.length === 2,
  onSelected: (columns, spreadsheet, inputs) => {
    // FORMULA FROM https://www.statisticshowto.com/probability-and-statistics/chi-square/
    const observedColumnHeader = inputs["Observed Column Header"] as string;
    const observedColumn = columns.findIndex(column => column.name === observedColumnHeader);
    if (observedColumn === -1) {
      alert("Observed column header not found");
      return [];
    }
    const expectedColumn = observedColumn === 0 ? 1 : 0;
    const observed = columns[observedColumn].values;
    const expected = columns[expectedColumn].values;
    const valuesInfo = observed.map((value, index) => {
      const observedValue = value;
      const expectedValue = expected[index];
      const residual = observedValue - expectedValue;
      const residualSquared = residual * residual;
      const residualSquaredOverExpected = residualSquared / expectedValue;
      return {
        observed: observedValue,
        expected: expectedValue,
        residual,
        residualSquared,
        residualSquaredOverExpected
      };
    });
    const chiSquared = valuesInfo.reduce((sum, valueInfo) => sum + valueInfo.residualSquaredOverExpected, 0);
    const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return [{
      name: "Chi Squared",
      values: [chiSquared],
      graphs: [{
        chartType: "Normal Distribution",
        title: `Chi Squared Distribution for ${valuesInfo.length - 1} degrees of freedom}`,
        data: xValues.map((x) => ({x, y: cdf(x, valuesInfo.length - 1)})),
      }]
    }];
  },
  keys: {
    "Observed Column Header": "Text"
  }
};

const cdf = (x: number, df: number) => {
  const numerator = Math.pow(x, df / 2 - 1) * Math.exp(-x / 2);
  // @ts-expect-error For some reason, simple-statistics gamma function is not typed, so we have to ignore this error
  const denominator = Math.pow(2, df / 2) * ss.gamma(df / 2);
  return numerator / denominator;
};
