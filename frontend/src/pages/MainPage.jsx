import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
    const [quizes, setQuizes] = useState();

    useEffect(() => {
        const getActiveQuizes = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/quiz/all`
            );
            setQuizes(data?.quizzes);
        };
        getActiveQuizes();
    }, []);

    return (
        <div>
            <h1 className="mt-5 text-center">Fun Quizzes!</h1>
            <p className="mt-2 text-center mb-5">click to get information</p>
            <Container>
                <Row>
                    <Col>
                        <Row xs={1} md={3} className="g-4">
                            {quizes?.length === 0 && (
                                <Alert variant="primary">No Items Yet</Alert>
                            )}
                            {quizes?.map((product) => (
                                <Link
                                    to={`/myquizes/addquestions/${product.id}`}
                                >
                                    <Col>
                                        <Card>
                                            <Card.Img
                                                variant="top"
                                                src={product.image}
                                                width="300px"
                                                height="300px"
                                            />
                                            <Card.Body>
                                                <Card.Title>
                                                    {product.title.substring(
                                                        0,
                                                        20
                                                    )}
                                                    ...
                                                </Card.Title>
                                                <Card.Text>
                                                    {product.description}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Card.Text>
                                                    {product.created_at}
                                                </Card.Text>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </Link>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MainPage;
