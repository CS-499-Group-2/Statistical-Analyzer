/* eslint-disable linebreak-style */
import React from "react";

interface Result { // Result component with "name" and "values" attributes
  name: string; // name represents type of stats
  values: number[]; // number array represents number(s) returned from calculating those stats
}

export interface ResultExporterProps { // component with "Result[]" type to allow for multiple stats
  results: Result[]; // represents an array of results
}

export const ResultExporter = (props: ResultExporterProps) => {
  const exportText = (result: string) => { // function to export results to a text file
    const blob = new Blob([result], { type: "text/plain" }); // creates a "blob" that can hold the file data
    const url = URL.createObjectURL(blob); // converts the blob into a url
    const anchor = document.createElement("a"); // creates hyperlink element
    anchor.download = "results.txt"; // names download
    anchor.href = url; // specifies the anchor's url
    anchor.click(); // simulates a mouse click

  };
  const handleOnClick = () => { // function to convert results to string
    // the following maps every name and values and in result to be formatted
    // in the form "name: values_1, values_2, etc.", with a newline in between each
    const resultsString = props.results
      .map(result => result.name + ": " + result.values.join(", "))
      .join("\n");
    
    console.log("Results:\n" + resultsString); // log resultsString to console
    exportText(resultsString); // call exportText function with resultsString argument
  };
  // returns a button with text "Export" that calls handleOnClick
  return (
    <div>
      <button onClick={handleOnClick}>Export</button>
    </div>
  );
};