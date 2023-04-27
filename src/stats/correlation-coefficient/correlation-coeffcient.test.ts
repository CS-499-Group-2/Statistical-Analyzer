import { describe, test, expect } from "vitest";
import { Column, Result } from "../operation";
import { CorrelationCoeffcient, calculateCorrelationCoeffcient } from "./correlation-coefficient";

describe("Correlation Coeffcient Test", () => {
  test("should not be valid without two columns", () => {
    const columns: Column[] = [
      {
        name: "Column 1",
        values: [1, 2, 3, 4, 5]
      }
    ];
    expect(CorrelationCoeffcient.isValid(columns)).toBe(false);
  });
  test("should be valid with two columns", () => {
    const columns: Column[] = [
      {
        name: "Column 1",
        values: [1, 2, 3, 4, 5]
      },
      {
        name: "Column 2",
        values: [1, 2, 3, 4, 5]
      }
    ];
    expect(CorrelationCoeffcient.isValid(columns)).toBe(true);
  });
  test("should return percent value", () => {
    const expected: Result = {
      name: "Correlation Coefficient",
      values: [0.9575],
      graphs: [],
    };
    // Columns from https://www.mathsisfun.com/data/correlation.html
    const columns: Column[] = [
      {
        name: "X Column",
        values: [14.2, 16.4, 11.9, 15.2, 18.5, 22.1, 19.4, 25.1, 23.4, 18.1, 22.6, 17.2],
      },
      {
        name: "Y Column",
        values: [215, 325, 185, 332, 406, 522, 412, 614, 544, 421, 445, 408],
      },
    ];
    const actual = calculateCorrelationCoeffcient(columns[0].values, columns[1].values, "blue");
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.001);
  });
});
