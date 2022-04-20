import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import auth from "../services/auth";
const NavBar = (props) => {
  const currentLocation = window.location.href || null;
  const handleLogout = () => {
    auth.logout();
    window.location.href = "/login";
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      bg="primary"
      variant="dark"
    >
      <Container className="flex space-between px-5">
        <Link
          style={{ color: "white", textDecoration: "none" }}
          className="navbar-brand"
          to="/"
        >
          My Journal
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" style={{ fontSize: "16px" }}>
            {!props.isLogined ? (
              <>
                <Link className="alignCenter nav-link" to="/login">
                  Login
                </Link>
                <Link className="alignCenter nav-link" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <React.Fragment>
                {!currentLocation.includes("/journals/") && (
                  <Link className="alignCenter nav-link" to="/journals/new">
                    New Journal
                  </Link>
                )}
                <NavDropdown
                  className="removeAfter"
                  title={auth.getCurrentUser().name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
