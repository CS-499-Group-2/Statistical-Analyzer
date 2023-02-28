import { test, expect, describe } from "vitest";
import { CsvData, csvToArray } from "./import";

describe("CSV to Array Testing", () => {
  test("Test With Basic CSV", () => {
    const csv = "col1,col2,col3\n1,2,3\n4,5,6\n7,8,9";
    const expected: CsvData = {
      headers: ["col1", "col2", "col3"],
      data: [[1,2,3], [4,5,6], [7,8,9]]
    };

    const result = csvToArray(csv);

    expect(result).toEqual(expected);
  });
  
  test("Test With one row csv", () => {
    // Setup our data
    const csv = "col1,col2,col3\n1,2,3";
    const expected: CsvData = {
      headers: ["col1", "col2", "col3"],
      data: [[1,2,3]]
    };
    // Test our function
    const result = csvToArray(csv);

    // Assert our result
    expect(result).toEqual(expected);
  });

  test("Test With one column csv", () => {
    // Setup our data
    const csv = "col1\n1\n2\n3";
    const expected: CsvData = {
      headers: ["col1"],
      data: [[1], [2], [3]]
    };
    // Test our function
    const result = csvToArray(csv);

    // Assert our result
    expect(result).toEqual(expected);
  });

  test("Test With one column and one row csv", () => {
    // Setup our data
    const csv = "col1\n1";
    const expected: CsvData = {
      headers: ["col1"],
      data: [[1]]
    };
    // Test our function
    const result = csvToArray(csv);

    // Assert our result
    expect(result).toEqual(expected);
  });

  test("Test with new line at the end", () => {
    // Setup our data
    const csv = "col1,col2,col3\n1,2,3\n4,5,6\n7,8,9\n";
    const expected: CsvData = {
      headers: ["col1", "col2", "col3"],
      data: [[1,2,3], [4,5,6], [7,8,9]]
    };
    // Test our function
    const result = csvToArray(csv);

    // Assert our result
    expect(result).toEqual(expected);
  });
});
