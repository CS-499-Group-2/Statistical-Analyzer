import { ComponentOperation, OperationProps, Result } from "../operation";
import * as ss from "simple-statistics";
import React, { useEffect } from "react";
import { Button, ColorInput, Modal, NativeSelect } from "@mantine/core";

export const calculateChiSquared = (observed: number[], expected: number[], lineColor: string): Result => {
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
  return {
    name: "Chi Squared",
    values: [chiSquared],
    graphs: [{
      chartType: "Normal Distribution",
      title: `Chi Squared Distribution for ${valuesInfo.length - 1} degrees of freedom}`,
      data: xValues.map((x) => ({x, y: cdf(x, valuesInfo.length - 1)})),
      lineLabel: "CDF",
      lineColor
    }]
  };
};

const ChiSquareComponent = (props: OperationProps) => {
  const { deselect, selected, selectedCellsByColumn: columns, addResult } = props;
  const columnNames = columns.map(column => column.name);
  const [observedColumn, setObservedColumn] = React.useState<string | undefined>(undefined);
  const [lineColor, setLineColor] = React.useState("#000000");
  
  const onSubmit = () => {
    if (observedColumn === null) {
      alert("Please select a column");
      return;
    }
    const observedColumnIndex = columnNames.findIndex(columnName => columnName === observedColumn);
    const expectedColumn = observedColumnIndex === 0 ? 1 : 0;
    const observed = columns[observedColumnIndex].values;
    const expected = columns[expectedColumn].values;
    const result = calculateChiSquared(observed, expected, lineColor);
    addResult(result);
    deselect();
  };

  useEffect(() => {
    if (selected) {
      setObservedColumn(columnNames[0]);
    }
  }, [selected]);

  return (
    <Modal onClose={deselect} opened={selected} title="Chi Squared" centered>
      <NativeSelect
        data={columnNames}
        label="Select the column for the observed values"
        withAsterisk
        value={observedColumn}
        onChange={(event) => setObservedColumn(event.currentTarget.value)}
      />
      <ColorInput value={lineColor} label="Select the color for the CDF line" onChange={(col) => setLineColor(col)} />
      <Button my={3} color="green" onClick={onSubmit}>Submit</Button>
    </Modal>
  );
};

export const ChiSquare: ComponentOperation = {
  name: "Chi Squared",
  type: "Component",
  isValid: (columns) => columns.length === 2,
  component: ChiSquareComponent
};

const cdf = (x: number, df: number) => {
  const numerator = Math.pow(x, df / 2 - 1) * Math.exp(-x / 2);
  // @ts-expect-error For some reason, simple-statistics gamma function is not typed, so we have to ignore this error
  const denominator = Math.pow(2, df / 2) * ss.gamma(df / 2);
  return numerator / denominator;
};
