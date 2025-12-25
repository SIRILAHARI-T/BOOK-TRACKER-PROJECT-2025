import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css"; // updated to match your file name

function DashBoard() { // match component name to file if you want
  const navigate = useNavigate();

  // Navigate to Add Book page
  const handleAddBook = () => {
    navigate("/add-book");
  };

  // Navigate to View All Books page
  const handleViewBooks = () => {
    navigate("/books"); // we will create this page next
  };

  // Logout and navigate to login page
  const handleLogout = () => {
    // Optional: clear authentication info from localStorage
    // localStorage.removeItem("userToken");
    alert("You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>📚 My Book Tracker Dashboard</h1>
        <p>Welcome back! Here you can manage your books and track your progress.</p>

        <div className="dashboard-buttons">
          <button className="btn add" onClick={handleAddBook}>➕ Add Book</button>
          <button className="btn view" onClick={handleViewBooks}>📖 View All Books</button>
          <button className="btn logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
