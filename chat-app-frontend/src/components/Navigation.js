import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
import logo from "../assets/logo.png"

const Navigation = () => {
  return (
    
    <Navbar bg="light" expand="lg">
      <Container>
      <LinkContainer to="/">
        <Navbar.Brand ><img src={logo} style={{width:50, height: 50}} alt="chat app logo"/></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/chat">
            <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
               <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item >Action</NavDropdown.Item>
              <NavDropdown.Item>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item >Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
