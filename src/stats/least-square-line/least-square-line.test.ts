import { describe, test, expect } from "vitest";
import { LeastSquareLine } from "./least-square-line";
import { Column } from "../operation";

describe("Least Square Line Tests", () => {
  test("Should calculate least square line", () => {
    const expectedYMax = 13.97;
    const expectedYMin = 3.34;
    const columns: Column[] = [{
      name: "X",
      values: [2, 3, 5, 7, 9]
    }, {
      name: "Y",
      values: [4, 5, 7, 10, 15]
    }];
    const actual = LeastSquareLine.onSelected(columns, {headers: [""], data: []}, { "Which Column Should Be Used For X Values?": "X",
      "Value Line Color": "", "Reference Line Color": "" });
    const graph = actual[0].graphs[0];
    expect(graph.chartType).toBe("Normal Distribution");
    if (graph.chartType !== "Normal Distribution") return; // This is to make TypeScript happy
    expect(graph.annotations[0].yMax).toBeCloseTo(expectedYMax, 0.01);
    expect(graph.annotations[0].yMin).toBeCloseTo(expectedYMin, 0.01);
  });
  test("Should not calculate least square line if only one column", () => {
    const columns: Column[] = [{
      name: "X",
      values: [2, 3, 5, 7, 9]
    }];
    const result = LeastSquareLine.isValid(columns);
    expect(result).toBe(false);
  });
});