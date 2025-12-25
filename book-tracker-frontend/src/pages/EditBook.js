import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddBook.css"; // reuse AddBook styling

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Not Started");

  const userId = localStorage.getItem("userId"); // logged-in user

  useEffect(() => {
    if (!userId) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    // Fetch book details
    fetch(`http://localhost:8080/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user.id !== parseInt(userId)) {
          alert("You are not allowed to edit this book!");
          navigate("/books");
        } else {
          setTitle(data.title);
          setAuthor(data.author);
          setStatus(data.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        alert("Error fetching book: " + error.message);
      });
  }, [id, navigate, userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, status, user: { id: userId } }),
      });

      if (response.ok) {
        alert("Book updated successfully!");
        navigate("/books");
      } else {
        alert("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book: " + error.message);
    }
  };

  return (
    <div className="addbook-container">
      <div className="addbook-card">
        <h2>✏️ Edit Book</h2>
        <form onSubmit={handleUpdate}>
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
          <button type="submit">Update Book</button>
        </form>
        <button className="btn back" onClick={() => navigate("/books")}>
          🔙 Back to Books
        </button>
      </div>
    </div>
  );
}

export default EditBook;
