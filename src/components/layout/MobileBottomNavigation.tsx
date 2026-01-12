"use client";

import type React from "react";

import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter, usePathname } from "next/navigation";
import { useThemeMode } from "@/contexts/ThemeContext";
import { NAVIGATION_MENU_ITEMS } from "@/data/navigation";

const MobileBottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode } = useThemeMode();
  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const currentIndex = NAVIGATION_MENU_ITEMS.findIndex(
    (item) => item.path === pathname
  );

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    setMode(newMode);
    setThemeMenuAnchor(null);
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setProfileMenuAnchor(null);
  };

  const getThemeIcon = () => {
    if (mode === "light") return <LightModeIcon fontSize="small" />;
    if (mode === "dark") return <DarkModeIcon fontSize="small" />;
    return <SettingsBrightnessIcon fontSize="small" />;
  };

  const getThemeLabel = () => {
    if (mode === "light") return "Light Mode";
    if (mode === "dark") return "Dark Mode";
    return "System";
  };

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={currentIndex}
          onChange={(_, newValue) => {
            if (newValue < NAVIGATION_MENU_ITEMS.length) {
              handleNavigation(NAVIGATION_MENU_ITEMS[newValue].path);
            }
          }}
          showLabels
          sx={{
            height: 64,
            "& .MuiBottomNavigationAction-root": {
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
        >
          {NAVIGATION_MENU_ITEMS.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.text}
              icon={item.icon}
            />
          ))}
          <BottomNavigationAction
            label="Profile"
            icon={
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                J
              </Avatar>
            }
            onClick={handleProfileClick}
          />
        </BottomNavigation>
      </Paper>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        autoFocus={false}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 200,
            mb: 1,
          },
        }}
      >
        <MenuItem onClick={handleThemeMenuOpen}>
          <ListItemIcon>{getThemeIcon()}</ListItemIcon>
          <ListItemText>{getThemeLabel()}</ListItemText>
          <ChevronRightIcon
            fontSize="small"
            sx={{ ml: 2, color: "text.secondary" }}
          />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: "#d32f2f",
            }}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Theme Menu */}
      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        autoFocus={false}
        disableAutoFocusItem
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 180,
            mb: 1,
          },
        }}
      >
        <MenuItem onClick={() => handleThemeChange("light")}>
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
          {mode === "light" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")}>
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
          {mode === "dark" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("system")}>
          <ListItemIcon>
            <SettingsBrightnessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
          {mode === "system" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileBottomNavigation;
