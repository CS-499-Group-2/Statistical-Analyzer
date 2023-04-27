import React from "react";
import { Result, TypedOperation } from "../operation";
import NormalDistribution from "normal-distribution";
import { mean, standardDeviation } from "simple-statistics";
import { Text } from "@mantine/core";

interface Inputs {
  "Point Color";
  "Line Color";
  "Fill Color";
}

export const ProbabilityDistribution: TypedOperation<Inputs> = {
  name: "Probability Distribution",
  type: "Typed",
  description: (
    <Text>
      Calculates the normal distribution of each value in each column with respect to the mean and standard deviation of that column
      <br />
      <br />
      <b>Point Color</b> = The color of the points that represent the data
      <br/>
      <b>Line Color</b> - The color of the line that represents the normal distribution curve
      <br />
      <b>Fill Color</b> - The color of the area under the normal distribution curve
    </Text>
  ),
  isValid: selectedCellsByColumn => selectedCellsByColumn.length !== 0,
  onSelected: (selectedCellsByColumn, spreadsheet, inputs): Result[] => {
    const pointColor = inputs["Point Color"] as string;
    const lineColor = inputs["Line Color"] as string;
    const fillColor = inputs["Fill Color"] as string;
    const results: Result[] = selectedCellsByColumn
      .map<Result | undefined>(column => {
        const title = `${column.name} | Probability Distribution`;
        const meanValue = mean(column.values);
        const standardDeviationValue = standardDeviation(column.values);
        if (standardDeviationValue === 0) {
          alert("Cannot calculate the probability distribution of a column with a standard deviation of 0");
          return undefined;
        }
        const normalDist = new NormalDistribution(meanValue, standardDeviationValue);
        const values = column.values.map(value => normalDist.cdf(value));
        const graphXValues = column.values.sort((a, b) => a - b); // Sort the values in ascending order
        return {
          name: title,
          values: values,
          graphs: [
            {
              chartType: "Normal Distribution",
              title: title,
              data: graphXValues.map(value => ({ x: value, y: normalDist.pdf(value) })),
              lineLabel: "Normal Distribution Curve",
              curved: true,
              color: pointColor,
              lineColor: lineColor,
              fillColor: fillColor,
              filled: true,
            },
          ],
        };
      })
      .filter(result => result !== undefined)
      .map(result => result as Result);
    return results;
  },
  keys: {
    "Point Color": "Color",
    "Line Color": "Color",
    "Fill Color": "Color",
  },
};
