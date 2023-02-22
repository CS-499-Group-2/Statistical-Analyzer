import React from "react";

/**
 * Creates a downloadable CSV file from the inputted data
 * @param data a 2d array of numbers representing the data being analyzed
 */
export const exportData = (data: number[][]) => {
  const dataString = data.join("\n"); // convert data to CSV formatted string
  console.log("CSV string:\n" + dataString); // log dataString to console
  // Below is the same process as for exporting results, but with csv instead of txt file
  const blob = new Blob([dataString], { type: "text/csv" }); // Creates a "blob" that can hold the file data
  const url = URL.createObjectURL(blob); // Converts the blob into a url
  const anchor = document.createElement("a"); // Creates hyperlink element
  anchor.download = "data.csv"; // Names the resulting file download
  anchor.href = url; // Specifies the anchor's url
  anchor.click(); // Simulates a mouse click
};