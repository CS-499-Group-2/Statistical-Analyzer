/* eslint-disable indent */
import React from "react";
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import { Graph } from "./graphs";
import { ChartProps } from "react-chartjs-2/dist/types";
import "./graph-display.css";
import Draggable from "react-draggable";
import { Card } from "react-bootstrap";
import { Resizable } from "re-resizable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export const mapGraphToChart = (graph: Graph): JSX.Element => {
  const options: ChartProps["options"] =  {
    plugins: {
      title: {
        display: !graph.title ? false : true,
        text: graph.title
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (graph.chartType === "Horizontal Bar") {
    options.indexAxis = "y";
  }

  if (graph.chartType === "Vertical Bar" || graph.chartType === "Horizontal Bar") {
    const data: ChartProps<"bar">["data"] = {
      labels: graph.data.map((d) => d.label),
      datasets: [{
        label: "",
        data: graph.data.map((d) => d.value),
        backgroundColor: graph.data.map((d) => d.color)
      }],
    };
    return <Bar data={data} options={options} />;
  }

  if (graph.chartType === "Pie") {
    const data: ChartProps<"pie">["data"] = {
      labels: graph.data.map((d) => d.label),
      datasets: [{
        data: graph.data.map((d) => d.value),
        backgroundColor: graph.data.map((d) => d.color)
      }]
    };
    return <Pie data={data} options={options} />;
  }
  if (graph.chartType === "XY Scatter" || graph.chartType === "Normal Distribution")  {
    const data: ChartProps<"scatter">["data"] = {
      datasets: [
        {
          data: graph.data,
          showLine: graph.chartType === "Normal Distribution",
        }
      ]
    };
    return <Scatter data={data}  options={options} />;
  }
};

export interface GraphDisplayProps {
  selectedGraphs: Graph[];
}

/**
 * A component to allow for displaying the selected graphs.
 * @param props The props for the GraphDisplay component.
 * @returns A React component that will produce a separate component for each graph selected.
 */
export const GraphDisplay = (props: GraphDisplayProps) => {
  const containerRef = React.useRef(props.selectedGraphs.map(() => React.createRef<HTMLDivElement>()));

  return (
    <>
      {props.selectedGraphs.map((graph, index) => {
        return (
          <Draggable key={index} nodeRef={containerRef[index]} handle="canvas">
            <div ref={containerRef[index]}>
              <Resizable style={{position: "absolute"}} className=".graph-display-container" enable={{
                bottom: false,
                bottomRight: true,
                bottomLeft: false,
                left: false,
                right: false,
                top: false,
                topLeft: false,
                topRight: false
              }} key={index} as={Card}>
                  {mapGraphToChart(graph)}
              </Resizable>
            </div>
          </Draggable>
        );
      })}
    </>
  );
};