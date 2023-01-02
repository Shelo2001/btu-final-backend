import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyQuizes = () => {
    const [user, setUser] = useState(null);
    const [quizes, setQuizes] = useState(null);

    useEffect(() => {
        const userFromStorage = JSON.parse(localStorage.getItem("user"));
        const token = JSON.parse(localStorage.getItem("token"));
        setUser(userFromStorage);
        const getMyQuizes = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/${
                    userFromStorage.id
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setQuizes(data?.quiz);
        };
        getMyQuizes();
    }, []);

    const deleteHandler = (id) => {
        const token = JSON.parse(localStorage.getItem("token"));
        const deleteMyQuizes = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            location.reload();
        };
        deleteMyQuizes();
    };

    return (
        <div>
            <Link className="m-5" to="/myquizes/create">
                <Button variant="success">Create Quiz</Button>
            </Link>

            <h1 className="mt-5 text-center">My Quizes</h1>
            <p className="mt-2 text-center mb-5">click to add questions</p>

            <Container>
                <Row>
                    <Col>
                        <Row xs={1} md={3} className="g-4">
                            {quizes?.length === 0 && (
                                <Alert variant="primary">No Items Yet</Alert>
                            )}
                            {quizes?.map((quiz) => (
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
                                                    to={`/myquizes/quiz/questions/${quiz.id}`}
                                                >
                                                    <Button variant="success">
                                                        Add Questions
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

export default MyQuizes;
