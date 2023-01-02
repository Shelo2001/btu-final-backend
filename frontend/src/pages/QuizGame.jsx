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
    Alert,
} from "react-bootstrap";

const QuizGame = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const getQuizQuestions = async () => {
            const token = JSON.parse(localStorage.getItem("token"));
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/questions/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setQuestions(data?.questions);
        };

        getQuizQuestions();
    }, []);

    const checkAnswerHandler = () => {};

    return (
        <div>
            {" "}
            {questions?.map((q, index) => (
                <>
                    <Alert variant="primary">
                        <div>
                            {index + 1}. {q.question}
                        </div>
                        <img width="800px" height="300px" src={q.image} />
                        <div>
                            <Form.Check
                                type="radio"
                                name="answer"
                                className="m-2"
                                label={q.answer1}
                                value={1}
                            />{" "}
                            <Form.Check
                                type="radio"
                                name="answer"
                                className="m-2"
                                label={q.answer2}
                                value={2}
                            />{" "}
                            <Form.Check
                                type="radio"
                                name="answer"
                                className="m-2"
                                label={q.answer3}
                                value={3}
                            />{" "}
                            <Form.Check
                                type="radio"
                                name="answer"
                                className="m-2"
                                label={q.answer4}
                                value={4}
                            />
                            <Button onClick={() => checkAnswerHandler()}>
                                Answer
                            </Button>
                        </div>
                    </Alert>
                </>
            ))}
            <h2>Score: {score}</h2>
            {questions.length === 0 && (
                <Alert variant="primary">No Questions Yet</Alert>
            )}
        </div>
    );
};

export default QuizGame;
