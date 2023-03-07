import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Spreadsheet } from "./components/spreadsheet/spreadsheet";
import { Operation, operations } from "./stats/operations";



function App() {
  const [selectedOperations, setSelectedOperations] = React.useState<string[]>([]);
  
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

  return (
    <div className="App">
      <NavBar availableOperations={[...operations] /* For some reason, operations is readonly, so we just clone it here*/} 
        onOperationSelected={onOperationSelected} />
      <Spreadsheet />
    </div>
  );
}

export default App;
