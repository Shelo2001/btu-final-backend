import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateQuiz = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const createQuiz = async () => {
            await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/create`,
                {
                    title,
                    image,
                    description,
                    user_id: user.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/myquizes");
        };

        createQuiz();
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
                                        Create Quiz
                                    </h4>
                                    <div className="mb-3">
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Title
                                                </Form.Label>
                                                <Form.Control
                                                    value={title}
                                                    onChange={(e) =>
                                                        setTitle(e.target.value)
                                                    }
                                                    type="text"
                                                    placeholder="Enter Title"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-center">
                                                    Image
                                                </Form.Label>
                                                <Form.Control
                                                    value={image}
                                                    onChange={(e) =>
                                                        setImage(e.target.value)
                                                    }
                                                    type="text"
                                                    placeholder="Enter Image"
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Description
                                                </Form.Label>
                                                <Form.Control
                                                    value={description}
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    as="textarea"
                                                    rows={3}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3"></Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    variant="success"
                                                    type="submit"
                                                >
                                                    Create Quiz
                                                </Button>
                                            </div>
                                        </Form>
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

export default CreateQuiz;
