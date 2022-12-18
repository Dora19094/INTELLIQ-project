import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../logo.svg";
import "./NavigationBar.css";

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="home">
        <img src={logo} width="64" height="64" alt="" />
        <h1> IntelliQ </h1>
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link eventKey={1} as={Link} to="home">
          Home
        </Nav.Link>
        <Nav.Link eventKey={1} as={Link} to="questionnaires">
          Questionnaires
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
