"use client";

import { Box } from "@mui/material";
import { keyframes, useTheme } from "@mui/material/styles";

interface LoadingSpinnerProps {
  size?: number;
  color?: "primary" | "secondary";
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = ({
  size = 48,
  color = "primary",
}: LoadingSpinnerProps) => {
  const theme = useTheme();
  const spinnerColor = theme.palette[color].main;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        border: `${size / 12}px solid`,
        borderColor: `${spinnerColor}30`, // 30 = opacity
        borderTopColor: spinnerColor,
        borderRadius: "50%",
        animation: `${spin} 0.8s linear infinite`,
      }}
      style={{
        borderStyle: "solid",
        borderTopStyle: "solid",
      }}
    />
  );
};

export default LoadingSpinner;
