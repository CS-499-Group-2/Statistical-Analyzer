import * as ss from "simple-statistics";

/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
export function calculateMean(data: number[]): number {
  // if the data has null values, remove them
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) {
      data.splice(i, 1);
    }
  }
  const mean = ss.mean(data);
  return mean;
} 
/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
export function calculateMedian(data: number[]): number {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) {
      data.splice(i, 1);
    }
  }
  const median = ss.median(data);
  return median;
}
/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
export function calculateMode(data: number[]): number {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) {
      data.splice(i, 1);
    }
  }
  const mode = ss.mode(data);
  return mode;
}

/**
 * calculates binomial distribution using simple statistics
 * @param numberofTrials
 * @param probability 
 * @returns binomial distribution calculation
 */
export function calculateBinomialDistribution( numberofTrials: number, probability: number): number [] {
  const binomialDistribution = ss.binomialDistribution(numberofTrials, probability);
  return binomialDistribution;
}

/**
 * Calulates standard deviaton using simple statistics
 * @param data is inputted data from column
 * @returns 
 */
export function calculateStandardDeviation(data: number[]): number {
  for (let i = 0; i < data.length; i++) {
    if (data[i] === null) {
      data.splice(i, 1);
    }
  }
  const standardDeviation = ss.standardDeviation(data).toPrecision(2);
  const result = parseFloat(standardDeviation);
  return result;
}
