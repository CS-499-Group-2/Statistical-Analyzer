interface CsvData {
  headers?: string[],
  data: number[][]
}

/**
 * This function takes a string and converts it to an object with headers and data
 * @param data A string that represents whatever
 * @param delimiter The delimiter
 * @returns An object with the headers and the data
 * 
 * 
 */
export function csvToArray(data:String, delimiter = ","): CsvData {
  const header = data.slice(0, data.indexOf(" ")).split(delimiter);
  const rows = data.slice(data.indexOf(" ") + 1).split(" ");

  const csvData: CsvData = {
    headers: header,
    data: rows.map(row => row.split(delimiter).map(Number))
  };

  return csvData;

}

