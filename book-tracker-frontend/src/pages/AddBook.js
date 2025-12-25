import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css"; // reuse styling

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Not Started");
  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title.trim() || !author.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    // Get logged-in user ID from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("No logged-in user found. Please login first.");
      navigate("/login");
      return;
    }

    try {
      // POST request to backend including userId as query param
      const response = await fetch(`http://localhost:8080/api/books?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, status }),
      });

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/books"); // go to books list
      } else {
        const errorText = await response.text();
        alert("Failed to add book: " + errorText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book: " + error.message);
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-card">
        <h2>➕ Add New Book</h2>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button type="submit">Add Book</button>
        </form>
        <button className="btn back" onClick={() => navigate("/dashboard")}>
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddBook;


