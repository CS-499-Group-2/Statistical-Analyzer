import * as ss from "simple-statistics";

/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
export function calculateMean(data: number[]): number {
  const mean = ss.mean(data);
  return mean;
} 
/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
function calculateMedian(data: number[][]): number[] {
  const medianArray: number[] = [];

  for (let i = 0; i < data[0].length; i++) {
    const column = data.map(row => row[i]);
    if (column.includes(null)) {
      const filteredColumn = column.filter(value => value !== null);
      const median = ss.median(filteredColumn);
      medianArray.push(median);
    } else {
      const median = ss.median(column);
      medianArray.push(median);
    } 
  }
  return medianArray;
}
/**
 *  This function calculates the mean of each column that the user selects. 
 * @param data This is the data will come from the spreadsheet
 * @returns an array of the mean of each column
 */
function calculateMode(data: number[][]): number[] {
  const modeArray: number[] = [];

  for (let i = 0; i < data[0].length; i++) {
    const column = data.map(row => row[i]);
    if (column.includes(null)) {
      const filteredColumn = column.filter(value => value !== null);
      const mode = ss.mode(filteredColumn);
      modeArray.push(mode);
    } else {
      const mode = ss.mode(column);
      modeArray.push(mode);
    } 
  }
  return modeArray;
}

export function calculateBinomialDistribution( numberofTrials: number, probability: number): number [] {
  const binomialDistribution = ss.binomialDistribution(numberofTrials, probability);
  return binomialDistribution;
}