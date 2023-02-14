
import React from "react";

/**
 * Component with name and values attributes
 */
interface Result { 
    /** Represesnts type of stats */
    name: string; 
    /** Represents number(s) returned from calculating those stats */
    values: number[]; 
}

/**
 * Component with Result[] attribute to allow for multiple stats
 */
export interface ResultExporterProps {
    /** Represents an array of all results */
    results: Result[]; 
}

export const formatResults = (results: Result[]) => {
  // The following maps every name and values and in result to be formatted
  // in the form "name: values_1, values_2, etc.", with a newline in between each
  const resultsString = results
    .map(result => result.name + ": " + result.values.join(", "))
    .join("\n");
  return resultsString;
};

/**
 * Function that handles all actions regarding downloading results of the stats calculations
 * @param props represents the results array from ResultExporterProps
 * @returns an export button that will download the results.txt file when clicked
 */
export const ResultExporter = (props: ResultExporterProps) => {
  
  /**
   * Function inside ResultExporter that specifically handles downloading the results.txt file
   * @param result represents the resultsString from handleOnClick that contains the reformatted results array
   */
  const exportText = (result: string) => {
    const blob = new Blob([result], { type: "text/plain" }); // Creates a "blob" that can hold the file data
    const url = URL.createObjectURL(blob); // Converts the blob into a url
    const anchor = document.createElement("a"); // Creates hyperlink element
    anchor.download = "results.txt"; // Names the resulting file download
    anchor.href = url; // Specifies the anchor's url
    anchor.click(); // Simulates a mouse click
  };

  /**
   * Function that reformats results array into a string, prints the resultsString to the console, and calls exportText
   */
  const handleOnClick = () => { 
    const resultsString = formatResults(props.results); // Calls formatResults function with results array
    
    console.log("Results:\n" + resultsString); // Logs resultsString to console
    exportText(resultsString); // Calls exportText function with resultsString argument
  };
  
  // Returns a button with text "Export" that calls handleOnClick
  return (
    <div>
      <button onClick={handleOnClick}>Export</button>
    </div>
  );
};