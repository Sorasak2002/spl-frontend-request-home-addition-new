/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  Box,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter, usePathname } from "next/navigation";
import { useThemeMode } from "@/contexts/ThemeContext";
import { NAVIGATION_MENU_ITEMS } from "@/data/navigation";
import { createAlert, useAlert } from "../alert";

// ==================== Constants ====================
const MAX_VISIBLE_MENU_ITEMS = 3; // จำนวนเมนูหลักที่แสดงใน bottom nav (ไม่นับ More และ Profile)

const MobileBottomNavigation = () => {
  // ==================== Hooks ====================
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode } = useThemeMode();
  const { showAlert } = useAlert();

  // ==================== States ====================
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<null | HTMLElement>(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<typeof NAVIGATION_MENU_ITEMS[0] | null>(null);

  // ==================== Computed Values ====================
  const visibleMenuItems = NAVIGATION_MENU_ITEMS.slice(0, MAX_VISIBLE_MENU_ITEMS);
  const moreMenuItems = NAVIGATION_MENU_ITEMS.slice(MAX_VISIBLE_MENU_ITEMS);

  const getCurrentIndex = () => {
    // Check visible menu items
    const mainIndex = visibleMenuItems.findIndex(
      (item) => item.path === pathname
    );
    if (mainIndex !== -1) return mainIndex;

    // Check if current path is in more menu items
    const isInMoreMenu = moreMenuItems.some(
      (item) =>
        item.path === pathname ||
        item.subItems?.some((subItem) => subItem.path === pathname)
    );
    if (isInMoreMenu) return MAX_VISIBLE_MENU_ITEMS; // Index of "More" button

    // Check sub menu items in visible items
    const subMenuIndex = visibleMenuItems.findIndex((item) =>
      item.subItems?.some((subItem) => subItem.path === pathname)
    );
    return subMenuIndex;
  };

  const currentIndex = getCurrentIndex();

  const getThemeIcon = () => {
    switch (mode) {
      case "light":
        return <LightModeIcon fontSize="small" />;
      case "dark":
        return <DarkModeIcon fontSize="small" />;
      default:
        return <SettingsBrightnessIcon fontSize="small" />;
    }
  };

  const getThemeLabel = () => {
    switch (mode) {
      case "light":
        return "Light Mode";
      case "dark":
        return "Dark Mode";
      default:
        return "System";
    }
  };

  // ==================== Navigation Handlers ====================
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleNavigationClick = (item: typeof NAVIGATION_MENU_ITEMS[0]) => {
    if (item.subItems && item.subItems.length > 0) {
      // Open submenu for items with subitems
      setSelectedMenuItem(item);
    } else {
      // Direct navigation for items without subitems
      handleNavigation(item.path);
    }
  };

  // ==================== Profile Menu Handlers ====================
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  // ==================== Theme Menu Handlers ====================
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

  // ==================== SubMenu Handlers ====================
  const handleSubMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSubMenuAnchor(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchor(null);
    setSelectedMenuItem(null);
  };

  const handleSubMenuItemClick = (path: string) => {
    handleNavigation(path);
    handleSubMenuClose();
  };

  // ==================== More Menu Handlers ====================
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleMoreMenuItemClick = (
    item: typeof NAVIGATION_MENU_ITEMS[0],
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (item.subItems && item.subItems.length > 0) {
      // Open submenu for items with subitems
      // Use the More button as anchor instead of the menu item
      const moreButton = document.querySelector('[data-more-button="true"]') as HTMLElement;
      setSelectedMenuItem(item);
      setSubMenuAnchor(moreButton || event.currentTarget);
      handleMoreMenuClose();
    } else {
      // Direct navigation for items without subitems
      handleNavigation(item.path);
      handleMoreMenuClose();
    }
  };

  // ==================== Logout Handler ====================
  const handleLogout = () => {
    handleProfileMenuClose();
    showAlert(
      createAlert.confirm(
        "ออกจากระบบหรือไม่ ?",
        undefined,
        () => {
          router.push("/login");
        },
        () => { }
      )
    );
  };

  // ==================== Effects ====================
  useEffect(() => {
    if (selectedMenuItem && selectedMenuItem.subItems) {
      const menuButton = document.querySelector(
        `[data-menu-item="${selectedMenuItem.text}"]`
      ) as HTMLElement;
      if (menuButton) {
        setSubMenuAnchor(menuButton);
      }
    }
  }, [selectedMenuItem]);

  // ==================== Render ====================
  return (
    <>
      {/* ==================== Bottom Navigation ==================== */}
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
            if (newValue < visibleMenuItems.length) {
              handleNavigationClick(visibleMenuItems[newValue]);
            }
          }}
          showLabels
          sx={{
            height: 64,
            "& .MuiBottomNavigationAction-root": {
              color: "text.secondary",
              transition: "all 0.2s ease-in-out",
              "&.Mui-selected": {
                color: "primary.main",
                transform: "scale(1.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            },
          }}
        >
          {visibleMenuItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.text}
              icon={
                <Box
                  data-menu-item={item.text}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
              }
            />
          ))}
          {moreMenuItems.length > 0 && (
            <BottomNavigationAction
              label="More"
              icon={
                <Box data-more-button="true">
                  <MoreHorizIcon />
                </Box>
              }
              onClick={handleMoreMenuOpen}
            />
          )}
          <BottomNavigationAction
            label="Profile"
            icon={
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: "primary.main",
                  fontSize: "0.875rem",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                J
              </Avatar>
            }
            onClick={handleProfileClick}
          />
        </BottomNavigation>
      </Paper>

      {/* ==================== SubMenu ==================== */}
      <Menu
        anchorEl={subMenuAnchor}
        open={Boolean(subMenuAnchor && selectedMenuItem)}
        onClose={handleSubMenuClose}
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
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              mb: 1,
              maxHeight: 400,
              overflowY: "auto",
            },
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 200,
            mb: 1,
            maxHeight: 400,
          },
        }}
      >
        {selectedMenuItem?.subItems?.map((subItem) => (
          <MenuItem
            key={subItem.path}
            onClick={() => handleSubMenuItemClick(subItem.path)}
            selected={pathname === subItem.path}
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            <ListItemIcon>{subItem.icon}</ListItemIcon>
            <ListItemText>{subItem.text}</ListItemText>
            {pathname === subItem.path && (
              <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
            )}
          </MenuItem>
        ))}
      </Menu>

      {/* ==================== More Menu ==================== */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
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
            maxHeight: 400,
          },
        }}
      >
        {moreMenuItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={(event) => handleMoreMenuItemClick(item, event)}
            selected={
              pathname === item.path ||
              item.subItems?.some((subItem) => subItem.path === pathname)
            }
            sx={{
              transition: "all 0.2s ease-in-out",
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
            {item.subItems && item.subItems.length > 0 && (
              <ChevronRightIcon
                fontSize="small"
                sx={{ ml: 2, color: "text.secondary" }}
              />
            )}
            {pathname === item.path && (
              <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
            )}
          </MenuItem>
        ))}
      </Menu>

      {/* ==================== Profile Menu ==================== */}
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
        <MenuItem
          onClick={handleThemeMenuOpen}
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          <ListItemIcon>{getThemeIcon()}</ListItemIcon>
          <ListItemText>{getThemeLabel()}</ListItemText>
          <ChevronRightIcon
            fontSize="small"
            sx={{ ml: 2, color: "text.secondary" }}
          />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
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

      {/* ==================== Theme Menu ==================== */}
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
        <MenuItem
          onClick={() => handleThemeChange("light")}
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
          {mode === "light" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("dark")}
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
          {mode === "dark" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("system")}
          sx={{
            transition: "all 0.2s ease-in-out",
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
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
