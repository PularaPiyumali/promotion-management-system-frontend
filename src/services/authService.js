import api from "./api";

export const login = async (username, password) => {
  const response = await api.post("/users/login", { username, password });

  if (response.data.accessToken) {
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("username", username);
  }

  return response.data;
};

export const register = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  username,
  password,
  role,
}) => {
  const response = await api.post("/admins", {
    firstName,
    lastName,
    email,
    phoneNumber,
    username,
    password,
    role: role || "USER",
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};

export const getCurrentUser = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
  };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  return localStorage.getItem("role") === "ADMIN";
};

export const isUser = () => {
  return localStorage.getItem("role") === "USER";
};
