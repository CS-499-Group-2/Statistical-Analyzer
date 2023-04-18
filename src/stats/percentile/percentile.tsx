import React from "react";
import { ComponentOperation, OperationProps } from "../operation";
import { quantile } from "simple-statistics";
import { Button, ColorInput, Modal, NumberInput, Text } from "@mantine/core";

const PercentileComponent = (props: OperationProps) => {
  const [percentileAmount, setPercentileAmount] = React.useState<number | "">(0);
  const [referenceLineColor, setReferenceLineColor] = React.useState("#000000");
  const [pointColor, setPointColor] = React.useState("#000000");
  const { selectedCellsByColumn, selected, deselect, addResult } = props;

  const onSubmit = () => {
    if (percentileAmount === "") {
      alert("Please enter a percentile amount.");
      return;
    }
    selectedCellsByColumn.forEach(column => {
      const quantileValue = quantile(column.values, percentileAmount);
      const title = `${column.name} | Percentile | ${percentileAmount * 100}%`;
      addResult({
        name: title,
        values: [quantileValue],
        graphs: [
          {
            chartType: "Normal Distribution",
            data: column.values.map((value, index) => ({ x: index + 1, y: value })),
            title: title,
            color: pointColor,
            lineLabel: "Data",
            annotations: {
              // The annotation is the line that shows the percentile
              line1: {
                type: "line",
                yMin: quantileValue,
                yMax: quantileValue,
                // @ts-expect-error Must be some bug because it works fine
                mode: "horizontal",
                borderColor: referenceLineColor,
                label: {
                  display: true,
                  content: `Percentile ${percentileAmount * 100}%`,
                },
              },
            },
          },
        ],
      });
    });
    deselect();
  };

  return (
    <Modal opened={selected} onClose={deselect} centered title="Percentile">
      <NumberInput
        my={5}
        label="Percentile Amount"
        value={percentileAmount}
        onChange={setPercentileAmount}
        min={0}
        max={1}
        step={0.05}
        precision={3}
      />
      <ColorInput my={5} label="Reference Line Color" value={referenceLineColor} onChange={setReferenceLineColor} />
      <ColorInput my={5} label="Point Color" value={pointColor} onChange={setPointColor} />
      <Button my={5} color="green" onClick={onSubmit}>
        Submit
      </Button>
    </Modal>
  );
};

/** Here I define the operation */
export const Percentile: ComponentOperation = {
  name: "Percentile", // The name of the operation
  type: "Component",
  description: (
    <Text>
      The percentile operation calculates the percentile of a set of data. The percentile is the value below which a given percentage of
      observations in a group of observations falls. For example, the 20th percentile is the value (or score) below which 20% of the
      observations may be found. The percentile is a measure of statistical dispersion.
      <br />
      <br />
      The percentile returned is rounded to the nearest value in the data set.
    </Text>
  ),
  isValid: (selectedCellsByColumn): boolean => {
    if (selectedCellsByColumn.length === 0) return false;
    if (selectedCellsByColumn.some(column => column.values.length < 2)) return false;
    return true;
  },
  component: PercentileComponent,
};
