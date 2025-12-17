"use client";

import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";

const images = [
  "/images/supalai-icon.jpg",
  "/images/supalai-2.webp",
  "/images/supalai-3.jpg",
  "/images/supalai-4.jpg",
  "/images/supalai-5.jpg",
  "/images/supalai-7.webp",
];

// Transition effects
const transitions = [
  "fade",
  "slideLeft",
  "slideRight",
  "slideUp",
  "slideDown",
  "zoom",
  "rotate",
  "flip",
];

const getRandomTransition = () => {
  return transitions[Math.floor(Math.random() * transitions.length)];
};

const ImagePanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTransition, setCurrentTransition] = useState("fade");

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransition(getRandomTransition());
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentTransition(getRandomTransition());
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTransition(getRandomTransition());
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getTransitionStyles = (isActive: boolean) => {
    const baseStyles = {
      position: "absolute" as const,
      inset: 0,
      transition: "all 1s ease-in-out",
    };

    switch (currentTransition) {
      case "fade":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 1 : 0,
        };
      case "slideLeft":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateX(0)" : "translateX(100%)",
          zIndex: isActive ? 1 : 0,
        };
      case "slideRight":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateX(0)" : "translateX(-100%)",
          zIndex: isActive ? 1 : 0,
        };
      case "slideUp":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(100%)",
          zIndex: isActive ? 1 : 0,
        };
      case "slideDown":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-100%)",
          zIndex: isActive ? 1 : 0,
        };
      case "zoom":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(0.8)",
          zIndex: isActive ? 1 : 0,
        };
      case "rotate":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive
            ? "rotate(0deg) scale(1)"
            : "rotate(90deg) scale(0.8)",
          zIndex: isActive ? 1 : 0,
        };
      case "flip":
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "rotateY(0deg)" : "rotateY(90deg)",
          transformStyle: "preserve-3d" as const,
          zIndex: isActive ? 1 : 0,
        };

      default:
        return {
          ...baseStyles,
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 1 : 0,
        };
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: 500,
      }}
    >
      {/* Carousel Images */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          perspective: "1000px",
          overflow: "hidden",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={image}
            sx={{
              ...getTransitionStyles(currentIndex === index),
              overflow: "hidden",
            }}
          >
            <Image
              src={image}
              alt={`Supalai slide ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Box>
        ))}
      </Box>

      {/* Content Overlay */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 4,
          background: "linear-gradient(transparent, rgba(0,0,0,0.3))",
        }}
      >
        {/* Tagline */}
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 500,
            textAlign: "center",
            mb: 2,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          SUPALAI PUBLIC COMPANY LIMITED
        </Typography>

        {/* Navigation Arrows */}
        <Stack direction="row" justifyContent="center" spacing={1}>
          <IconButton
            onClick={handlePrevious}
            aria-label="Previous slide"
            sx={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.5)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            aria-label="Next slide"
            sx={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.5)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default ImagePanel;
