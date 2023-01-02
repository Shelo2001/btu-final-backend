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

const AdminQuizDetails = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);

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

    return (
        <div>
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

export default AdminQuizDetails;
