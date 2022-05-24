import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = (props) => {
  const signedInStatus = (status) => {
    if (status === "LOGGED_IN") {
      return (
        <Nav className="me-auto">
          <Link to="/dashboard" className="navbar-brand">
            Dashboard
          </Link>
          <Nav.Link href="/signout">Sign out</Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav className="me-auto">
          <Nav.Link href="/signup">Sign up</Nav.Link>
          <Nav.Link href="/signin">Sign in</Nav.Link>
        </Nav>
      );
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{signedInStatus(props.inOrOut)}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
