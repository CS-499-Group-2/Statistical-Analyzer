import React from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./nav-bar.css";
import { csvToArray } from "../../file-handling/import";
import { Operation } from "../../stats/operations";
import { CsvData } from "../../file-handling/import";

export interface NavBarProps {
  /** List of available operations */
  availableOperations: Operation[];
  /** Callback function to be called when an operation is selected */
  onOperationSelected?: (operation: Operation) => void;
  onFileImport?: (data: CsvData) => void;
  /** Called when the export button is pressed by the user */
  onExport?: () => unknown;
}

export const NavBar = (props: NavBarProps) => {

  // Function to open a file
  const openFile = () => {
    // Create a file input element, with the accept attribute set to .csv
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const target = event.target as FileReader;
          const csv = target.result;
          if (csv) {
            const array = csvToArray(csv.toString());
            console.log(array);
            props.onFileImport?.(array);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const showResults = () => {
    console.log("showResults");
    const popup = document.getElementById("popup");
    popup.classList.add("open-popup");
  };

  return (
    <Navbar bg="light" expand="sm" sticky="top" >
      <Container id="bar-container">
        <Navbar.Brand>
          <img className="nav-logo" src="logo.png"/>
          Statistical Analyzer
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => openFile()}>Open</NavDropdown.Item>
              <NavDropdown.Item onClick={props.onExport}>Export as CSV</NavDropdown.Item>
              <NavDropdown.Item onClick={() => showResults()}>View Statistics</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Statistics" id="basic-nav-dropdown">
              {props.availableOperations.map((operation) => ( // Loop over all the available operations
                <NavDropdown.Item key={operation} onClick={() => props.onOperationSelected?.(operation) /* Call the onOperationSelected function if it's not null */}>{operation}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};