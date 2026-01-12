import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckIcon from "@mui/icons-material/Check";
import { FC } from "react";

type Props = {
  steps: string[];
  onStepClick: (step: number) => void;
  activeStep: number;
};

// FIXME: Sub Function
const MobileStepper: FC<Props> = ({ steps, onStepClick, activeStep }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box sx={{ display: { xs: "block", md: "none" }, px: 2, py: 2 }}>
      {/* Progress indicator */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <IconButton onClick={() => router.push("/document-list")} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: theme.palette.primary.main, mb: 0.5 }}
        >
          ขั้นตอนที่ {activeStep + 1} จาก {steps.length}
        </Typography>
      </Box>

      {/* Compact step list */}
      <Box
        sx={{
          maxHeight: 300,
          overflowY: "auto",
          pr: 1,
          scrollbarWidth: "thin",
          scrollbarColor: `${
            theme.palette.mode === "dark" ? "#444 #2A2A2A" : "#D0D0D0 #F5F5F5"
          }`,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor:
              theme.palette.mode === "dark" ? "#2A2A2A" : "#F5F5F5",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.mode === "dark" ? "#444" : "#D0D0D0",
            borderRadius: 3,
          },
        }}
      >
        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const isClickable = index <= activeStep;

          return (
            <Box
              key={index}
              onClick={() => isClickable && onStepClick(index)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive
                  ? theme.palette.mode === "dark"
                    ? "rgba(176, 145, 151, 0.15)"
                    : "rgba(125, 97, 103, 0.1)"
                  : "transparent",
                border: `2px solid ${
                  isActive ? theme.palette.primary.main : "transparent"
                }`,
                cursor: isClickable ? "pointer" : "default",
                opacity: isActive || isCompleted ? 1 : 0.6,
                transition: "all 0.3s ease",
                "&:hover": isClickable
                  ? {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(176, 145, 151, 0.12)"
                          : "rgba(125, 97, 103, 0.08)",
                    }
                  : {},
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    isActive || isCompleted
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                  color:
                    isActive || isCompleted
                      ? "#fff"
                      : theme.palette.text.disabled,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
              >
                {isCompleted ? (
                  <CheckIcon sx={{ fontSize: "1.1rem" }} />
                ) : (
                  index + 1
                )}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                  color: isActive
                    ? theme.palette.primary.main
                    : isCompleted
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  fontSize: "0.9rem",
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MobileStepper;
