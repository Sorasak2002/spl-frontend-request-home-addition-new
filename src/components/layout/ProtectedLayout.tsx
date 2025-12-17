"use client";

import { Box, useTheme } from "@mui/material";
import { FC, useState } from "react";
import Sidebar from "./Sidebar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const gradientLight =
    "linear-gradient(to bottom, " +
    "rgba(200, 220, 228, 0.65) 0%, " +
    "rgba(212, 200, 224, 0.6) 2%, " +
    "rgba(220, 190, 210, 0.55) 4%, " +
    "rgba(225, 195, 205, 0.5) 6%, " +
    "rgba(230, 205, 210, 0.42) 8%, " +
    "rgba(235, 215, 220, 0.35) 10%, " +
    "rgba(240, 225, 230, 0.28) 11.5%, " +
    "rgba(245, 235, 240, 0.2) 13%, " +
    "rgba(250, 245, 248, 0.12) 14%, " +
    "rgba(253, 250, 252, 0.06) 14.7%, " +
    "rgba(255, 255, 255, 0) 15%)";

  const gradientDark =
    "linear-gradient(to bottom, " +
    "rgba(125, 97, 130, 0.35) 0%, " +
    "rgba(115, 85, 120, 0.32) 2%, " +
    "rgba(105, 75, 110, 0.28) 4%, " +
    "rgba(95, 70, 100, 0.24) 6%, " +
    "rgba(85, 65, 95, 0.2) 8%, " +
    "rgba(75, 60, 90, 0.16) 10%, " +
    "rgba(65, 55, 80, 0.13) 11.5%, " +
    "rgba(55, 50, 70, 0.09) 13%, " +
    "rgba(45, 45, 60, 0.05) 14%, " +
    "rgba(18, 18, 18, 0.02) 14.7%, " +
    "rgba(18, 18, 18, 0) 15%)";

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "secondary.main",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: 3,
            minHeight: "100vh",
            background: isDark ? gradientDark : gradientLight,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
