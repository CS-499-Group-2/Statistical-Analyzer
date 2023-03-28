import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Spreadsheet } from "./components/spreadsheet/spreadsheet";
import { Operation, operations } from "./stats/operations";
import {BinomialDistributionDialogBox } from "./components/binomial-distribution-dialog-box/binomial-distribution-dialog-box";




function App() {
  const [selectedOperations, setSelectedOperations] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  
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
    if (operation === "Binomial Distribution") {
      setOpen(true);
    }
  };

  return (
    <div className="App">
      <NavBar availableOperations={[...operations] /* For some reason, operations is readonly, so we just clone it here*/} 
        onOperationSelected={onOperationSelected} />
      <Spreadsheet />
      <BinomialDistributionDialogBox open={open} onClose={()=> setOpen(false)} onSubmit={(results) => {
        setOpen(false);
        console.log(results);
        
      } } />
    </div>
  );
}

export default App;
