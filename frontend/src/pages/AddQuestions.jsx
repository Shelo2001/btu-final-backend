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

const AddQuestions = () => {
    const [quiz, setQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [image, setImage] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(1);

    console.log(id);

    useEffect(() => {
        const getQuizDetails = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/details/${id}`
            );

            setQuiz(data?.quiz);
        };

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

        getQuizDetails();
        getQuizQuestions();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const createQuestion = async () => {
            const token = JSON.parse(localStorage.getItem("token"));

            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/question/create`,
                {
                    question,
                    image,
                    answer1,
                    answer2,
                    answer3,
                    answer4,
                    correct_answer: correctAnswer,
                    quiz_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            location.reload();
        };

        createQuestion();
    };

    return (
        <div>
            <h4 className="text-center">
                Scroll Bottom To View Added Questions
            </h4>

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
                            <Container className="mt-5">
                                <Row className=" d-flex justify-content-center align-items-center">
                                    <Col md={12} lg={12} xs={12}>
                                        <Card className="px-4">
                                            <Card.Body>
                                                <div className="mb-3 mt-md-4">
                                                    <h4 className="fw-bold mb-2 text-center text-uppercase ">
                                                        Create Question
                                                    </h4>
                                                    <div className="mb-3">
                                                        <Form
                                                            onSubmit={
                                                                submitHandler
                                                            }
                                                        >
                                                            <Form.Group className="mb-3">
                                                                <Form.Label className="text-center">
                                                                    Question
                                                                    Name
                                                                </Form.Label>
                                                                <Form.Control
                                                                    value={
                                                                        question
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setQuestion(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    placeholder="Enter Question Name"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label className="text-center">
                                                                    Image
                                                                </Form.Label>
                                                                <Form.Control
                                                                    value={
                                                                        image
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setImage(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    placeholder="Enter Image"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label className="text-center">
                                                                    Answer 1
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    value={
                                                                        answer1
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswer1(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="Enter Answer 1"
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    Answer 2
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Answer 2"
                                                                    value={
                                                                        answer2
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswer2(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    Answer 3
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Answer 3"
                                                                    value={
                                                                        answer3
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswer3(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    Answer 4
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Answer 4"
                                                                    value={
                                                                        answer4
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAnswer4(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3">
                                                                <Form.Label>
                                                                    Correct
                                                                    Answer
                                                                    Position
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    placeholder="Enter Correct Answer Position"
                                                                    value={
                                                                        correctAnswer
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setCorrectAnswer(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3"></Form.Group>
                                                            <div className="d-grid">
                                                                <Button
                                                                    variant="success"
                                                                    type="submit"
                                                                >
                                                                    Create
                                                                    Answer
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
                        </Col>
                    </Col>
                </Row>
            </Container>

            {questions?.map((q, index) => (
                <Alert variant="primary">
                    <div>
                        {index + 1}. {q.question}
                    </div>
                    <img width="100px" height="100px" src={q.image} />
                    <p>{q.answer1}</p>
                    <p>{q.answer2}</p>
                    <p>{q.answer3}</p>
                    <p>{q.answer4}</p>
                    <p>Correct Answer Position: {q.correct_answer}</p>
                </Alert>
            ))}
            {questions.length === 0 && (
                <Alert variant="primary">No Questions Yet</Alert>
            )}
        </div>
    );
};

export default AddQuestions;
