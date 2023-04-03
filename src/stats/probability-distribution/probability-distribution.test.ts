import { test, expect } from "vitest";
import { ProbabilityDistribution } from "./probability-distribution";

test("should calculate binomial distribution", () => {
  const mean = 40;
  const standardDeviation = 1.5;
  const expected = 0.9088;
  const actual = ProbabilityDistribution.onSelected([{
    name: "Column 1",
    values: [42]
  }], {headers: [""], data: []}, { Mean: mean, "Standard Deviation": standardDeviation });
  expect(actual[0].values[0]).closeTo(expected, 0.001);
});