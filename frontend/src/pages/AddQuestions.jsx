import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
    Col,
    Row,
    Container,
    Image,
    Button,
    Card,
    Form,
} from "react-bootstrap";

const AddQuestions = () => {
    const [quiz, setQuiz] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getQuizDetails = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/details/${id}`
            );

            setQuiz(data?.quiz);
        };

        getQuizDetails();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image width="500px" height="600px" src={quiz.image} />
                    </Col>
                    <Col>
                        <Col>
                            <h2>{quiz.title}</h2>
                            <p style={{ fontSize: "18px" }}>
                                Description: {quiz.description}
                            </p>

                            <Button
                                className="p-2"
                                style={{
                                    width: "100%",
                                    marginTop: "100px",
                                }}
                                variant="dark"
                            >
                                Start Quiz
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Container>

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
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Name"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Password
                                                </Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Confirm Password
                                                </Form.Label>
                                                <Form.Control
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

export default AddQuestions;
