export interface CsvData {
  headers?: string[];
  data: (string | number | null)[][];
}

/**
 * This function takes a string and converts it to an object with headers and data
 * @param data A string that represents the data in a csv file
 *
 * @returns An object with the headers and the data
 * 
 * 
 */

export function csvToArray(data: string) : CsvData {
  
  const headers = getHeaders(data);
  const dataArray = getData(data);
  const csvData: CsvData = {
    headers: headers,
    data: dataArray
  };
  return csvData;
}

/**
 * This function gets the headers of the csv file
 * @param data A string that represents the data in a csv file
 * @returns the headers of the csv file
 */
function getHeaders(data:string): string[] {
   
  const headerArray: string[] = [];
  let stringBuilder = "";

  for ( const i of data){
    if(i === "\n"){
      headerArray.push(stringBuilder);
      break;
    }
    if (i === ","){
      headerArray.push(stringBuilder);
      stringBuilder = "";
    }
    else{
      stringBuilder += i;
    }
  }
  return headerArray;
}

/**
 * This functions parses through the csv file and gets the data and adds it to an array
 * @param data A string that represents the data in a csv file
 * @returns The data of the csv file, without the headers. 
 */
export function getData(data: string): (string | number)[][] {
  const dataArray: (string | number)[][] = [];
  let stringBuilder = "";
  let i = "";
  let rowArray: (string | number)[] = [];
  const newCSV = data.substring(data.indexOf("\n") + 1);

  const getAsStringOrNumber = (string: string) => {
    const number = Number(string);
    if (isNaN(number)) {
      return string.replaceAll("\n", "");
    }
    return number;
  };

  for (i of newCSV) {
    if (i === "\n") {
      rowArray.push(getAsStringOrNumber(stringBuilder));
      stringBuilder = "";
      dataArray.push(rowArray);
      rowArray = [];
    }
    if (i === ",") {
      rowArray.push(getAsStringOrNumber(stringBuilder));
      stringBuilder = "";
    } else {
      stringBuilder += i;
    }
  }
  if (i === "\n") {
    return dataArray;
  }
  rowArray.push(getAsStringOrNumber(stringBuilder));
  dataArray.push(rowArray);
  return dataArray;
}
