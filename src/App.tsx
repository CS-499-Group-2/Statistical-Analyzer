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
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
