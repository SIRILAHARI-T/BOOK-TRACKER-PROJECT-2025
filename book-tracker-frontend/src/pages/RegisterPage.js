import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function RegisterPage() {
  const [name, setName] = useState(""); // added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        alert("Registration successful! You can now login.");
        navigate("/login");
      } else {
        const errorText = await res.text();
        alert("Registration failed: " + errorText);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>📝 Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;



