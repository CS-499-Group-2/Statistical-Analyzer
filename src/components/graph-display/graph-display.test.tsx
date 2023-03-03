import { Bar, Pie, Scatter } from "react-chartjs-2";
import { describe, expect, it } from "vitest";
import { mapGraphToChart } from "./graph-display";
import { Graph } from "./graphs";

describe("Graph Display Tests", () => {
  it("Should return a horizontal bar graph", () => {
    // Arrange
    const graph: Graph = {
      chartType: "Horizontal Bar",
      data: [
        {
          label: "A",
          value: 1,
        }
      ],
      title: "Test Graph",
    };

    // Act
    const chart = mapGraphToChart(graph);

    // Assert
    expect(chart.type).toBe(Bar);
    expect(chart.props.options.indexAxis).toBe("y");
  });
  it("Should return a vertical bar graph", () => {
    // Arrange
    const graph: Graph = {
      chartType: "Vertical Bar",
      data: [
        {
          label: "A",
          value: 1,
        }
      ],
      title: "Test Graph",
    };

    // Act
    const chart = mapGraphToChart(graph);

    // Assert
    expect(chart.type).toBe(Bar);
    expect(chart.props.options.indexAxis).not.toBe("y");
  });
  it("Should return a pie graph", () => {
    // Arrange
    const graph: Graph = {
      chartType: "Pie",
      data: [
        {
          label: "A",
          value: 1,
        }
      ],
      title: "Test Graph",
    };

    // Act
    const chart = mapGraphToChart(graph);

    // Assert
    expect(chart.type).toBe(Pie);
  });
  it("Should return a scatter graph", () => {
    // Arrange
    const graph: Graph = {
      chartType: "XY Scatter",
      data: [
        {
          x: 1,
          y: 1,
        }
      ],
      title: "Test Graph",
    };

    // Act
    const chart = mapGraphToChart(graph);

    // Assert
    expect(chart.type).toBe(Scatter);
  });
  it("Should return a normal distribution graph", () => {
    // Arrange
    const graph: Graph = {
      chartType: "Normal Distribution",
      data: [
        {
          x: 1,
          y: 1,
        }
      ],
      title: "Test Graph",
    };

    // Act
    const chart = mapGraphToChart(graph);

    // Assert
    expect(chart.type).toBe(Scatter);
    expect(chart.props.data.datasets[0].showLine).toBe(true);
  });
});