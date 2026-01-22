import { Theme, alpha, SxProps } from "@mui/material";

export const getMainBoxStyle = (
    theme: Theme,
    isDragActive: boolean,
    disabled: boolean,
    hasFiles: boolean,
    isMaxFiles: boolean,
    minHeight: string
): SxProps<Theme> => ({
    border: `2px dashed ${isDragActive
        ? theme.palette.primary.main
        : alpha(theme.palette.primary.main, 0.5)
        }`,
    borderRadius: 2,
    backgroundColor: isDragActive
        ? alpha(theme.palette.primary.main, 0.05)
        : alpha(theme.palette.primary.main, 0.02),
    padding: 4,
    textAlign: "center",
    cursor: hasFiles
        ? "default"
        : disabled || isMaxFiles
            ? "not-allowed"
            : "pointer",
    transition: "all 0.3s ease",
    minHeight: hasFiles ? "auto" : minHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.6 : 1,
    "&:hover": {
        backgroundColor: hasFiles
            ? alpha(theme.palette.primary.main, 0.02)
            : disabled || isMaxFiles
                ? alpha(theme.palette.primary.main, 0.02)
                : alpha(theme.palette.primary.main, 0.08),
        borderColor: hasFiles
            ? alpha(theme.palette.primary.main, 0.5)
            : disabled || isMaxFiles
                ? alpha(theme.palette.primary.main, 0.5)
                : theme.palette.primary.main,
    },
});

export const getAddFileBoxStyle = (
    theme: Theme,
    height: number | string
): SxProps<Theme> => ({
    height: "100%",
    minHeight: {
        xs: 250,
        md: typeof height === "number" ? height + 135 : 315,
    },
    border: `2px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
    borderRadius: 1,
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        borderColor: theme.palette.primary.main,
    },
});
