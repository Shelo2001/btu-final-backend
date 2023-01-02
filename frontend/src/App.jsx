import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyQuizes from "./pages/MyQuizes";
import CreateQuiz from "./pages/CreateQuiz";
import AddQuestions from "./pages/AddQuestions";
import AdminPanel from "./pages/AdminPanel";
import QuizDetails from "./pages/QuizDetails";

function App() {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/quiz/:id" element={<QuizDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/myquizes" element={<MyQuizes />} />
                <Route path="/myquizes/create" element={<CreateQuiz />} />

                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route
                    path="/myquizes/quiz/questions/:id"
                    element={<AddQuestions />}
                />
            </Routes>
        </Router>
    );
}

export default App;
