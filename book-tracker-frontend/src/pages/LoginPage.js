import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- import Link
import "./Auth.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json(); // backend now returns full user object
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userEmail", data.email);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        const errorText = await res.text();
        alert("Login failed: " + errorText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🔑 Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>

        {/* ADD LINK TO REGISTER PAGE */}
        <p style={{ marginTop: "15px", color: "#fff" }}>
          Don't have an account? <Link to="/register" style={{ color: "#ffd700" }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

