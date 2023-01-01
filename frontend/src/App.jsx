import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyQuizes from "./pages/MyQuizes";
import CreateQuiz from "./pages/CreateQuiz";
import AddQuestions from "./pages/AddQuestions";

function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/myquizes" element={<MyQuizes />} />
                <Route path="/myquizes/create" element={<CreateQuiz />} />
                <Route
                    path="/myquizes/addquestions/:id"
                    element={<AddQuestions />}
                />
            </Routes>
        </Router>
    );
}

export default App;
