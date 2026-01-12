import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

export interface SubMenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export interface NavigationMenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  subItems?: SubMenuItem[];
}

export const NAVIGATION_MENU_ITEMS: NavigationMenuItem[] = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Documents", icon: <DescriptionIcon />, path: "/document-list" },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
    subItems: [
      {
        path: "/settings/objective-of-addition",
        icon: <MapsHomeWorkIcon />,
        text: "ความประสงค์ที่ต้องการจะต่อเติม",
      },
    ],
  },
];

export const SIDEBAR_WIDTH_OPEN = 260;
export const SIDEBAR_WIDTH_CLOSED = 72;
