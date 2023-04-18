import { ComponentOperation, OperationProps, Result } from "../operation";
import * as ss from "simple-statistics";
import React, { useEffect } from "react";
import { Button, ColorInput, Modal, NativeSelect } from "@mantine/core";

export const calculateCorrelationCoeffcient = (observed: number[], expected: number[], lineColor: string): Result => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const valuesInfo = observed.map((value, index) => {
    const observedValue = value;
    const expectedValue = expected[index];

    return {
      observed: observedValue,
      expected: expectedValue,
    
    };
  });
  const correlationCoeffcient = ss.sampleCorrelation(observed, expected);
  console.log(correlationCoeffcient);
  const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return {
    name: "Correlation Coeffcient",
    values: [correlationCoeffcient],
    graphs: [{
      chartType: "Normal Distribution",
      title: "Correlation Coefficient",
      data: xValues.map((x,y) => ({x, y})),
      lineLabel: "Correlation Coeffcient Line",
      lineColor
    }]
  };
};

const CorrelationComponent = (props: OperationProps) => {
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
    const result = calculateCorrelationCoeffcient(observed, expected, lineColor);
    addResult(result);
    deselect();
  };

  useEffect(() => {
    if (selected) {
      setObservedColumn(columnNames[0]);
    }
  }, [selected]);

  return (
    <Modal onClose={deselect} opened={selected} title="Correlation Coeffcient" centered>
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

export const CorrelationCoeffcient: ComponentOperation = {
  name: "Correlation Coeffcient",
  type: "Component",
  description: 
    "Calculates the correlation coefficient between two columns, value is between -1 and 1, with -1 being a perfect negative correlation, 0 being no correlation, and 1 being a perfect positive correlation",
  isValid: (columns) => columns.length === 2,
  component: CorrelationComponent
};


