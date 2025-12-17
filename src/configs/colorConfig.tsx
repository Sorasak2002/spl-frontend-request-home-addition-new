export const colors = {
  // Primary
  primary: {
    main: "#7D6167",
    light: "#A08389", // เพิ่มเอง (สีอ่อนกว่า)
    dark: "#5A464B", // เพิ่มเอง (สีเข้มกว่า)
    hover: "#6A5258", // ✅ hover color
    contrastText: "#FFFFFF",
  },

  // Secondary
  secondary: {
    main: "#F5F5F7",
    light: "#FFFFFF",
    dark: "#E0E0E2",
    hover: "#EAEAEC", // ✅ hover color
    contrastText: "#1A1A1A",
  },

  // Background
  background: {
    default: "#C4A48A", // Warm tan
    paper: "#FFFFFF",
    subtle: "#F8F8FA", // สำหรับ section (เช่น login form)
  },

  // Text
  text: {
    primary: "#1A1A1A",
    secondary: "#6B6B6B",
    disabled: "#9E9E9E",
  },

  // Status Colors (แนะนำให้เพิ่ม)
  success: {
    main: "#4CAF50",
    light: "#81C784",
    dark: "#388E3C",
    hover: "#43A047", // ✅ hover color
    contrastText: "#FFFFFF",
  },

  error: {
    main: "#F44336",
    light: "#E57373",
    dark: "#D32F2F",
    hover: "#E53935", // ✅ hover color
    contrastText: "#FFFFFF",
  },

  warning: {
    main: "#FF9800",
    light: "#FFB74D",
    dark: "#F57C00",
    hover: "#FB8C00", // ✅ hover color
    contrastText: "#1A1A1A",
  },

  info: {
    main: "#2196F3",
    light: "#64B5F6",
    dark: "#1976D2",
    hover: "#1E88E5", // ✅ hover color
    contrastText: "#FFFFFF",
  },

  // Common
  common: {
    white: "#FFFFFF",
    black: "#000000",
  },

  // Divider
  divider: "rgba(0, 0, 0, 0.12)",

  // Action (สำหรับ hover, disabled states)
  action: {
    hover: "rgba(0, 0, 0, 0.04)",
    selected: "rgba(0, 0, 0, 0.08)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
  },

  logo: {
    light: "#57240F",
    dark: "#C4893E",
  },
} as const;

export type Colors = typeof colors;
