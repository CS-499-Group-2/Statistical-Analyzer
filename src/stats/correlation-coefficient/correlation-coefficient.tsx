import { ComponentOperation, OperationProps, Result } from "../operation";
import * as ss from "simple-statistics";
import React, { useEffect } from "react";
import { Button, ColorInput, Modal, NativeSelect } from "@mantine/core";

/**
 *
 * @param observed represents values from observed column
 * @param expected represents values from expected column
 * @param lineColor respresents color of line for graph
 * @returns correlation coefficient results
 */
export const calculateCorrelationCoeffcient = (observed: number[], expected: number[], lineColor: string): Result => {
  const correlationCoeffcient = ss.sampleCorrelation(observed, expected);
  const xValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return {
    name: "Correlation Coefficient",
    values: [correlationCoeffcient],
    graphs: [
      {
        chartType: "Normal Distribution",
        title: "Correlation Coefficient",
        data: xValues.map((x, y) => ({ x, y })),
        lineLabel: "Correlation Coeffcient Line",
        lineColor,
      },
    ],
  };
};

const CorrelationComponent = (props: OperationProps) => {
  const { deselect, selected, selectedCellsByColumn: columns, addResult } = props;
  const columnNames = columns.map(column => column.name);
  const [observedColumn, setObservedColumn] = React.useState<string | undefined>(undefined);
  const [lineColor, setLineColor] = React.useState("#000000");

  /**
   * if no observed column, send alert and close
   * else, set necessary values, and call calculateCorrelationCoefficient, addResult, and deselect
   */
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
    // returns correlation coefficient modal with appropriate inputs
    <Modal onClose={deselect} opened={selected} title="Correlation Coeffcient" centered>
      <NativeSelect
        data={columnNames}
        label="Select the column for the x values"
        withAsterisk
        value={observedColumn}
        onChange={event => setObservedColumn(event.currentTarget.value)}
      />
      <ColorInput value={lineColor} label="Select the color for the CDF line" onChange={col => setLineColor(col)} />
      <Button my={3} color="green" onClick={onSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

export const CorrelationCoeffcient: ComponentOperation = {
  name: "Correlation Coeffcient",
  type: "Component",
  description:
    "Calculates the correlation coefficient between two columns, value is between -1 and 1, with -1 being a perfect negative correlation, 0 being no correlation, and 1 being a perfect positive correlation",
  isValid: columns => columns.length === 2,
  component: CorrelationComponent,
};
