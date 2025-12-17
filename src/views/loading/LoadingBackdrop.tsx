"use client";

import { Backdrop, Box, Typography } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingBackdropProps {
  open: boolean;
  message?: string;
  fullScreen?: boolean;
}

const LoadingBackdrop = ({
  open,
  message = "กำลังโหลด...",
  fullScreen = true,
}: LoadingBackdropProps) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: fullScreen
          ? "rgba(248, 248, 250, 0.95)"
          : "rgba(255, 255, 255, 0.9)",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <LoadingSpinner size={65} color="primary" />

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "1.2rem",
            fontWeight: 400,
            letterSpacing: 0.3,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingBackdrop;
