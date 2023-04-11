import { AnnotationOptions } from "chartjs-plugin-annotation/types/options";

/**
 * This is a union type. Union types require the type keyword, and allow you to specify one type
 * that can be one of many different types. In this case, we have a graph that can be one of five
 * different ones. The pipe symbol | is used to separate the different types. (sorta like an or)
 */
export type Graph = {
  /**
   * The title of the graph
   */
  title?: string
} & ({
  /**
   * The type of graph.
   */
  chartType: "Horizontal Bar" | "Vertical Bar" | "Pie",
  /**
   * The data to be displayed on the graph.
   */
  data: {
    /** The name for the value */
    label: string,
    /** The actual value */
    value: number,
    /** The color for the values */
    color?: string
  }[]
} | {
  /**
   * The type of xy graph
   */
  chartType: "XY Scatter" | "Normal Distribution" | "Standard Deviation",
  /**
   * The data to be displayed on the graph, in the form of an array of x and y values.
   */
  data: {
    x: number,
    y: number
  }[],
  xLabel?: string,
  yLabel?: string,
  color?: string,
  lineLabel?: string,
  lineColor?: string,
  filled?: boolean,
  curved?: boolean,
  annotations?: AnnotationOptions[] | Record<string, AnnotationOptions>
});
