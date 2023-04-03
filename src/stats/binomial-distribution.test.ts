import { test, expect, describe } from "vitest";
import { calculateBinomialDistribution } from "./calculations";


test("should calculate binomial distribution", () => {
  const binomialDistribution = calculateBinomialDistribution(5, 0.5);
  expect(binomialDistribution).toEqual([0.03125, 0.15625, 0.3125, 0.3125, 0.15625, 0.03125]);
});



