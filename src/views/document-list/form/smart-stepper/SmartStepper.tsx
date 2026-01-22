"use client";

import React, { useRef, useEffect, useState, FC } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  IconButton,
  Chip,
  Button,
  Tooltip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MobileStepper from "./MobileStepper";
import {
  stepperLabelSx,
  stepperScrollContainerSx,
} from "./SmartStepper.styles";

// Sub Component
const StepCircle = styled(Box, {
  // 1. เพิ่ม config นี้เพื่อ "กรอง" props ที่ไม่ต้องการให้หลุดไปถึง DOM (HTML)
  shouldForwardProp: (prop) =>
    prop !== "active" && prop !== "completed" && prop !== "clickable",
})<{
  active?: boolean;
  completed?: boolean;
  clickable?: boolean;
}>(({ theme, active, completed, clickable }) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  fontWeight: 700,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: clickable ? "pointer" : "default",
  position: "relative",
  zIndex: 2,
  flexShrink: 0,
  border: `3px solid ${active || completed
    ? theme.palette.primary.main
    : theme.palette.mode === "dark"
      ? "#444"
      : "#D0D0D0"
    }`,
  backgroundColor:
    active || completed
      ? theme.palette.primary.main
      : theme.palette.mode === "dark"
        ? "#2A2A2A"
        : "#FFFFFF",
  color:
    active || completed
      ? "#fff"
      : theme.palette.mode === "dark"
        ? "#999"
        : "#666",
  ...(active && {
    boxShadow: `0 4px 16px 0 ${theme.palette.mode === "dark"
      ? "rgba(176, 145, 151, 0.5)"
      : "rgba(125, 97, 103, 0.5)"
      }, 0 0 0 4px ${theme.palette.mode === "dark"
        ? "rgba(176, 145, 151, 0.1)"
        : "rgba(125, 97, 103, 0.1)"
      }`,
    transform: "scale(1.08)",
  }),
  ...(completed && {
    boxShadow: `0 2px 8px 0 ${theme.palette.mode === "dark"
      ? "rgba(176, 145, 151, 0.25)"
      : "rgba(125, 97, 103, 0.25)"
      }`,
  }),
  "&:hover": clickable
    ? {
      transform: active
        ? "scale(1.12)"
        : completed
          ? "scale(1.06)"
          : "scale(1.03)",
      boxShadow: `0 4px 20px 0 ${theme.palette.mode === "dark"
        ? "rgba(176, 145, 151, 0.4)"
        : "rgba(125, 97, 103, 0.4)"
        }`,
      borderColor: theme.palette.primary.main,
    }
    : {},
}));

// Sub Component
const StepConnectorLine = styled(Box, {
  // เพิ่มส่วนนี้เพื่อกรอง prop 'active' ออกครับ
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ theme, active }) => ({
  height: 3,
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.mode === "dark"
      ? "#2A2A2A"
      : "#D0D0D0",
  transition: "background-color 0.4s ease",
  flexGrow: 1,
  minWidth: 40,
  margin: "0 -3px",
  zIndex: 1,
}));

type Props = {
  steps: string[];
  activeStep: number;
  onStepClick: (step: number) => void;
};

const SmartStepper: FC<Props> = ({ steps, activeStep, onStepClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current && !isMobile) {
      const container = scrollContainerRef.current;
      const activeElement = container.querySelector(
        `[data-step="${activeStep}"]`
      ) as HTMLElement;
      if (activeElement) {
        const containerWidth = container.clientWidth;
        const elementLeft = activeElement.offsetLeft;
        const elementWidth = activeElement.clientWidth;
        const scrollPosition =
          elementLeft - containerWidth / 2 + elementWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
    checkScrollPosition();
  }, [activeStep, isMobile]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box>
      {/* Desktop/Tablet Horizontal Scrollable Stepper */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          position: "relative",
          gap: 2,
        }}
      >
        {/* FIXME: Total steps indicator */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/document-list")}
            size="small"
            color="inherit"
            startIcon={<ArrowBackIosIcon />}
          >
            กลับ
          </Button>
          <Chip
            label={`ขั้นตอน ${activeStep + 1} / ${steps.length}`}
            sx={{
              fontWeight: 600,
              fontSize: "0.85rem",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* FIXME: Scrollable container */}
        <Box
          sx={{
            px: 3,
          }}
        >
          <Box
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            sx={stepperScrollContainerSx({ theme })}
          >
            {steps.map((label, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const isClickable = index <= activeStep;

              return (
                <React.Fragment key={index}>
                  {/* FIXME: Left scroll button */}
                  {canScrollLeft && (
                    <IconButton
                      onClick={() => scroll("left")}
                      size="small"
                      sx={{
                        position: "absolute",
                        left: 1,
                        zIndex: 10,
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  )}

                  {/* step content */}
                  <Tooltip title={label} placement="bottom" arrow>
                    <Box
                      data-step={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 100,
                        px: 1,
                      }}
                    >
                      <StepCircle
                        active={isActive}
                        completed={isCompleted}
                        //clickable={} //isClickable
                        onClick={() => onStepClick(index)} // isClickable && 
                      >
                        {isCompleted ? (
                          <CheckIcon sx={{ fontSize: "1.3rem" }} />
                        ) : (
                          index + 1
                        )}
                      </StepCircle>

                      <Typography
                        variant="body2"
                        sx={stepperLabelSx({ theme, isActive, isCompleted })}
                        noWrap
                      >
                        {label}
                      </Typography>
                    </Box>
                  </Tooltip>
                  {/* Right scroll button */}
                  {canScrollRight && (
                    <IconButton
                      onClick={() => scroll("right")}
                      size="small"
                      sx={{
                        position: "absolute",
                        right: 1,
                        zIndex: 10,
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  )}
                  {index < steps.length - 1 && (
                    <StepConnectorLine active={index < activeStep} />
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* FIXME: Mobile Vertical Stepper - Compact View */}
      <MobileStepper
        activeStep={activeStep}
        onStepClick={onStepClick}
        steps={steps}
      />
    </Box>
  );
};

export default SmartStepper;
