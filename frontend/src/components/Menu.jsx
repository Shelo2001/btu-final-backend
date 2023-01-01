import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const logoutHandler = () => {
        const logoutUser = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            await axios.get(`${import.meta.env.VITE_BASE_API_URL}/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        };

        logoutUser();
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg">
                <Container>
                    <Link to="/">
                        <Navbar.Brand>
                            <h3>MAIN</h3>
                        </Navbar.Brand>
                    </Link>

                    <Navbar.Collapse>
                        {user ? (
                            <Nav className="ms-auto">
                                <Nav.Link>
                                    <Link to="/myquizes">
                                        <Button>My Quizes</Button>
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Button
                                        variant="danger"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Button>
                                </Nav.Link>
                                {user.is_admin ? (
                                    <Nav.Link>
                                        <Link to="/adminpanel">
                                            <Button>Admin Panel</Button>
                                        </Link>
                                    </Nav.Link>
                                ) : null}
                            </Nav>
                        ) : (
                            <Nav className="ms-auto">
                                <Nav.Link>
                                    <Link to="/login">
                                        <i className="fa-solid fa-user"></i>
                                    </Link>
                                </Nav.Link>

                                <Nav.Link>
                                    <Link to="/register">
                                        <i class="fa-solid fa-registered"></i>
                                    </Link>
                                </Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;
