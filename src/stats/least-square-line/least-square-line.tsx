import React from "react";
import { ComponentOperation, OperationProps, Result } from "../operation";
import { Graph } from "../../components/graph-display/graphs";
import { useState } from "react";
import { Button, ColorInput, Modal, NativeSelect, Text } from "@mantine/core";

export const calculateLeastSquareLine = (
  xValues: number[],
  yValues: number[],
  valueLineColor: string,
  referenceLineColor: string,
  xColumnHeader: string,
  yColumnHeader: string
): Result => {
  // FORMULA FROM: https://www.mathsisfun.com/data/least-squares-regression.html
  const pointInfo = xValues.map((x, index) => ({
    x,
    y: yValues[index],
    xSquared: x * x,
    xTimesY: x * yValues[index],
  }));
  const sums = {
    x: pointInfo.reduce((sum, point) => sum + point.x, 0),
    y: pointInfo.reduce((sum, point) => sum + point.y, 0),
    xSquared: pointInfo.reduce((sum, point) => sum + point.xSquared, 0),
    xTimesY: pointInfo.reduce((sum, point) => sum + point.xTimesY, 0),
  };
  const n = xValues.length;
  const slope = (n * sums.xTimesY - sums.x * sums.y) / (n * sums.xSquared - sums.x * sums.x);
  const yIntercept = (sums.y - slope * sums.x) / n;
  const graph: Graph = {
    chartType: "XY Scatter",
    title: "Least Square Line",
    data: pointInfo.sort((a, b) => a.x - b.x).map(point => ({ x: point.x, y: point.y })),
    lineLabel: "Values",
    lineColor: valueLineColor,
    annotations: [
      {
        type: "line",
        xMin: Math.min(...xValues),
        xMax: Math.max(...xValues),
        yMin: slope * Math.min(...xValues) + yIntercept,
        yMax: slope * Math.max(...xValues) + yIntercept,
        borderColor: referenceLineColor,
        borderWidth: 2,
        z: 100,
      },
    ],
    xLabel: xColumnHeader,
    yLabel: yColumnHeader,
  };
  return {
    name: `Least Square Line for ${yColumnHeader} vs ${xColumnHeader}`,
    values: [slope, yIntercept],
    graphs: [graph],
  };
};

const LeastSquareLineComponent = (props: OperationProps) => {
  const [xColumnHeader, setXColumnHeader] = useState("");
  const [valueLineColor, setValueLineColor] = useState("#000000");
  const [referenceLineColor, setReferenceLineColor] = useState("#000000");
  const { selected, selectedCellsByColumn, addResult, deselect } = props;
  const columnNames = selectedCellsByColumn.map(column => column.name);

  const onSubmit = () => {
    if (xColumnHeader === "") {
      alert("Please select a column");
      return;
    }
    const xColumnIndex = columnNames.findIndex(columnName => columnName === xColumnHeader);
    const yColumnIndex = xColumnIndex === 0 ? 1 : 0;
    const xValues = selectedCellsByColumn[xColumnIndex].values;
    const yValues = selectedCellsByColumn[yColumnIndex].values;
    const result = calculateLeastSquareLine(xValues, yValues, valueLineColor, referenceLineColor, xColumnHeader, columnNames[yColumnIndex]);
    addResult(result);
    deselect();
  };

  return (
    <Modal onClose={deselect} opened={selected} title="Least Square Line" centered>
      <NativeSelect
        data={columnNames}
        label="Select the column for the x values"
        withAsterisk
        value={xColumnHeader}
        onChange={event => setXColumnHeader(event.currentTarget.value)}
        my={5}
      />
      <ColorInput my={5} value={valueLineColor} label="Select the color for the value line" onChange={col => setValueLineColor(col)} />
      <ColorInput
        my={5}
        value={referenceLineColor}
        label="Select the color for the reference line"
        onChange={col => setReferenceLineColor(col)}
      />
      <Button my={5} color="green" onClick={onSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export const LeastSquareLine: ComponentOperation = {
  name: "Least Square Line",
  description: (
    <Text>
      Calculates the least square line of the two columns
      <br />
      Formula from: <a href="https://www.mathsisfun.com/data/least-squares-regression.html">Here</a>
      <br />
      Returns the slope and y-intercept as values
    </Text>
  ),
  type: "Component",
  isValid: columns => columns.length === 2, // The user selects one column, and then we get the X column from the inputs
  component: LeastSquareLineComponent,
};
