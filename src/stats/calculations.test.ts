import { test, expect, describe } from "vitest";
import { calculateMean } from "./calculations";


describe ("Mean Testing", () => {
  test("Test with basic data", () => {
    const data = [[1,2,3], [4,5,6], [7,8,9]];
    const expected = [4,5,6];
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  });

  test("Test with one row of data", () =>{ 
    const data = [[1,2,3]];
    const expected = [1,2,3];
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  });

  test("Test with one column of data", () => {
    const data = [[1], [2], [3]];
    const expected = [2];
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  });

  test( "Test with null data within some cells of the array", () => {
    const data = [[1,2,3], [4,5,null], [null,8,9]];
    const expected = [2.5,5,6];
    const result = calculateMean(data);
    expect(result).toEqual(expected);
  });
 

    

 




});
