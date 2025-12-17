import { colors } from "@/configs/colorConfig";
import { createTheme } from "@mui/material/styles";

export const getLightTheme = () =>
  createTheme({
    palette: {
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      text: colors.text,
      success: colors.success,
      error: colors.error,
      warning: colors.warning,
      info: colors.info,
      divider: colors.divider,
      action: colors.action,
    },
    typography: {
      fontFamily: 'var(--font-pridi), "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      body1: {
        fontSize: "0.875rem",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: "#FFFFFF",
              fontSize: 20,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          className: "btn-hover-scale",
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 24px",
          },
        },
      },
    },
  });

export const getDarkTheme = () =>
  createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#B09197",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#3A3A3A",
      },
      background: {
        default: "#1A1618",
        paper: "#252022",
      },
      text: {
        primary: "#F0E8EA",
        secondary: "#B8B0B2",
      },
      divider: "#3A3538",
      action: {
        hover: "rgba(176, 145, 151, 0.08)",
      },
    },
    typography: {
      fontFamily: 'var(--font-pridi), "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      body1: {
        fontSize: "0.875rem",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: "#252022",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: "12px 24px",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "#252022",
            borderRight: "1px solid #3A3538",
          },
        },
      },
    },
  });

export const appTheme = getLightTheme();
