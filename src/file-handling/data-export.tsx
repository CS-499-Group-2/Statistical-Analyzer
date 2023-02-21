import React from "react";

/**
 * Changes given data from 2d number array to csv text string
 * @param data a 2d number array that holds the data that was input
 * @returns dataString, a data array converted to csv format
 */
export const formatData = (data: number[][]) => {
  let dataString: string; // String to hold formatted data
  // Below if statement accounts for code adding a comma to the cell if only one element
  if ((data.length == 1) && (data[0].length == 1)) // If one element
  {
    dataString = data.toString(); // Converts to string
  }
  else { // If rows and/or columns > 1
    dataString = data
      .map(row => row + ",") // Maps dataString to be comma separated rows
      .join("\n"); // Joins rows by \n
  }
  console.log("CSV string:\n" + dataString); // Logs dataString to console
  return dataString; // Returns dataString
};

/**
 * Calls formatData and then uses the same process as results-exporter to make downloadable csv
 * @param dataString a string that holds the csv appropriate version of the data
 */
export const exportData = (dataString: string) => {
  // Below is the same process as for exporting results, but with csv instead of txt file
  const blob = new Blob([dataString], { type: "text/csv" }); // Creates a "blob" that can hold the file data
  const url = URL.createObjectURL(blob); // Converts the blob into a url
  const anchor = document.createElement("a"); // Creates hyperlink element
  anchor.download = "data.csv"; // Names the resulting file download
  anchor.href = url; // Specifies the anchor's url
  anchor.click(); // Simulates a mouse click
};