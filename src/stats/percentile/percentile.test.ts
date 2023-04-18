import { describe, expect, test } from "vitest";
import { Percentile, calculatePercentile } from "./percentile";

describe("Percentile Testing", () => {
  test("percentile calculated correctly", () => {
    const percentileAmount = 0.5;
    const expectedValue = 10;
    const columns = [
      {
        name: "Column 1",
        values: [15, 2, 10],
      },
    ];

    expect(calculatePercentile(columns[0].values, percentileAmount)).toBe(expectedValue);
  });

  test("percentile should only be activated if there is at least one column selected", () => {
    const columns = [];
    expect(Percentile.isValid(columns)).toBe(false);
  });
});
