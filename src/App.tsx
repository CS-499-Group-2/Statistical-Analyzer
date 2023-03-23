import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Spreadsheet } from "./components/spreadsheet/spreadsheet";
import { Operation, operations } from "./stats/operations";
import { CsvData } from "./file-handling/import";


function App() {
  const [selectedOperations, setSelectedOperations] = React.useState<string[]>([]);
  // This is the source of truth for the data. We will try to pass this to all of the operations that need it.
  const [data, setData] = React.useState<CsvData>({data: [[10, 15], [1, 2], [5, 10]], headers: ["Column 1", "Column 2"]});
  
  // This is the useEffect hook. It is called whenever the things in the array change. In this case, we want to log the selected operations whenever they change. This will be called after re-rendering, so the state will have changed
  React.useEffect(() => {
    console.log("Selected operations: ", selectedOperations.join(", "));
  }, [selectedOperations]);

  /**
   * Adds an operation to the list of selected operations
   * @param operation The operation to add to the list of selected operations
   */
  const onOperationSelected = (operation: Operation) => {
    setSelectedOperations(previous => [...previous, operation]); // Set on a useState passes in the previous state, so we can just add the new operation to the previous state
    // We can't print the selected operations here, because the site hasn't re-rendered yet, so the state hasn't changed
  };

  /**
   * Called whenever a cell in the spreadsheet changes. When this happens, we need to update the data in our state, since it doesn't automatically update.
   * @param row The row of the cell that changed
   * @param column The column of the cell that changed
   * @param value The new value of the cell
   */
  const onCellChange = (row: number, column: number, value: number) => {
    setData(previousData => {
      const newData = {...previousData}; // We need to clone the data, because we can't mutate the state directly
      if (newData.data[row] === undefined) { // If row doesn't exist, create a new row
        newData.data[row] = [];
      }
      newData.data[row][column] = value; // Update the value
      console.log("New data: ", newData);
      return newData;
    });
  };

  /**
   * Updates the header for the specified column
   * @param column The column of the header that changed
   * @param value The new value of the header
   */
  const onHeaderChange = (column: number, value: string) => {
    setData(previousData => {
      const newData = {...previousData}; // We need to clone the data, because we can't mutate the state directly
      newData.headers[column] = value; // Update the value
      console.log("New data: ", newData);
      return newData;
    });
  };

  return (
    <div className="App">
      <NavBar availableOperations={[...operations] /* For some reason, operations is readonly, so we just clone it here*/} 
        onOperationSelected={onOperationSelected} />
      <Spreadsheet data={data} onCellChange={onCellChange} onHeaderChange={onHeaderChange} />
    </div>
  );
}

export default App;
