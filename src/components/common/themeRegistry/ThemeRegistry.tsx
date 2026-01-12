"use client";

import React, { FC, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { useTheme } from "@/contexts/ThemeContext";
import { getDarkTheme, getLightTheme } from "./theme";
import MuiXLicense from "@/app/MuiXLicense";

type Props = {
  children: React.ReactNode;
};

const ThemeRegistry: FC<Props> = ({ children }) => {
  const { effectiveTheme } = useTheme();

  const muiTheme = useMemo(() => {
    return effectiveTheme === "dark" ? getDarkTheme() : getLightTheme();
  }, [effectiveTheme]);

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <MuiXLicense />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
