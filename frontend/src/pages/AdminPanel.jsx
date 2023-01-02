import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminPanel = () => {
    const [activeQuizes, setActiveQuizes] = useState(null);
    const [nonActiveQuizes, setNonActiveQuizes] = useState(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));

        const getMyQuizes = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/admin/quiz/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setActiveQuizes(data?.approvedQuizzes);
            setNonActiveQuizes(data?.unapprovedQuizzes);
        };
        getMyQuizes();
    }, []);

    const makeActiveHandler = (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const updateQuizToActive = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/admin/quiz/update/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            location.reload();
        };
        updateQuizToActive();
    };

    return (
        <div>
            <h1 className="mt-5 text-center">Non Active Quizes</h1>
            <Container>
                <Row>
                    <Col>
                        <Row xs={1} md={3} className="g-4">
                            {nonActiveQuizes?.length === 0 && (
                                <Alert variant="primary">No Items Yet</Alert>
                            )}
                            {nonActiveQuizes?.map((quiz) => (
                                <Col>
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={quiz.image}
                                            width="300px"
                                            height="300px"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {quiz.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {quiz.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row md={3}>
                                                <Button
                                                    variant="success"
                                                    onClick={() =>
                                                        makeActiveHandler(
                                                            quiz.id
                                                        )
                                                    }
                                                >
                                                    Make Active
                                                </Button>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>

            <h1 className="mt-5 text-center">Active Quizes</h1>
            <Container>
                <Row>
                    <Col>
                        <Row xs={1} md={3} className="g-4">
                            {activeQuizes?.length === 0 && (
                                <Alert variant="primary">No Items Yet</Alert>
                            )}
                            {activeQuizes?.map((quiz) => (
                                <Col>
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={quiz.image}
                                            width="300px"
                                            height="300px"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                {quiz.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {quiz.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row md={3}>
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        deleteHandler(quiz.id)
                                                    }
                                                >
                                                    <i class="fa-solid fa-trash"></i>
                                                </Button>
                                                <Card.Text
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {
                                                        quiz.created_at.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                </Card.Text>
                                                <Link
                                                    to={`/myquizes/addquestions/${quiz.id}`}
                                                >
                                                    <Button variant="success">
                                                        Questions
                                                    </Button>
                                                </Link>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminPanel;
