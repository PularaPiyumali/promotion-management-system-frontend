import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function UserForm({ existing }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (existing) {
      setForm({
        firstName: existing.firstName || "",
        lastName: existing.lastName || "",
        email: existing.email || "",
        phoneNumber: existing.phoneNumber || "",
        username: existing.username || "",
        password: existing.password || "",
        role: existing.role || "USER",
      });
    }
  }, [existing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      newErrors.email = "Email should be valid";
      isValid = false;
    }
    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\+?[0-9]{7,15}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should be valid";
      isValid = false;
    }
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (form.username.length < 3 || form.username.length > 50) {
      newErrors.username = "Username must be between 3 and 50 characters";
      isValid = false;
    }
    if (!existing || form.password) {
      if (!form.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (form.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({
        text: "Please fix errors before submitting.",
        type: "error",
      });
      return;
    }

    try {
      const payload = { ...form };
      if (existing?.id && !form.password) delete payload.password;

      let response;
      if (existing?.id) {
        response = await api.put(`/admins/${existing.id}`, payload);
        setForm({ ...response.data, password: response.data.password || "" });
        setMessage({ text: "User updated successfully!", type: "success" });
      } else {
        response = await api.post("/admins", payload);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          username: "",
          password: "",
          role: "USER",
        });
        setMessage({ text: "User created successfully!", type: "success" });
      }

      console.log("Response:", response.data);
      setTimeout(() => {
        navigate("/admins/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Submit Error:", err);
      setMessage({ text: "Error occurred during submission.", type: "error" });
    }
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Inter, sans-serif",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    field: { marginBottom: "15px", display: "flex", flexDirection: "column" },
    label: { marginBottom: "5px", fontWeight: "600", fontSize: "14px" },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    select: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      backgroundColor: "#fff",
    },
    button: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      backgroundColor: "#000",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      width: "100%",
      marginTop: "10px",
    },
    error: { color: "#dc3545", fontSize: "12px", marginTop: "5px" },
    messageBox: {
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "15px",
      textAlign: "center",
      fontWeight: "bold",
    },
    success: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb",
    },
    errorMsg: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb",
    },
  };

  return (
    <div style={styles.container}>
      {message.text && (
        <div
          style={{
            ...styles.messageBox,
            ...(message.type === "success" ? styles.success : styles.errorMsg),
          }}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.firstName && (
            <div style={styles.error}>{errors.firstName}</div>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.lastName && <div style={styles.error}>{errors.lastName}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.phoneNumber && (
            <div style={styles.error}>{errors.phoneNumber}</div>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.username && <div style={styles.error}>{errors.username}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              style={{ ...styles.input, flex: 1 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                marginLeft: "5px",
                padding: "0 10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          {existing ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
