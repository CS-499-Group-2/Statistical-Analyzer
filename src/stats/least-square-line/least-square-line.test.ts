import { describe, test, expect } from "vitest";
import { LeastSquareLine, calculateLeastSquareLine } from "./least-square-line";
import { Column } from "../operation";

describe("Least Square Line Tests", () => {
  test("Should calculate least square line", () => {
    const expectedYMax = 13.97;
    const expectedYMin = 3.34;
    const columns: Column[] = [
      {
        name: "X",
        values: [2, 3, 5, 7, 9],
      },
      {
        name: "Y",
        values: [4, 5, 7, 10, 15],
      },
    ];
    const actual = calculateLeastSquareLine(columns[0].values, columns[1].values, "", "", columns[0].name, columns[1].name);
    const graph = actual.graphs[0];
    expect(graph.chartType).toBe("XY Scatter");
    if (graph.chartType !== "XY Scatter") return; // This is to make TypeScript happy
    expect(graph.annotations[0].yMax).toBeCloseTo(expectedYMax, 0.01);
    expect(graph.annotations[0].yMin).toBeCloseTo(expectedYMin, 0.01);
  });
  test("Should not calculate least square line if only one column", () => {
    const columns: Column[] = [
      {
        name: "X",
        values: [2, 3, 5, 7, 9],
      },
    ];
    const result = LeastSquareLine.isValid(columns);
    expect(result).toBe(false);
  });
});