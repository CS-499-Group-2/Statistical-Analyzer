/* eslint-disable linebreak-style */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { GraphDisplay } from "./components/graph-display/graph-display";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <GraphDisplay selectedGraphs={[
        {
          chartType: "Vertical Bar",
          data: [
            {
              label: "A",
              value: 1,
              color: "red"
            },
            {
              label: "B",
              value: 2,
              color: "blue"
            }
          ],
        },
        {
          chartType: "Pie",
          data: [
            {
              label: "A",
              value: 1,
              color: "red"
            },
            {
              label: "B",
              value: 2,
              color: "blue"
            }
          ]
        },
        {
          chartType: "Normal Distribution",
          // For a normal distribution, (or any xy graph with lines), the data is an array of arrays of points
          data: [
            {
              x: 1,
              y: 1,
            },
            {
              x: 2,
              y: 2,
            }
          ],
          lineLabel: "Test Line",
          color: "red"
        }
      ]} />
      <div>
        <a href="https://vitejs.dev">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;