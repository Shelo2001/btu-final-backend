import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Form, Row, Container, Image, Button } from "react-bootstrap";

const QuizDetails = () => {
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getQuizDetails = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/details/${id}`
            );

            setQuiz(data?.quiz);
            setQuestions(data?.questions);
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
                            <p style={{ fontSize: "18px" }}>
                                Questions: {questions.length}
                            </p>
                            <Link to={`/quiz/start/${quiz.id}`}>
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
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default QuizDetails;
