import React from "react";
import {
    IconButton,
    IconButtonProps,
    SxProps,
    Theme,
    CircularProgress,
} from "@mui/material";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/configs/colorConfig";

interface CustomIconButtonProps extends Omit<IconButtonProps, "sx"> {
    sx?: SxProps<Theme>;
    loading?: boolean;
}

export const CustomIconButton: React.FC<CustomIconButtonProps> = ({
    children,
    sx,
    loading = false,
    disabled,
    ...props
}) => {
    const isDarkMode = useDarkMode()
    return (
        <IconButton
            {...props}
            className={`${props.className} btn-hover-scale`}
            disabled={disabled || loading}
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
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </IconButton>
    );
};

export default CustomIconButton;
