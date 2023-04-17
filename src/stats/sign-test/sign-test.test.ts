import { describe, test, expect } from "vitest";
import { Column, Result } from "../operation";
import { SignTest, calculateSignTest } from "./sign-test";

describe("Sign Test Tests", () => {
  test("should not be valid with more than one column", () => {
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
    expect(SignTest.isValid(columns)).toBe(false);
  });

  test("should be valid with one column", () => {
    const columns: Column[] = [
      {
        name: "Column 1",
        values: [1, 2, 3, 4, 5]
      }
    ];
    expect(SignTest.isValid(columns)).toBe(true);
  });

  test("should return sign test value for Not Equal 130 with <= 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [132, 60, 135, 158, 108, 48, 108, 114, 67, 
        126, 70, 173, 89, 76, 69, 128, 136, 169, 82, 164]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.263],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Not Equal", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Less Than 130 with <= 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [132, 60, 135, 158, 108, 48, 108, 114, 67, 
        126, 70, 173, 89, 76, 69, 128, 136, 169, 82, 164]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.132],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Less Than", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Greater Than 130 with <= 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [132, 60, 135, 158, 108, 48, 108, 114, 67, 
        126, 70, 173, 89, 76, 69, 128, 136, 169, 82, 164]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.942],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Greater Than", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Not Equal 130 with > 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [44, 124, 138, 28, 182, 30, 130, 131, 20, 8,
        43, 92, 159, 121, 27, 104, 10, 179, 132, 19, 
        151, 80, 42, 78, 158, 139, 116, 153, 6, 98, 
        176, 32, 199, 40, 131, 0, 140, 191, 178, 127, 
        44, 58, 140, 141, 52, 8, 80, 172, 78, 146]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.253],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Not Equal", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Less Than 130 with > 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [44, 124, 138, 28, 182, 30, 130, 131, 20, 8,
        43, 92, 159, 121, 27, 104, 10, 179, 132, 19, 
        151, 80, 42, 78, 158, 139, 116, 153, 6, 98, 
        176, 32, 199, 40, 131, 0, 140, 191, 178, 127, 
        44, 58, 140, 141, 52, 8, 80, 172, 78, 146]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.126],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Less Than", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Greater Than 130 with > 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [44, 124, 138, 28, 182, 30, 130, 131, 20, 8,
        43, 92, 159, 121, 27, 104, 10, 179, 132, 19, 
        151, 80, 42, 78, 158, 139, 116, 153, 6, 98, 
        176, 32, 199, 40, 131, 0, 140, 191, 178, 127, 
        44, 58, 140, 141, 52, 8, 80, 172, 78, 146]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.924],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 130, "Greater Than", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Not Equal 100 with <= 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [132, 60, 135, 158, 108, 48, 108, 114, 67, 
        126, 70, 173, 89, 76, 69, 128, 136, 169, 82, 164]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.503],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 100, "Not Equal", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

  test("should return sign test value for Not Equal 100 with > 25 values", () => {
    const columns: Column[] = [{
      name: "Column_1",
      values: [44, 124, 138, 28, 182, 30, 130, 131, 20, 8,
        43, 92, 159, 121, 27, 104, 10, 179, 132, 19, 
        151, 80, 42, 78, 158, 139, 116, 153, 6, 98, 
        176, 32, 199, 40, 131, 0, 140, 191, 178, 127, 
        44, 58, 140, 141, 52, 8, 80, 172, 78, 146]
    }];
    const expected: Result = {
      name: "Sign Test " + columns[0].name + " (p value)",
      values: [0.888],
      graphs: []
    };
    const actual = calculateSignTest(columns[0].values, 100, "Not Equal", columns[0].name);
    expect(actual.name).toBe(expected.name);
    expect(actual.values[0]).toBeCloseTo(expected.values[0], 0.002);
  });

});