import React from "react";

const Input = ({ label, value, onChange, type = "text", placeholder }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default Input;
