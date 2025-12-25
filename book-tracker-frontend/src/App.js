import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Import pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoard"; // match file name exactly
import AddBook from "./pages/AddBook";
import BooksList from "./pages/BooksList";
import EditBook from "./pages/EditBook"; // new import

// Homepage component
function Home() {
  return (
    <div className="app-container">
      {/* Floating emojis */}
      <div className="floating-icon icon1">📖</div>
      <div className="floating-icon icon2">📚</div>
      <div className="floating-icon icon3">✨</div>

      <div className="card">
        <h1>📘 Book Tracker</h1>
        <p>Track your reading journey in style 📖💫</p>

        <div className="button-group">
          <Link to="/login">
            <button className="btn login">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashBoard />} /> {/* updated */}
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/edit-book/:id" element={<EditBook />} /> {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
