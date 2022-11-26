import { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import logo from "../assets/logo.png";
import Switch from "react-switch";
// import LightTheme from "../assets/Light_theme.png"
// import DarkTheme from "../assets/Dark_theme.png"

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const {theme, toggleTheme} = useContext(AppContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    // redirect to home page
    window.location.replace("/");
  };

  return (
    <Navbar bg={theme} expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={logo}
              style={{ width: 50, height: 50 }}
              alt="chat app logo"
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div style={{display:"flex", marginLeft:"20rem"}}>
            <Switch className="d-flex" onChange={toggleTheme} checked={theme === "dark"}/>
          </div>
          <Nav className="ms-auto">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      src={user.picture}
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                    {user.name}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Preferences</NavDropdown.Item>
                <NavDropdown.Item>Settings</NavDropdown.Item>

                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
