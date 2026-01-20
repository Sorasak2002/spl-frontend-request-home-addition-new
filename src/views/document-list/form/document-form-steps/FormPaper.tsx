"use client";

import { Paper } from "@mui/material";
import React, { FC } from "react";

const FormPaper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(125, 97, 103, 0.08)"
            : "rgba(125, 97, 103, 0.05)",
        borderRadius: 2,
        border: (theme) =>
          `1px solid ${theme.palette.mode === "dark"
            ? "rgba(125, 97, 103, 0.2)"
            : "rgba(125, 97, 103, 0.15)"
          }`,
      }}
    >
      {children}
    </Paper>
  );
};

export default FormPaper;
