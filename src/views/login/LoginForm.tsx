"use client";

import type React from "react";

import { useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import SocialLoginButtons from "./SocialLoginButtons";
import { colors } from "@/configs/colorConfig";
import Image from "next/image";
import {
  MoveRightIcon,
  MoveRightIconHandle,
} from "@/components/shared/motion-icons/MoveRightIcon";
import { CornerUpRightIcon } from "@/components/shared/motion-icons/CornerUpRightIcon";
import { useRouter } from "next/navigation";
import { useAlert } from "@/components/alert";
import { useThemeMode } from "@/contexts/ThemeContext";
import useDarkMode from "@/hooks/useDarkMode";

// TODO: Root Function
const LoginForm = () => {
  const router = useRouter();

  const { showAlert } = useAlert();

  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const moveRightIconRef = useRef<MoveRightIconHandle>(null);

  const handleMoveRightHover = () => {
    setIsHovered(true);
    moveRightIconRef.current?.startAnimation();
  };

  const handleMoveRightLeave = () => {
    setIsHovered(false);
    moveRightIconRef.current?.stopAnimation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log({ email });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {/* Header */}
      <LoginHeader />

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* FIXME: Sign In Button */}
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              bgcolor: colors.primary.hover,
            },
            "& .move-right-icon": {
              animation: "slideIn 0.5s ease-out forwards",
            },
            "@keyframes slideIn": {
              "0%": {
                opacity: 0,
                transform: "translateX(-10px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
          }}
          onMouseEnter={handleMoveRightHover}
          onMouseLeave={handleMoveRightLeave}
        >
          <Box
            component="span"
            sx={{
              fontSize: { xs: 15, md: 20 },
            }}
          >
            SUPALAI SINGLE SIGN ON
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: isHovered ? "24px" : "0px",
              opacity: isHovered ? 1 : 0,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {isHovered && (
              <MoveRightIcon ref={moveRightIconRef} className="move-right-icon" />
            )}
          </Box>
        </Button>

        {/* FIXME: Login AD for UAT */}
        <Box sx={{ mt: 1 }}>
          <Typography>Username (UAT & TEST)</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={() => {
                showAlert({
                  title: "เข้าสู่ระบบสำเร็จ",
                  timer: 1500,
                  type: "success",
                  showConfirmButton: false,
                  onConfirm: () => {
                    router.push("/home");
                  },
                });
              }}
            >
              <CornerUpRightIcon />
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        {/* FIXME: Divider */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2" color="text.secondary">
            About Us
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>

        {/* FIXME: Social Login Buttons */}
        <SocialLoginButtons />
      </Box>
    </Box>
  );
};

// FIXME: Sub Function
const LoginHeader = () => {
  const isDarkMode = useDarkMode()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 80, md: 100 },
          color: isDarkMode ? colors.logo.dark : colors.logo.light,
          marginBottom: { xs: -5, md: -6 },
        }}
        className="font-psl-kittithada"
      >
        SUPALAI
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Image
            src={"/icons/hammer.png"}
            alt="maintain-icon"
            width={30}
            height={20}
          />
        </Box>

        {/* Subtitle */}
        <Typography
          sx={{ fontSize: { xs: 15, md: 20 }, color: "text.secondary" }}
          className="font-bold"
        >
          ระบบวางเงินประกันต่อเติมบ้าน
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
