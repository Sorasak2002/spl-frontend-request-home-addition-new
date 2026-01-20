import { useTheme } from "@mui/material";

const useDarkMode = (): boolean => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    return isDark
}

export default useDarkMode