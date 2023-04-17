import React from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./nav-bar.css";
import { csvToArray } from "../../file-handling/import";
import { Operation } from "../../stats/operation";
import { CsvData } from "../../file-handling/import";
import { useThemeStore } from "../../stores/theme-store";
import { SegmentedToggle } from "../toggle-button/toggle-button";
import { Button, Center, Loader, ThemeIcon } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useCloudStore from "../../stores/cloud-store";

export interface NavBarProps {
  /** List of available operations */
  availableOperations: Operation<unknown>[];
  /** Callback function to be called when an operation is selected */
  onOperationSelected?: (operation: Operation<unknown>) => void;
  onFileImport?: (data: CsvData) => void;
  /** Called when the export button is pressed by the user */
  onExport?: () => unknown;
  /** Called when the cloud export button is pressed by the user */
  onCloudExport?: () => unknown;
  /** The current state of the save button */
  savingState?: "saving" | "saved" | "error";
  /** Called when the user tries to view their files */
  onFilesModalOpen?: () => void;
}

export const NavBar = (props: NavBarProps) => {
  const userState = useCloudStore(state => state.user);
  const theme = useThemeStore(state => state.isDark);

  const openFile = () => {
    // Create a file input element, with the accept attribute set to .csv
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = event => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.item(0);
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
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

  const login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    if (auth.currentUser) {
      auth.signOut().catch(console.error);
      return;
    }
    signInWithPopup(auth, provider).then(result => {
      console.log(result.user);
    });
  };

  const logout = () => {
    const auth = getAuth();
    auth.signOut().catch(console.error);
  };

  return (
    <Navbar expand="md" sticky="top" variant={theme ? "dark" : "light"} bg={theme ? "dark" : "light"}>
      <Container fluid className="me-4 ms-3">
        <Navbar.Brand>
          <img className="nav-logo" src="logo.png" alt="logo" />
          Statistical Analyzer
        </Navbar.Brand>
        <Nav.Item className={"me-auto align-self-center"}>
          <Center>
            {props.savingState === "saving" && <Loader color="green" />}
            {props.savingState === "saved" && (
              <ThemeIcon color="green">
                <IconCheck />
              </ThemeIcon>
            )}
            {props.savingState === "error" && (
              <ThemeIcon color="red">
                <IconX />
              </ThemeIcon>
            )}
          </Center>
        </Nav.Item>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="basic-nav-dropdown" menuVariant={theme ? "dark" : "light"}>
              <NavDropdown.Item onClick={() => openFile()}>Open</NavDropdown.Item>
              {userState && <NavDropdown.Item onClick={props.onFilesModalOpen}>Open Online</NavDropdown.Item>}
              <NavDropdown.Item onClick={props.onExport}>Export as CSV</NavDropdown.Item>
              {userState && <NavDropdown.Item onClick={props.onCloudExport}>Save Online</NavDropdown.Item>}
              <NavDropdown.Item onClick={() => showResults()}>View Statistics</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Statistics" id="basic-nav-dropdown" menuVariant={theme ? "dark" : "light"}>
              {props.availableOperations.map(
                (
                  operation // Loop over all the available operations
                ) => (
                  <NavDropdown.Item
                    key={operation.name} // This is necessary whenever you use a loop in React
                    onClick={() => props.onOperationSelected?.(operation) /* Call the onOperationSelected function if it's not null */}
                  >
                    {operation.name}
                  </NavDropdown.Item>
                )
              )}
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item>
              <SegmentedToggle />
            </Nav.Item>
            <Nav.Item className="ms-3 mt-auto">
              {userState ? <Button onClick={logout}>Logout</Button> : <Button onClick={login}>Login/Sign Up</Button>}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
