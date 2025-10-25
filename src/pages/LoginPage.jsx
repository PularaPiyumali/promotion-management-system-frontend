import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(username, password);
      console.log("Login successful:", data);

      if (data.role === "ADMIN") navigate("/admins/dashboard");
      else navigate("/users/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Login failed";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Inter, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "700",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#000",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#333",
    },
    error: {
      color: "#dc3545",
      marginBottom: "15px",
      padding: "10px",
      border: "1px solid #dc3545",
      borderRadius: "6px",
      backgroundColor: "#ffe6e6",
      textAlign: "center",
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* <div style={styles.footer}>
        Don't have an account?{" "}
        <Link to="/admins" style={styles.link}>
          Register here
        </Link>
      </div> */}
    </div>
  );
};

export default Login;
