import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Header1 = (props) => {
  
  const { fetchData } = props;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/Login");
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      style={{
        boxShadow: "2px 2px 10px #029499",
        transition: "0.4s ease-in",
      }}
    >
      <Container>
        <Navbar.Brand href="#">
          <img
            src="https://proteconsol.com/static/media/ProteconsLogo.590f66c6a58c813c9369e36e2fe5521a.svg"
            alt="Protecons Logo"
            height="40px"
            width="100px"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavDropdown" />
        <Navbar.Collapse id="navbarNavDropdown">
          <Nav className="ms-auto">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className="nav-link active px-4 fs-6 fw-bold"
                  onClick={() => fetchData ? fetchData(100) : navigate("/HTML")}
                >
                  HTML
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active px-4 fs-6 fw-bold"
                  onClick={() => fetchData ? fetchData(200) : navigate("/CSS")}
                >
                  CSS
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active px-4 fs-6 fw-bold"
                  onClick={() => fetchData ? fetchData(300) : navigate("/Python")}
                >
                  Python
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link active px-4 fs-6 fw-bold"
                  onClick={() => fetchData ? fetchData(400) : navigate("/JavaScript")}
                >
                  JavaScript
                </button>
              </li>
              <NavDropdown title={<FaUser />}>
                <NavDropdown.Item>Account</NavDropdown.Item>
                <NavDropdown.Item>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header1;
