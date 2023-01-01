import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [registerData, setRegisterData] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (confirmedPassword === password) {
            const registerUser = async () => {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_BASE_API_URL}/signup`,
                    {
                        name,
                        email,
                        password,
                    }
                );

                setRegisterData(data);
                localStorage.setItem("token", JSON.stringify(data.token));
                localStorage.setItem("user", JSON.stringify(data.user));
                if (data.token) {
                    navigate("/");
                }
            };

            registerUser();
        }
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
                                        Sign Up
                                    </h4>
                                    <div className="mb-3">
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    type="text"
                                                    placeholder="Enter Name"
                                                />
                                            </Form.Group>

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
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Confirm Password
                                                </Form.Label>
                                                <Form.Control
                                                    value={confirmedPassword}
                                                    onChange={(e) =>
                                                        setConfirmedPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3"></Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="dark"
                                                    type="submit"
                                                >
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account ?{" "}
                                                <Link
                                                    to="/login"
                                                    className=" fw-bold"
                                                >
                                                    Sign In
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

export default Register;
