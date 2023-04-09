import { describe, expect, test } from "vitest";
import { Percentile } from "./percentile";

describe("Percentile Testing", () => {
  test("percentile calculated correctly", () => {
    const percentileAmount = 0.5;
    const expectedValue = 10;
    const columns = [{
      name: "Column 1",
      values: [15, 2, 10]
    }];
    const spreadsheet = {data: []}; // Spreadsheet is not used for the percentile operation, so we can just pass in an empty object
    const inputs = { "Percentile Amount": percentileAmount, "Point Color": "red", "Reference Line Color": "blue" };

    expect(Percentile.onSelected(columns, spreadsheet, inputs)[0].values[0]) // Check that the first result's first value is the expected value
      .toBe(expectedValue);
  });

  test("percentile calculated correctly with multiple columns", () => {
    const percentileAmount = 0.5;
    const expectedValue = 10;
    const columns = [{
      name: "Column 1",
      values: [15, 2, 10]
    }, {
      name: "Column 2",
      values: [15, 2, 10]
    }];
    const spreadsheet = {data: []}; // Spreadsheet is not used for the percentile operation, so we can just pass in an empty object
    const inputs = { "Percentile Amount": percentileAmount, "Point Color": "red", "Reference Line Color": "blue" };

    expect(Percentile.onSelected(columns, spreadsheet, inputs).map(result => result.values[0])) // Get the first value of each result
      .toEqual([expectedValue, expectedValue]);
  });

  test("percentile should only be activated if there is at least one column selected", () => {
    const columns = [];
    expect(Percentile.isValid(columns)).toBe(false);
  });
});
