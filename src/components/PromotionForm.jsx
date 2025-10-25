import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PromotionForm({ existing }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    banner: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (existing) {
      const fullBannerUrl = existing.bannerImageUrl
        ? `http://localhost:8080${existing.bannerImageUrl}`
        : null;

      setForm({
        name: existing.name || "",
        startDate: existing.startDate || "",
        endDate: existing.endDate || "",
        banner: null,
      });

      setPreview(fullBannerUrl);
    }
  }, [existing]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "banner") {
      const file = files[0];
      setForm({ ...form, banner: file });
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (form.name.length < 3 || form.name.length > 100) {
      newErrors.name = "Name must be between 3 and 100 characters";
      isValid = false;
    }

    if (!form.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    }

    if (!form.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else if (
      form.startDate &&
      new Date(form.endDate) < new Date(form.startDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
      isValid = false;
    }
    if (!form.banner && !existing) {
      newErrors.banner = "Please upload a banner image";
      isValid = false;
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("startDate", form.startDate);
    formData.append("endDate", form.endDate);
    if (form.banner instanceof File) {
      formData.append("banner", form.banner);
    }

    try {
      let response;
      if (existing?.id) {
        response = await api.put(`/promotions/${existing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage({
          text: "Promotion updated successfully!",
          type: "success",
        });
      } else {
        response = await api.post("/promotions", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage({
          text: "Promotion created successfully!",
          type: "success",
        });
        setForm({ name: "", startDate: "", endDate: "", banner: null });
        setPreview(null);
        setErrors({});
      }
      console.log("Response:", response.data);

      const role = localStorage.getItem("role");

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admins/dashboard");
        } else {
          navigate("/users/dashboard");
        }
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        const { message, errors } = err.response.data;
        let errorText = message;

        if (errors) {
          errorText += ": " + Object.values(errors).join(", ");
        }

        setMessage({ text: errorText, type: "error" });
      } else {
        setMessage({
          text: "Error occurred during submission.",
          type: "error",
        });
      }
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
      boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
    },
    field: { marginBottom: "15px", display: "flex", flexDirection: "column" },
    label: { marginBottom: "5px", fontWeight: "600" },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
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
    bannerPreview: { marginTop: "10px", maxWidth: "100%", borderRadius: "6px" },
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={styles.field}>
          <label style={styles.label}>Promotion Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter promotion name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.startDate && (
            <div style={styles.error}>{errors.startDate}</div>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.endDate && <div style={styles.error}>{errors.endDate}</div>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Banner</label>
          <input
            type="file"
            name="banner"
            onChange={handleChange}
            style={styles.input}
          />
          {preview && (
            <img
              src={preview}
              alt="Banner Preview"
              style={styles.bannerPreview}
            />
          )}
          {errors.banner && <div style={styles.error}>{errors.banner}</div>}
        </div>

        <button type="submit" style={styles.button}>
          {existing ? "Update Promotion" : "Create Promotion"}
        </button>
      </form>
    </div>
  );
}
