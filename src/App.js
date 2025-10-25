import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import EditCustomerPage from "./pages/EditUserPage.jsx";
import EditPromotionPage from "./pages/EditPromotionPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import UserHome from "./pages/UserHome.jsx";
import PromotionForm from "./components/PromotionForm.jsx";
import UserForm from "./components/UserForm.jsx";
import { Navigate } from "react-router-dom";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth={false} sx={{ px: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/users/login" />} />
            <Route path="users/login" element={<Login />} />
            <Route path="/admins" element={<Register />} />
            <Route path="/admins/dashboard" element={<AdminHome />} />
            <Route path="/users/dashboard" element={<UserHome />} />
            <Route path="/edit-user/:id" element={<EditCustomerPage />} />
            <Route path="/edit-promotion/:id" element={<EditPromotionPage />} />
            <Route path="/create-user" element={<UserForm />} />
            <Route path="/create-promotion" element={<PromotionForm />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
