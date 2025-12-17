"use client";

import type React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Fade,
  Zoom,
} from "@mui/material";
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  HelpOutline,
} from "@mui/icons-material";
import type { AlertType } from "./alert-context";
import { useEffect } from "react";

interface CustomAlertProps {
  open: boolean;
  type: AlertType;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  buttonClassName?: string;
  timer?: number;
  showConfirmButton?: boolean;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    color: "#4CAF50",
  },
  error: {
    icon: Error,
    color: "#F44336",
  },
  warning: {
    icon: Warning,
    color: "#FF9800",
  },
  info: {
    icon: Info,
    color: "#2196F3",
  },
  confirm: {
    icon: HelpOutline,
    color: "#7D6167",
  },
};

const iconAnimations = {
  success: `
    @keyframes successPulse {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    @keyframes successCheck {
      0% { transform: scale(0) rotate(-45deg); }
      50% { transform: scale(1.2) rotate(0deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
  `,
  error: `
    @keyframes errorShake {
      0%, 100% { transform: translateX(0) scale(1); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) scale(1.05); }
      20%, 40%, 60%, 80% { transform: translateX(4px) scale(1.05); }
    }
    @keyframes errorPulse {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  warning: `
    @keyframes warningBounce {
      0% { transform: translateY(-100px) scale(0); opacity: 0; }
      60% { transform: translateY(10px) scale(1.1); opacity: 1; }
      80% { transform: translateY(-5px) scale(0.95); }
      100% { transform: translateY(0) scale(1); }
    }
  `,
  info: `
    @keyframes infoRotate {
      0% { transform: scale(0) rotate(-180deg); opacity: 0; }
      50% { transform: scale(1.1) rotate(10deg); opacity: 1; }
      100% { transform: scale(1) rotate(0deg); }
    }
  `,
  confirm: `
    @keyframes confirmScale {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); opacity: 0.8; }
      70% { transform: scale(0.9); opacity: 1; }
      100% { transform: scale(1); }
    }
  `,
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  open,
  type,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancelButton = type === "confirm",
  onConfirm,
  onCancel,
  onClose,
  className,
  iconClassName,
  titleClassName,
  messageClassName,
  buttonClassName,
  timer,
  showConfirmButton = true,
}) => {
  const config = alertConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    if (open && timer && timer > 0) {
      const timeoutId = setTimeout(() => {
        onConfirm();
      }, timer);

      return () => clearTimeout(timeoutId);
    }
  }, [open, timer, onConfirm]);

  return (
    <>
      <style>{iconAnimations[type]}</style>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Zoom}
        transitionDuration={300}
        className={className}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: showConfirmButton || showCancelButton ? 2 : 3,
            minHeight: showConfirmButton || showCancelButton ? "auto" : "2rem",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            paddingBottom: showConfirmButton || showCancelButton ? 0 : 2,
          }}
        >
          {/* Icon */}
          <Fade in={open} timeout={600}>
            <Box
              className={iconClassName}
              sx={{
                width: showConfirmButton || showCancelButton ? 80 : 100,
                height: showConfirmButton || showCancelButton ? 80 : 100,
                borderRadius: "50%",
                backgroundColor: `${config.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
                animation: open
                  ? type === "success"
                    ? "successPulse 0.5s ease-out"
                    : type === "error"
                    ? "errorPulse 0.5s ease-out, errorShake 0.5s ease-out 0.5s"
                    : type === "warning"
                    ? "warningBounce 0.6s ease-out"
                    : type === "info"
                    ? "infoRotate 0.6s ease-out"
                    : "confirmScale 0.6s ease-out"
                  : "none",
              }}
            >
              <IconComponent
                sx={{
                  fontSize: showConfirmButton || showCancelButton ? 48 : 60,
                  color: config.color,
                  animation:
                    open && type === "success"
                      ? "successCheck 0.6s ease-out 0.3s both"
                      : "none",
                }}
              />
            </Box>
          </Fade>

          {/* Title */}
          <Fade in={open} timeout={700}>
            <DialogTitle
              className={titleClassName}
              sx={{
                padding: 0,
                textAlign: "center",
                fontSize:
                  showConfirmButton || showCancelButton ? "1.5rem" : "1.75rem",
                fontWeight: 600,
              }}
            >
              {title}
            </DialogTitle>
          </Fade>

          {/* Message */}
          {message && (
            <Fade in={open} timeout={800}>
              <DialogContent
                className={messageClassName}
                sx={{
                  padding: 0,
                  textAlign: "center",
                  paddingX: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#6B6B6B",
                    lineHeight: 1.6,
                    fontSize:
                      showConfirmButton || showCancelButton
                        ? "1rem"
                        : "1.125rem",
                  }}
                >
                  {message}
                </Typography>
              </DialogContent>
            </Fade>
          )}

          {/* Actions */}
          {(showConfirmButton || showCancelButton) && (
            <Fade in={open} timeout={900}>
              <DialogActions
                sx={{
                  padding: 0,
                  width: "100%",
                  gap: 1,
                  marginTop: 2,
                  marginBottom: 1,
                }}
              >
                {showCancelButton && (
                  <Button
                    onClick={onCancel}
                    variant="outlined"
                    fullWidth
                    className={buttonClassName}
                    sx={{
                      borderColor: "#E0E0E0",
                      // color: "#6B6B6B",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        // borderColor: "#BDBDBD",
                        // backgroundColor: "#F5F5F5",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {cancelText}
                  </Button>
                )}
                {showConfirmButton && (
                  <Button
                    onClick={onConfirm}
                    variant="contained"
                    fullWidth
                    className={buttonClassName}
                    sx={{
                      backgroundColor: config.color,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        backgroundColor: config.color,
                        opacity: 0.9,
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    {confirmText}
                  </Button>
                )}
              </DialogActions>
            </Fade>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default CustomAlert;
