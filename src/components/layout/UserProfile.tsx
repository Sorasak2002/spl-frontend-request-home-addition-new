/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { FC, useRef, useState } from "react";
import {
  LogoutIcon,
  LogoutIconHandle,
} from "../shared/motion-icons/LogoutIcon";
import { useThemeMode } from "@/contexts/ThemeContext";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { SunIcon, SunIconHandle } from "../shared/motion-icons/SunIcon";
import { MoonIcon, MoonIconHandle } from "../shared/motion-icons/MoonIcon";
import { BoltIcon, BoltIconHandle } from "../shared/motion-icons/BoltIcon";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

type Props = {
  isOpen: boolean;
  handleLogout: () => void;
};

const UserProfile: FC<Props> = ({ isOpen, handleLogout }) => {
  const { mode, setMode } = useThemeMode();

  const [profileMenuAnchor, setProfileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  // Mock user data - replace with actual user data
  const user: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    setMode(newMode);
    setThemeMenuAnchor(null);
    setProfileMenuAnchor(null);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const getThemeLabel = () => {
    if (mode === "light") return "Light Mode";
    if (mode === "dark") return "Dark Mode";
    return "System";
  };

  const getThemeIcon = () => {
    if (mode === "light") return <SunIcon ref={sunIconRef} />;
    if (mode === "dark") return <MoonIcon ref={moonIconRef} />;
    return <BoltIcon ref={boltIconRef} />;
  };
  /* #region FIXME: icon ref */
  const logoutIconRef = useRef<LogoutIconHandle>(null);
  const sunIconRef = useRef<SunIconHandle>(null);
  const moonIconRef = useRef<MoonIconHandle>(null);
  const boltIconRef = useRef<BoltIconHandle>(null);
  const sunSubIconRef = useRef<SunIconHandle>(null);
  const moonSubIconRef = useRef<MoonIconHandle>(null);
  const boltSubIconRef = useRef<BoltIconHandle>(null);

  const handleLogoutHover = () => {
    logoutIconRef.current?.startAnimation();
  };

  const handleLogoutLeave = () => {
    logoutIconRef.current?.stopAnimation();
  };

  const handleSunHover = () => {
    sunIconRef.current?.startAnimation();
  };

  const handleSunLeave = () => {
    sunIconRef.current?.stopAnimation();
  };

  const handleMoonHover = () => {
    moonIconRef.current?.startAnimation();
  };

  const handleMoonLeave = () => {
    moonIconRef.current?.stopAnimation();
  };

  const handleBoltHover = () => {
    boltIconRef.current?.startAnimation();
  };

  const handleBoltLeave = () => {
    boltIconRef.current?.stopAnimation();
  };

  const handleSunSubHover = () => {
    sunSubIconRef.current?.startAnimation();
  };

  const handleSunSubLeave = () => {
    sunSubIconRef.current?.stopAnimation();
  };

  const handleMoonSubHover = () => {
    moonSubIconRef.current?.startAnimation();
  };

  const handleMoonSubLeave = () => {
    moonSubIconRef.current?.stopAnimation();
  };

  const handleBoltSubHover = () => {
    boltSubIconRef.current?.startAnimation();
  };

  const handleBoltSubLeave = () => {
    boltSubIconRef.current?.stopAnimation();
  };
  /* #endregion */

  return (
    <Box sx={{ p: 2 }}>
      {isOpen ? (
        <Box
          onClick={handleProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "action.hover",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "action.selected",
            },
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "primary.main",
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Tooltip title={user.name} placement="right">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton onClick={handleProfileClick}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "primary.main",
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Box>
        </Tooltip>
      )}

      {/* logout button */}
      <LogoutButton
        getThemeIcon={getThemeIcon}
        getThemeLabel={getThemeLabel}
        handleBoltHover={handleBoltHover}
        handleBoltLeave={handleBoltLeave}
        handleLogout={handleLogout}
        handleLogoutHover={handleLogoutHover}
        handleLogoutLeave={handleLogoutLeave}
        handleMoonHover={handleMoonHover}
        handleMoonLeave={handleMoonLeave}
        handleProfileMenuClose={handleProfileMenuClose}
        handleSunHover={handleSunHover}
        handleSunLeave={handleSunLeave}
        handleThemeMenuOpen={handleThemeMenuOpen}
        logoutIconRef={logoutIconRef}
        mode={mode}
        profileMenuAnchor={profileMenuAnchor}
      />

      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange("light")}
          onMouseEnter={handleSunSubHover}
          onMouseLeave={handleSunSubLeave}
        >
          <ListItemIcon>
            <SunIcon size={20} ref={sunSubIconRef} />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
          {mode === "light" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("dark")}
          onMouseEnter={handleMoonSubHover}
          onMouseLeave={handleMoonSubLeave}
        >
          <ListItemIcon>
            <MoonIcon size={20} ref={moonSubIconRef} />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
          {mode === "dark" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleThemeChange("system")}
          onMouseEnter={handleBoltSubHover}
          onMouseLeave={handleBoltSubLeave}
        >
          <ListItemIcon>
            <BoltIcon size={20} ref={boltSubIconRef} />
          </ListItemIcon>
          <ListItemText>System</ListItemText>
          {mode === "system" && (
            <CheckIcon fontSize="small" sx={{ ml: 1, color: "primary.main" }} />
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
};

// FIXME: Sub Function
const LogoutButton = ({
  mode,
  getThemeLabel,
  handleProfileMenuClose,
  handleThemeMenuOpen,
  profileMenuAnchor,
  handleBoltHover,
  handleMoonHover,
  handleSunHover,
  handleBoltLeave,
  handleMoonLeave,
  handleSunLeave,
  getThemeIcon,
  handleLogout,
  handleLogoutHover,
  handleLogoutLeave,
  logoutIconRef,
}: {
  profileMenuAnchor: HTMLElement | null;
  getThemeLabel: () => "Light Mode" | "Dark Mode" | "System";
  handleThemeMenuOpen: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleProfileMenuClose: () => void;
  mode: any;
  handleMoonHover: () => void;
  handleSunHover: () => void;
  handleBoltHover: () => void;
  handleMoonLeave: () => void;
  handleSunLeave: () => void;
  handleBoltLeave: () => void;
  getThemeIcon: () => any;
  logoutIconRef: React.RefObject<LogoutIconHandle | null>;
  handleLogout: () => void;
  handleLogoutHover: () => void;
  handleLogoutLeave: () => void;
}) => {
  return (
    <Menu
      anchorEl={profileMenuAnchor}
      open={Boolean(profileMenuAnchor)}
      onClose={handleProfileMenuClose}
      autoFocus={false}
      disableAutoFocusItem
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPaper-root": {
          minWidth: 200,
          mt: -1,
        },
      }}
    >
      <MenuItem
        onClick={handleThemeMenuOpen}
        defaultChecked={false}
        selected={false}
        onMouseEnter={() =>
          mode === "dark"
            ? handleMoonHover()
            : mode === "light"
              ? handleSunHover()
              : handleBoltHover()
        }
        onMouseLeave={() =>
          mode === "dark"
            ? handleMoonLeave()
            : mode === "light"
              ? handleSunLeave()
              : handleBoltLeave()
        }
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
        onMouseEnter={handleLogoutHover}
        onMouseLeave={handleLogoutLeave}
      >
        <ListItemIcon
          sx={{
            color: "error.main",
          }}
        >
          <LogoutIcon size={20} ref={logoutIconRef} isAnimated />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            color: "error.main",
          }}
        >
          Logout
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default UserProfile;
