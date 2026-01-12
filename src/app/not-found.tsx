"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HouseIcon } from "@/components/shared/motion-icons/HouseIcon";
import { colors } from "@/configs/colorConfig";
import { CornerUpLeftIcon } from "@/components/shared/motion-icons/CornerUpLeftIcon";
import { useThemeMode } from "@/contexts/ThemeContext";

interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

const NotFoundPage = ({
  title = "Page not found",
  subtitle = "Sorry, we couldn't find the page you're looking for.",
  buttonText = "Back to Home",
}: NotFoundPageProps) => {
  const { mode } = useThemeMode();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "secondary.main",
        px: 3,
        py: 6,
      }}
    >
      {/* 404 Large Typography */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "8rem", sm: "12rem", md: "16rem" },
            fontWeight: 800,
            color: "primary.main",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          4
        </Typography>

        {/* Decorative Circle for "0" */}
        <Box
          sx={{
            width: { xs: 100, sm: 150, md: 200 },
            height: { xs: 100, sm: 150, md: 200 },
            borderRadius: "50%",
            border: "8px solid",
            borderColor: "primary.main",
            mx: { xs: 1, sm: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 100 100"
            sx={{
              width: "65%",
              height: "65%",
            }}
          >
            {/* Left Eyebrow - natural curve */}
            <path
              d="M 20 28 Q 30 22, 40 26"
              fill="none"
              stroke={
                mode === "dark" ? colors.primary.light : colors.primary.main
              }
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Right Eyebrow - natural curve */}
            <path
              d="M 60 26 Q 70 22, 80 28"
              fill="none"
              stroke={
                mode === "dark" ? colors.primary.light : colors.primary.main
              }
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Left Eye */}
            <circle
              cx="30"
              cy="42"
              r="6"
              fill={
                mode === "dark" ? colors.primary.light : colors.primary.main
              }
            />

            {/* Right Eye */}
            <circle
              cx="70"
              cy="42"
              r="6"
              fill={
                mode === "dark" ? colors.primary.light : colors.primary.main
              }
            />

            {/* Sad Mouth - natural frown curve */}
            <path
              d="M 28 72 Q 50 55, 72 72"
              fill="none"
              stroke={
                mode === "dark" ? colors.primary.light : colors.primary.main
              }
              strokeWidth="5"
              strokeLinecap="round"
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "8rem", sm: "12rem", md: "16rem" },
            fontWeight: 800,
            color: "primary.main",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            userSelect: "none",
          }}
        >
          4
        </Typography>
      </Box>

      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          mb: 1.5,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        {subtitle}
      </Typography>

      <Box className="flex gap-2">
        {/* Back Button */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CornerUpLeftIcon />}
          onClick={handleBack}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Back
        </Button>

        {/* Home Button */}
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HouseIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
            }}
          >
            {buttonText}
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
