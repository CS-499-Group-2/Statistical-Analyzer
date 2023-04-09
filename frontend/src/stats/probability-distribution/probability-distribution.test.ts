import { test, expect, describe } from "vitest";
import { ProbabilityDistribution } from "./probability-distribution";

describe("Probability Distribution Tests", () => {
  test("should calculate binomial distribution", () => {
    const expected = [0.8686, 0.095, 0.5753];
    const actual = ProbabilityDistribution.onSelected([{
      name: "Column 1",
      values: [15, 2, 10]
    }], {headers: [""], data: []}, { "Fill Color": "red", "Line Color": "blue" });
    expect(actual[0].values[0]).closeTo(expected[0], 0.001);
    expect(actual[0].values[1]).closeTo(expected[1], 0.001);
    expect(actual[0].values[2]).closeTo(expected[2], 0.001);
  });

  test("Should only be valid if there is at least one column selected", () => {
    expect(ProbabilityDistribution.isValid([])).toBe(false);
    expect(ProbabilityDistribution.isValid([{
      name: "Column 1",
      values: [15, 2, 10]
    }])).toBe(true);
  });
});
