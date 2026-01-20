"use client";

import type React from "react";
import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  Tooltip,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import { createAlert, useAlert } from "../alert";
import { colors } from "@/configs/colorConfig";
import { useThemeMode } from "@/contexts/ThemeContext";
import UserProfile from "./UserProfile";
import { MenuIcon } from "../shared/motion-icons/MenuIcon";
import { ChevronLeftIcon } from "../shared/motion-icons/ChevronLeft";
import { NAVIGATION_MENU_ITEMS } from "@/data/navigation";

type SidebarProps = {
  open?: boolean;
  onToggle?: () => void;
};

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const SIDEBAR_WIDTH_OPEN = 260;
const SIDEBAR_WIDTH_CLOSED = 72;

const menuItems: MenuItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar = ({ open: controlledOpen, onToggle }: SidebarProps) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { mode } = useThemeMode();
  const pathname = usePathname();
  const [internalOpen, setInternalOpen] = useState(true);

  // Use controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleToggle =
    onToggle !== undefined ? onToggle : () => setInternalOpen(!internalOpen);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    showAlert(
      createAlert.confirm(
        "ออกจากระบบหรือไม่ ?",
        undefined,
        () => {
          router.push("/");
        },
        () => { }
      )
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        "& .MuiDrawer-paper": {
          width: isOpen ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      {/* FIXME: Header with toggle button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          px: 2,
          py: 1,
          minHeight: 64,
        }}
      >
        {isOpen && (
          <Typography
            sx={{
              fontSize: 40,
              color: mode === "dark" ? colors.logo.dark : colors.logo.light,
            }}
            className="font-psl-kittithada "
          >
            SUPALAI
          </Typography>
        )}
        <IconButton onClick={handleToggle} sx={{ color: "text.secondary" }}>
          {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Divider />

      {/* FIXME: Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {NAVIGATION_MENU_ITEMS.map((item) => (
          <Tooltip
            key={item.text}
            title={!isOpen ? item.text : ""}
            placement="right"
          >
            <ListItem disablePadding sx={{ px: 1, mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={pathname === item.path}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: isOpen ? "initial" : "center",
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.contrastText",
                    },
                    "& .MuiListItemText-primary": {
                      color: "primary.contrastText",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 2 : "auto",
                    justifyContent: "center",
                    color: pathname === item.path ? "inherit" : "primary.main",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "text.primary",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider />

      {/* FIXME:  User Profile Section */}
      <UserProfile handleLogout={handleLogout} isOpen={isOpen} />
    </Drawer>
  );
};

export default Sidebar;
