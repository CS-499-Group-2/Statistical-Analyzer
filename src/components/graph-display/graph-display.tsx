import React, { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { Graph } from "./graphs";
import { ChartProps } from "react-chartjs-2/dist/types";
import "./graph-display.css";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import annotationPlugin from "chartjs-plugin-annotation";
import { Card } from "@mantine/core";
import { useThemeStore } from "../../stores/theme-store";

// This is required to register the chart types with chart js. See https://react-chartjs-2.js.org/faq/registered-element
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  annotationPlugin,
  Filler
);

/**
 * This function will take our internal graph type and convert it into a chart that can be rendered.
 * @param graph The graph to be converted to a chart.
 * @returns Returns a JSX element that will render the graph.
 */
export const mapGraphToChart = (graph: Graph, isDark: boolean): JSX.Element => {
  // Setup the default options for the chart.
  console.log("isDark", isDark);
  const options: ChartProps["options"] = {
    plugins: {
      title: {
        display: !!graph.title,
        text: graph.title,
      },
      annotation: {
        annotations: [],
      },
    },
    responsive: true,
    // setting this to false will allow the chart to be resized.
    maintainAspectRatio: false
  };

  // If the graph is a horizontal bar graph, we need to set the index axis to y (so it's sideways).
  if (graph.chartType === "Horizontal Bar") {
    options.indexAxis = "y";
  }

  // If the graph is a bar chart, then let's setup the data and return a bar component from chart js
  if (graph.chartType === "Vertical Bar" || graph.chartType === "Horizontal Bar") {
    const data: ChartProps<"bar">["data"] = {
      labels: graph.data.map(d => d.label),
      datasets: [
        {
          label: "Value",
          data: graph.data.map(d => d.value),
          backgroundColor: graph.data.map(d => d.color),
        },
      ],
    };
    // @ts-expect-error For some reason, the scale types break this
    return <Bar data={data} options={options} />;
  }

  // If the graph is a pie chart, then let's setup the data and return a pie component from chart js
  if (graph.chartType === "Pie") {
    const data: ChartProps<"pie">["data"] = {
      labels: graph.data.map(d => d.label),
      datasets: [
        {
          data: graph.data.map(d => d.value),
          backgroundColor: graph.data.map(d => d.color),
        },
      ],
    };
    // @ts-expect-error For some reason, the scale types break this
    return <Pie data={data} options={options} />;
  }

  // If the graph is a scatter plot, then let's setup the data and return a scatter component from chart js
  if (graph.chartType === "XY Scatter" || graph.chartType === "Normal Distribution") {
    options.plugins.annotation.annotations = graph.annotations;
    const data: ChartProps<"scatter">["data"] = {
      datasets: [
        {
          data: graph.data,
          // If the graph is a normal distribution, then we want to show the line.
          showLine: graph.chartType === "Normal Distribution",
          tension: graph.curved ? 0.4 : 0,
          pointBackgroundColor: graph.color,
          backgroundColor: graph.fillColor,
          borderColor: graph.lineColor,
          label: graph.lineLabel,
          fill: graph.filled,
        },
      ],
    };
    options.scales = {
      x: {
        title: {
          display: true,
          text: graph.xLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: graph.yLabel,
        },
      },
    };
    // @ts-expect-error For some reason, the scale types break this
    return <Scatter data={data} options={options} />;
  }
};

/** The properties for graph display */
export interface GraphDisplayProps {
  /** An array of the graphs that should be displayed  */
  selectedGraphs: Graph[];
}

/**
 * A component to allow for displaying the selected graphs.
 * @param props The props for the GraphDisplay component.
 * @returns A React component that will produce a separate component for each graph selected.
 */
export const GraphDisplay = (props: GraphDisplayProps) => {
  const containerRef = React.useRef(props.selectedGraphs.map(() => React.createRef<HTMLDivElement>()));
  const isDark = useThemeStore(store => store.isDark);

  return (
    <>
      {props.selectedGraphs.map((graph, index) => {
        return (
          <Draggable key={index} nodeRef={containerRef[index]} handle="canvas">
            <div ref={containerRef[index]} style={{ position: "absolute", top: "10%", left: "25%", backgroundColor: "blue", zIndex: 100 }}>
              <Resizable
                style={{ position: "absolute" }}
                className=".graph-display-container"
                enable={{
                  bottom: false,
                  bottomRight: true,
                  bottomLeft: false,
                  left: false,
                  right: false,
                  top: false,
                  topLeft: false,
                  topRight: false,
                }}
                key={index}
                as={Card}
                // @ts-expect-error This seems to be how you pass additional props to the as
                shadow="md"
                padding="md"
                radius="md"
              >
                {mapGraphToChart(graph, isDark)}
              </Resizable>
            </div>
          </Draggable>
        );
      })}
    </>
  );
};
