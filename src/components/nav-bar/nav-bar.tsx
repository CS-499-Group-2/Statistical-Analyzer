import React from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./nav-bar.css";


export const NavBar = () => {

  const openFile = () => {
    console.log("openFile");
  };

  const exportAsCsv = () => {
    console.log("exportAsCsv");
  };

  return (
    <Navbar bg="light" expand="sm" fixed="top" className="root">
      <Container>
        <Navbar.Brand>Statistical Analyzer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => openFile()}>Open</NavDropdown.Item>
              <NavDropdown.Item onClick={() => exportAsCsv}>Export as csv</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
