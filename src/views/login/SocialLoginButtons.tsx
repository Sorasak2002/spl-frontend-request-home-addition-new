"use client";

import { Stack, IconButton, Box } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";

// Social button configuration
const socialButtons = [
  {
    icon: Google,
    label: "Google",
    color: "#DB4437",
    url: "https://www.supalai.com/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    color: "#1877F2",
    url: "https://www.facebook.com/supalaiplc/?locale=th_TH",
  },
];

export default function SocialLoginButtons() {
  const handleSocialLogin = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      {socialButtons.map((button) => (
        <IconButton
          key={button.label}
          onClick={() => handleSocialLogin(button.url)}
          aria-label={`Sign in with ${button.label}`}
          sx={{
            width: 56,
            height: 56,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            // bgcolor: "#FFFFFF",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              // bgcolor: "#F5F5F5",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Box
            component={button.icon}
            sx={{
              color: button.color,
              fontSize: 24,
            }}
          />
        </IconButton>
      ))}
    </Stack>
  );
}
