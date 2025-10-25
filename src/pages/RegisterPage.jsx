import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Email should be valid";

    if (!form.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!/^\+?[0-9]{7,15}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Phone number should be valid";

    if (!form.username.trim()) newErrors.username = "Username is required";
    else if (form.username.length < 3 || form.username.length > 50)
      newErrors.username = "Username must be between 3 and 50 characters";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await register({ ...form, role: "USER" });
      console.log("User registered:", data);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/users/login"), 1500);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("Registration failed.");
      setMessageType("error");
    }
  };

  const styles = {
    container: {
      maxWidth: "450px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      fontFamily: "Inter, sans-serif",
      backgroundColor: "#fff",
    },
    header: { textAlign: "center", marginBottom: "20px" },
    field: { marginBottom: "15px", display: "flex", flexDirection: "column" },
    label: { fontWeight: "600", marginBottom: "5px" },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    error: { color: "#dc3545", fontSize: "12px", marginTop: "5px" },
    button: {
      padding: "12px",
      width: "100%",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#000",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "10px",
    },
    loginLink: { textAlign: "center", marginTop: "15px", fontSize: "14px" },
    message: { textAlign: "center", marginBottom: "15px", color: "#28a745" },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      {message && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: messageType === "success" ? "#28a745" : "#dc3545",
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        {[
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "username",
          "password",
        ].map((field) => (
          <div key={field} style={styles.field}>
            <label style={styles.label}>
              {field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              style={styles.input}
            />
            {errors[field] && <div style={styles.error}>{errors[field]}</div>}
          </div>
        ))}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      <div style={styles.loginLink}>
        Already have an account? <Link to="/users/login">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
