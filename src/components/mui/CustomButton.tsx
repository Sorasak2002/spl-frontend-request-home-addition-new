import React from "react";
import { Button, ButtonProps, SxProps, Theme, CircularProgress } from "@mui/material";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/configs/colorConfig";

interface CustomButtonProps extends Omit<ButtonProps, "sx"> {
    sx?: SxProps<Theme>;
    loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    children,
    sx,
    loading = false,
    disabled,
    startIcon,
    ...props
}) => {
    const isDarkMode = useDarkMode()
    return (
        <Button
            {...props}
            disabled={disabled || loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
            sx={{
                position: "relative",
                backgroundColor: isDarkMode ? colors.primary.dark : colors.primary.main,
                "&:hover": {
                    backgroundColor: colors.primary.hover,
                },
                textTransform: "none",
                ...sx,
            }}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
