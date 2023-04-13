import { Operation , OperationProps} from "../operation";
import { calculateMean } from "../calculations";
import { Graph } from "../../components/graph-display/graphs";
import React from "react";
import { Modal, Button, ColorInput  , Select } from "@mantine/core";

//Defining the inputs
const MeanComponent = (props: OperationProps) => {
  const { selected, selectedCellsByColumn, deselect, addResult } = props;
  // Keep track of the color for each bar
  const [barColors, setBarColors] = React.useState<Map<string, string>>(new Map());
  const columnNames = selectedCellsByColumn.map(column => column.name);
  const [selectedGraph, setSelectedGraph] = React.useState<string | null>(null);

  // Called when the user clicks submit
  const onSubmit = () => {

    // Check the graph that the user selecte
    let graphType;
    switch (selectedGraph) {
    case "Horizontal Bar":
      graphType = "Horizontal Bar";
      break;
    case "Vertical Bar":
      graphType = "Vertical Bar";
      break;
    case "Pie":
      graphType = "Pie";
      break;
      

    }
    // The actual means for each column
    selectedCellsByColumn.forEach(column => {
      const meanValue = calculateMean(column.values);
      const title = `${column.name} | Mean`;
      // Add the result once calculated
      addResult({
        name: title,
        values: [meanValue],
        graphs: [],
      });
    });

    // The graph to display
    const graph: Graph = {
      chartType: graphType,
      // Create a data point for each column
      data: selectedCellsByColumn.map(column => ({
        label: column.name,
        value: calculateMean(column.values),
        // Use the color the user selected, or black if they didn't select one
        color: barColors.get(column.name) || "#000000",
      })),
    };
    addResult({
      name: `Mean Graphs | ${columnNames.join(", ")}`,
      values: [ ],
      graphs: [graph],
    });
    deselect();
  };

  return (
    <Modal opened={selected} onClose={deselect} centered>
      <h1>Mean</h1>
      {columnNames.map(
        (
          columnName // For each column, create a color input
        ) => (
          <ColorInput
            key={columnName}
            label={ " Bar Color for : " + columnName}
            value={barColors.get(columnName)}
            onChange={newColor => {
              // We need to create a new map because we have to use a different object to force a rerender
              const newBarColors = new Map(barColors);
              newBarColors.set(columnName, newColor);
              setBarColors(newBarColors);
            }}
          />
        )
      )}
      <Select
        data={[
          { value: " Horizontal Bar", label: "Horizontal Bar" },
          { value: "Vertical Bar", label: "Vertical Bar" },
          { value: "Pie", label: "Pie" },


        ]}
        label = "Select the graph you want to display"
        placeholder="Select graph"
        value={selectedGraph}
        onChange = {setSelectedGraph}
      />
      <Button onClick={onSubmit}>Submit</Button>


    </Modal>
  );
};

export const Mean: Operation = {
  name: "Mean",
  type: "Component",
  isValid: (columns) => columns.length >= 1,
  component: MeanComponent,
};