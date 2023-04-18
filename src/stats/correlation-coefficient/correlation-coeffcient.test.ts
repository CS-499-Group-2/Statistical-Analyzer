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
      name: "Correlation Coeffcient",
      values: [5.094],
      graphs: []
    };
    const columns: Column[] = [{
      name: "Observed",
      values: [29, 24, 22, 19, 21, 18, 19, 20, 23, 18, 20, 23]
    }, {
      name: "Expected",
      values: new Array<number>(12).fill(21.333, 0, 12)
    }];
    const actual = calculateCorrelationCoeffcient(columns[0].values, columns[1].values, "blue");
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.001);
  });
});