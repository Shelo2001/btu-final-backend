import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const loginUser = async () => {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/signin`,
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));
            if (data.token) {
                document.location.href = "/";
            }
        };

        loginUser();
    };

    return (
        <div>
            <Container>
                <Row className=" d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h4 className="fw-bold mb-2 text-center text-uppercase ">
                                        Sign In
                                    </h4>
                                    <div className="mb-3">
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3"></Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="dark"
                                                    type="submit"
                                                >
                                                    Sign In
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account ?{" "}
                                                <Link
                                                    to="/register"
                                                    className="fw-bold"
                                                >
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
