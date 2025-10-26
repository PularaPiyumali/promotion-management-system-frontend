import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Divider,
  Button,
  Avatar,
} from "@mui/material";
import PromotionsTable from "../components/PromotionTable";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

const UserDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);

    const role = localStorage.getItem("role");
    if (role !== "USER") {
      navigate("/users/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/users/login");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#000",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            User Dashboard
          </Typography>
          <Button
            onClick={handleLogout}
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: 8,
              height: "calc(100vh - 64px)",
              backgroundColor: "#fff",
              color: "#000",
              borderRight: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              pb: 0,
            },
          }}
        >
          <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
            <Toolbar />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: "#000" }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {username}
              </Typography>
            </Box>

            <Divider />

            <List sx={{ mt: 3 }}>
              <ListItemButton
                selected={true}
                sx={{
                  mb: 1,
                  borderRadius: "12px",
                  transition: "0.3s",
                  "&.Mui-selected": {
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#222222",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemText
                  primary="Promotions"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </List>
          </Box>

          <Box sx={{ px: 2, py: 1, backgroundColor: "#000" }}>
            <Typography variant="caption" color="#000" align="center">
              © 2025 All rights reserved.
            </Typography>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: "#f8f8f8", pb: 8 }}
        >
          <PromotionsTable />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#000",
          py: 1,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Typography color="#fff" align="center">
          © 2025 All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDashboard;
