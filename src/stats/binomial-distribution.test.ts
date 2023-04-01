import { test, expect, describe } from "vitest";
import { calculateBinomialDistribution } from "./calculations";


test("should calculate binomial distribution", () => {
  const binomialDistribution = calculateBinomialDistribution(5, 0.5);
  expect(binomialDistribution).toEqual({
  
    0: 0.03125,
    1: 0.15625,
    2: 0.3125,
    3: 0.3125,
    4: 0.15625,
    5: 0.03125,


  });
});



