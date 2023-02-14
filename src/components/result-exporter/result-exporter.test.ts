import { formatResults } from "./result-exporter";
import { test, expect } from "vitest";

const addTwoNumbers = (a: number, b: number) => a + b;

test("Make sure adding works", () => {
  expect(addTwoNumbers(1, 2)).toBe(3);
});

test("Formatting results works correctly", () => {
  expect(formatResults([{
    name: "test",
    values: [1, 2, 3]
  }])).toBe("test: 1, 2, 3");
});