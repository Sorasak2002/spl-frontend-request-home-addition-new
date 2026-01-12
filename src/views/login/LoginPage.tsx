"use client";

import { Box, Container, Paper } from "@mui/material";

import ImagePanel from "./ImagePanel";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#C4A48A",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            borderRadius: { xs: 3, md: 5 },
            overflow: "hidden",
            minHeight: 600,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Left Side - Login Form */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 4, md: 8 },
            }}
          >
            <LoginForm />
          </Box>

          {/* Right Side - Image Panel */}
          <Box
            sx={{
              flex: 1.5,
              display: { xs: "none", md: "flex" },
              p: 2,
            }}
          >
            <ImagePanel />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
