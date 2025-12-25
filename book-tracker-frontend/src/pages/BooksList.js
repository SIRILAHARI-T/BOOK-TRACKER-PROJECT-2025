import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BooksList.css";

function BooksList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Get logged-in user ID from localStorage
  const userId = localStorage.getItem("userId");

  const fetchBooks = async () => {
    if (!userId) {
      alert("No user logged in. Please login first.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/books/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      } else {
        const errorText = await res.text();
        alert("Failed to fetch books: " + errorText);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Error fetching books: " + error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBooks(books.filter((book) => book.id !== id));
        alert("Book deleted successfully!");
      } else {
        const errorText = await response.text();
        alert("Failed to delete book: " + errorText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting book: " + error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="bookslist-container">
      <div className="bookslist-card">
        <h2>📖 My Books</h2>

        {books.length === 0 ? (
          <p>No books found. Add some from your Dashboard!</p>
        ) : (
          <ul className="bookslist">
            {books.map((book) => (
              <li key={book.id}>
                <div style={{ color: "black" }}>
                  <strong>{book.title}</strong> by {book.author} - {book.status}
                </div>
                <div className="book-actions">
                  <button className="btn edit" onClick={() => handleEdit(book.id)}>
                    ✏️ Edit
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(book.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button className="btn back" onClick={handleBack}>
          🔙 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default BooksList;
