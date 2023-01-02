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
    const [showFinalScore, setShowFinalScore] = useState(false);
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

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

    const checkAnswerHandler = () => {
        if (answer == questions[currentQuestion]?.correct_answer) {
            const nextQuestion = currentQuestion + 1;

            Swal.fire({
                title: "Is This Your Last Answer?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setScore(score + 1);
                    if (nextQuestion < questions.length) {
                        setCurrentQuestion(nextQuestion);
                    } else {
                        setShowFinalScore(true);
                    }
                }
            });
        } else {
            const nextQuestion = currentQuestion + 1;
            Swal.fire({
                title: "Is This Your Last Answer?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!",
            }).then((result) => {
                if (result.isConfirmed) {
                    if (nextQuestion < questions.length) {
                        setCurrentQuestion(nextQuestion);
                    } else {
                        setShowFinalScore(true);
                    }
                }
            });
        }
    };

    return (
        <div>
            {showFinalScore ? (
                <div>
                    <Alert variant="success">
                        <p className="text-center">
                            You scored {score} out of {questions.length}
                        </p>
                    </Alert>
                    <div className="text-center">
                        <Button onClick={() => location.reload()}>
                            Play Again
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Alert variant="primary">
                        <h2 className="text-center">
                            Question # {currentQuestion} / {questions?.length}
                        </h2>
                    </Alert>
                    <Alert variant="secondary" className="text-center">
                        Your Score: {score} / {questions?.length}
                    </Alert>

                    <h4 className="text-center">
                        {questions[currentQuestion]?.question}
                    </h4>

                    <div className="text-center">
                        <img
                            width="600px"
                            height="400px"
                            src={questions[currentQuestion]?.image}
                        />
                    </div>

                    <div className="m-5">
                        <div className="mt-4">
                            <input
                                type="radio"
                                name="answer"
                                value={1}
                                onClick={(e) => setAnswer(e.target.value)}
                            />
                            <label className="ms-2">
                                {questions[currentQuestion]?.answer1}
                            </label>
                        </div>
                        <div className="mt-4">
                            <input
                                type="radio"
                                name="answer"
                                value={2}
                                onClick={(e) => setAnswer(e.target.value)}
                            />
                            <label className="ms-2">
                                {" "}
                                {questions[currentQuestion]?.answer2}
                            </label>
                        </div>
                        <div className="mt-4">
                            <input
                                type="radio"
                                name="answer"
                                value={3}
                                onClick={(e) => setAnswer(e.target.value)}
                            />
                            <label className="ms-2">
                                {" "}
                                {questions[currentQuestion]?.answer3}
                            </label>
                        </div>
                        <div className="mt-4">
                            <input
                                type="radio"
                                name="answer"
                                value={4}
                                onClick={(e) => setAnswer(e.target.value)}
                            />
                            <label className="ms-2">
                                {" "}
                                {questions[currentQuestion]?.answer4}
                            </label>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button onClick={checkAnswerHandler}>
                            Check Answer
                        </Button>
                    </div>

                    {questions.length === 0 && (
                        <Alert variant="primary">No Questions Yet</Alert>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizGame;
