import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { Spreadsheet } from "./components/spreadsheet/spreadsheet";



function App() {
  
  const [count, setCount] = useState(0);
  
  return (
    <div className="App">
      <NavBar />
      <Spreadsheet />
    </div>
  );
}

export default App;
