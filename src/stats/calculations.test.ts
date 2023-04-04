import { test, expect, describe } from "vitest";
import { calculateMean, calculateMode, calculateMedian,calculateStandardDeviation} from "./calculations";


describe ("Mean Testing", () => {
  test("Test with basic data", () => {
    const data = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expected = 5.5;
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  });

  test("Test with negative data", () => {
    const data = [ -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
    const expected = -5.5;
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  }
  );

  test ("Test with empty data", () => {
    const data = [1,2,3,4,null, 6,8,null,10];
    const expected = 4.8;
    const result = calculateMean(data);
    expect(result).toEqual(expected);

  });
});


describe ("Mode Testing", () => {

  test("Test with basic data", () => {
    const data = [1,2,3,4,2,6,7,7,8,8,8,9,10,11,1,2,3,4,1,8,7];
    const expected = 8;
    const result = calculateMode(data);
    expect(result).toEqual(expected);
  });

  test("Test with empty data", () => {
    const data = [1,2,3,4,2,6,null,7,8,8,null,9,10,11,1,2,3,4,null,1,null];
    const expected = 1;
    const result = calculateMode(data);
    expect(result).toEqual(expected);

  });
});

describe ("Median Testing", () => {
  test("Test with basic data", () => {
    const data = [1,2,3,4,5,6,7,8,9,10];
    const expected = 5;
    const result = calculateMedian(data);
    expect(result).toEqual(expected);
  });

  test("Test with empty data", () => {
    const data = [null, 2,5,6,7,null,8,9,10];
    const expected = 7;
    const result = calculateMedian(data);
    expect(result).toEqual(expected);
  });
});

describe ("Standard Deviation Testing", () => {
  test("Test with basic data", () => {
    const data = [1,2,3,4,5,6,7,8,9,10];
    const expected = 3.02765;
    const result = calculateStandardDeviation(data);
    expect(result).toEqual(expected);
  });

  test("Test with empty data", () => {
    const data = [null, 2,5,6,7,null,8,9,10];
    const expected = 2.73861;
    const result = calculateStandardDeviation(data);
    expect(result).toEqual(expected);
  });
});