import { ComponentOperation, OperationProps, Result } from "../operation";
import * as ss from "simple-statistics";
import React, { useEffect } from "react";
import { Button, NumberInput, Modal, NativeSelect } from "@mantine/core";
import { calculateBinomialDistribution } from "../calculations";

/**
 * Calculates Sign Test
 * @param data represents the selected column data
 * @param testMedian represents the selected median to test the data against
 * @param medOption represents the selected option for the alternative hypothesis (Not Equal, Less Than, or Greater Than)
 * @param columnName represents the name of the column for results printing purposes
 * @returns results in the form of Result, with name, values, and graph elements
 */
export const calculateSignTest = (data: number[], testMedian: number | "", medOption: string, columnName: string | undefined): Result => { 
  if (testMedian != "") { // Makes sure input has been given for test median
    const less = data.filter(i => (i < testMedian && i != null));
    const greater = data.filter(i => (i > testMedian && i != null));
    const total = less.concat(greater);
    const splus = less.length;
    const sminus = greater.length;
    const n = total.length;
    console.log("Sign Test n: ", n);
    console.log("Sign Test splus: ", splus);
    console.log("Sign Test sminus: ", sminus);
    let p: number;
    if (n <= 25) { // for data lengths <= 25, uses binomial distribution
      const binom = calculateBinomialDistribution(n, 0.5);
      if (medOption == "Not Equal") {
        console.log("Not Equal");
        if (ss.min([splus, sminus]) == sminus) {
          p = ss.sum(binom.slice(splus, n-1))*2;
        }
        else {
          p = ss.sum(binom.slice(sminus, n-1))*2;
        }
      }
      else if (medOption == "Less Than") {
        console.log("Less Than");
        p = 1 - ss.sum(binom.slice(0, splus));
      }
      else {
        console.log("Greater Than");
        p = 1 - ss.sum(binom.slice(0, sminus));
      }
    }
    else { // for data lengths > 25, uses normal distribution
      let z: number;
      const mean = 0.5*n;
      const sd = Math.sqrt(0.25*n);
      if (medOption == "Not Equal") {
        console.log("Not Equal");
        if (sminus < n/2) {
          z = ss.zScore(sminus+0.5, mean, sd);
        }
        else if (sminus > n/2) {
          z = ss.zScore(splus+0.5, mean, sd);
        }
        else {
          z = ss.zScore(sminus, mean, sd);
        }
        p = ss.cumulativeStdNormalProbability(z)*2;        
      }
      else if (medOption == "Less Than") {
        console.log("Less Than");
        z = ss.zScore(sminus+0.5, mean, sd);
        p = ss.cumulativeStdNormalProbability(z);        
      }
      else {
        console.log("Greater Than");
        z = ss.zScore(splus+0.5, mean, sd);
        p = ss.cumulativeStdNormalProbability(z);
      }
      console.log("Sign Test z score: ", z);
    }
    console.log("Sign Test p value: ", p);
    return {
      name: "Sign Test " + columnName + " (p value)",
      values: [p],
      graphs: []
    };
  }
  return {
    name: "Sign Test",
    values: [],
    graphs: []
  };
};

/**
 * Sets required data and returns modal
 * @param props operation properties
 * @returns Sign Test Modal
 */
const SignTestComponent = (props: OperationProps) => {
  const { deselect, selected, selectedCellsByColumn: columns, addResult } = props;
  const columnNames = columns.map(column => column.name);
  const [column, setColumn] = React.useState<string | undefined>(undefined);
  const [testMedian, setTestMedian] = React.useState<number | "">("");
  const [medOption, setMedOption] = React.useState<string>("Not Equal");

  const onSubmit = () => {
    if (testMedian == "") {
      alert("Please select a test median");
      return;
    }
    const colIdx = columnNames.findIndex(columnName => columnName === column);
    const col = columns[colIdx].values;
    const colName = columns[colIdx].name;
    const result = calculateSignTest(col, testMedian, medOption, colName);
    addResult(result);
    deselect();
  };

  useEffect(() => {
    if (selected) {
      setColumn(columnNames[0]);
    }
  }, [selected]);

  return (
    <Modal onClose={deselect} opened = {selected} title="Sign Test" centered>
      <NumberInput 
        my={3}
        withAsterisk label="Test Median" 
        value={testMedian}
        onChange={setTestMedian}>
      </NumberInput>
      <NativeSelect
        my={8}
        data = {["Not Equal","Less Than","Greater Than"]}
        value = {medOption}
        onChange={(event) => setMedOption(event.currentTarget.value)}
      />
      <Button my={3} color="green" onClick={onSubmit}>Submit</Button>
    </Modal>
  );

};

export const SignTest: ComponentOperation = {
  name: "Sign Test",
  type: "Component",
  description:
    "A one sample sign test is used when data is not normally distributed. Select data from one column,  and then select a test median and a comparison option. The sign test then compares every value in the data set to the test median and assigns it a + or - based on whether it's less than or greater than the test median. A p value is then generated using your selected comparator and the number of pluses vs minuses. The p value can help you determine whether to accept or reject the null hypothesis, which is the assumption that the test median is equal to the actual median. Typically, if a p value is below 0.05, you can reject the null hypothesis and conclude that your assertion is more likely to be correct.",
  isValid: columns => columns.length === 1,
  component: SignTestComponent,
};