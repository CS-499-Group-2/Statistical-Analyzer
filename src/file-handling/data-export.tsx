import { CsvData } from "./import";
import useCloudStore from "../stores/cloud-store";

/**
 * Creates a downloadable CSV file from the inputted data
 * @param csvData a 2d array of numbers representing the data being analyzed
 */
export const exportData = (csvData: CsvData) => {
  const dataString = csvToString(csvData); // convert data to CSV formatted string
  // Below is the same process as for exporting results, but with csv instead of txt file
  const blob = new Blob([dataString], { type: "text/csv" }); // Creates a "blob" that can hold the file data
  const url = URL.createObjectURL(blob); // Converts the blob into a url
  const anchor = document.createElement("a"); // Creates hyperlink element
  const fileName = (useCloudStore.getState().activeFile ?? "data") + ".csv";
  anchor.download = fileName;
  anchor.href = url; // Specifies the anchor's url
  anchor.click(); // Simulates a mouse click
};

export const csvToString = (csvData: CsvData): string => {
  let dataString: string;
  if (csvData.headers) {
    dataString = csvData.headers + "\n" + csvData.data.join("\n"); // convert data to CSV formatted string
  }
  else {
    dataString = csvData.data.join("\n");
  }
  console.log("CSV string:\n" + dataString); // log dataString to console
  return dataString;
};