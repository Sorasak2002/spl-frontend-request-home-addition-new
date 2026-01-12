import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

export const stepperScrollContainerSx = ({
  theme,
}: {
  theme: Theme;
}): SxProps<Theme> => {
  return {
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin",
    minHeight: "6rem",
    scrollbarColor: `${
      theme.palette.mode === "dark" ? "#444 #2A2A2A" : "#D0D0D0 #F5F5F5"
    }`,
    "&::-webkit-scrollbar": {
      height: 6,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.mode === "dark" ? "#2A2A2A" : "#F5F5F5",
      borderRadius: 3,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#444" : "#D0D0D0",
      borderRadius: 3,
    },
  };
};

export const stepperLabelSx = ({
  theme,
  isActive,
  isCompleted,
}: {
  theme: Theme;
  isActive: boolean;
  isCompleted: boolean;
}): SxProps<Theme> => {
  return {
    mt: 1.5,
    fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
    color: isActive
      ? theme.palette.primary.main
      : isCompleted
      ? theme.palette.primary.main
      : theme.palette.text.secondary,
    transition: "all 0.3s ease",
    textAlign: "center",
    fontSize: "0.85rem",
    lineHeight: 1.3,
    maxWidth: 90,
    opacity: isActive ? 1 : isCompleted ? 0.85 : 0.65,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};
