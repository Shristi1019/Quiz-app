import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Btn from "./Btn";

function Header() {
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        fixed="top"
        style={{
          boxShadow: "2px 2px 10px #029499",
          TransitionEvent: "0.4s ease-in",
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
              <Nav.Link href="#" className="px-4 fs-6 fw-bold">
                Courses
              </Nav.Link>
              <Nav.Item className="dropdown">
                <Nav.Link
                  href="#"
                  className="dropdown-toggle px-4 fs-6 fw-bold"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </Nav.Link>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                  <Dropdown.Item href="#">Product Engineering</Dropdown.Item>
                  <Dropdown.Item href="#">Guidewire Services</Dropdown.Item>
                </Dropdown.Menu>
              </Nav.Item>
              <Nav.Link href="#" className="px-4 fs-6 fw-bold">
                ProT-Labs
              </Nav.Link>
              <Nav.Item className="dropdown">
                <Nav.Link
                  href="#"
                  className="dropdown-toggle px-4 fs-6 fw-bold"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Careers
                </Nav.Link>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                  <Dropdown.Item href="#">Careers</Dropdown.Item>
                  <Dropdown.Item href="#">Job Application</Dropdown.Item>
                </Dropdown.Menu>
              </Nav.Item>
              <Nav.Link href="#" className="px-4 fs-6 fw-bold">
                About
              </Nav.Link>
              <Nav.Link href="#" className="px-4 fs-6 fw-bold">
                Contact Us
              </Nav.Link>
              <Nav.Link>
                <Link to="Login">
                  <Btn title="Login"/>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
