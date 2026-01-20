"use client";;
import { useEffect, useState } from "react";
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
  Collapse,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { createAlert, useAlert } from "../alert";
import { colors } from "@/configs/colorConfig";
import { useThemeMode } from "@/contexts/ThemeContext";
import UserProfile from "./UserProfile";
import { MenuIcon } from "../shared/motion-icons/MenuIcon";
import { ChevronLeftIcon } from "../shared/motion-icons/ChevronLeft";
import {
  NAVIGATION_MENU_ITEMS,
  SIDEBAR_WIDTH_CLOSED,
  SIDEBAR_WIDTH_OPEN,
} from "@/data/navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useDarkMode from "@/hooks/useDarkMode";

type SidebarProps = {
  open?: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ open: controlledOpen, onToggle }: SidebarProps) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { mode } = useThemeMode();
  const pathname = usePathname();
  const [internalOpen, setInternalOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<{
    [key: string]: boolean;
  }>({});

  const isDarkMode = useDarkMode()

  // Use controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleToggle =
    onToggle !== undefined ? onToggle : () => setInternalOpen(!internalOpen);

  const handleNavigation = (path: string) => {
    router.push(path);

    // ถ้ามีการเลือก page ตรงเมนูถ้าไม่ได้เลือก sub เมนูให้ปิดเมนูแบบ auto
    const targetItem = NAVIGATION_MENU_ITEMS.find((item) => item.path === path);
    if (targetItem && !targetItem.subItems) {
      setExpandedMenus({});
    }
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

  useEffect(() => {
    NAVIGATION_MENU_ITEMS.forEach((item) => {
      if (item.subItems) {
        const isSubItemActive = item.subItems.some(
          (subItem) => pathname === subItem.path
        );
        if (isSubItemActive) {
          setExpandedMenus((prev) => ({
            ...prev,
            [item.text]: true,
          }));
        }
      }
    });
  }, [pathname]);

  const handleMenuToggle = (menuText: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuText]: !prev[menuText],
    }));
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
              color: isDarkMode ? colors.logo.dark : colors.logo.light,
            }}
            variant="h1"
            className="font-psl-kittithada"
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
        {NAVIGATION_MENU_ITEMS.map((item) => {
          // มี sub menu หรือป่าว
          const isSubItemActive = item.subItems
            ? item.subItems.some((subItem) => pathname === subItem.path)
            : false;

          // เป็น page ที่ถูกเลือกหรือป่าว
          const isCurrentPageActive = pathname === item.path;

          return (
            <Box key={item.text}>
              {/* FIXME: root menu session */}
              <Tooltip title={!isOpen ? item.text : ""} placement="right">
                <ListItem disablePadding sx={{ px: 1, mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      if (item.subItems) {
                        if (isOpen) {
                          handleMenuToggle(item.text);
                        } else {
                          handleToggle();
                          setTimeout(() => handleMenuToggle(item.text), 100);
                        }
                      } else {
                        handleNavigation(item.path);
                      }
                    }}
                    selected={pathname === item.path}
                    sx={{
                      borderRadius: 1,
                      minHeight: 48,
                      justifyContent: isOpen ? "initial" : "center",
                      px: 2.5,
                      transition: (theme) =>
                        theme.transitions.create(
                          ["background-color", "color"],
                          {
                            duration: theme.transitions.duration.shorter,
                          }
                        ),
                      ...(isSubItemActive &&
                        !isCurrentPageActive && {
                        backgroundColor: () =>
                          isDarkMode
                            ? "rgba(125, 97, 103, 0.15)"
                            : "rgba(125, 97, 103, 0.08)",
                      }),
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                      "&.Mui-selected": {
                        backgroundColor: isDarkMode ? colors.primary.dark : colors.primary.main,
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: colors.primary.hover,
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
                        color:
                          pathname === item.path ? "inherit" : "primary.main",
                        // isCurrentPageActive || isSubItemActive
                        //   ? "inherit"
                        //   : "primary.main",
                        transition: (theme) =>
                          theme.transitions.create("color", {
                            duration: theme.transitions.duration.shorter,
                          }),
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color:
                              pathname === item.path
                                ? "inherit"
                                : "primary.main",
                          }}
                          sx={{
                            "& .MuiTypography-root": {
                              transition: (theme) =>
                                theme.transitions.create("color", {
                                  duration: theme.transitions.duration.shorter,
                                }),
                            },
                          }}
                        />
                        {/* FIXME: เพิ่ม arrow icon กรณีมี sub menu */}
                        {item.subItems &&
                          (expandedMenus[item.text] ? (
                            <KeyboardArrowDownIcon
                              sx={{
                                fontSize: 20,
                                color:
                                  pathname === item.path
                                    ? "inherit"
                                    : "primary.main",
                                transition: (theme) =>
                                  theme.transitions.create(
                                    ["transform", "opacity"],
                                    {
                                      duration:
                                        theme.transitions.duration.shorter,
                                    }
                                  ),
                              }}
                            />
                          ) : (
                            <KeyboardArrowRightIcon
                              sx={{
                                fontSize: 20,
                                color:
                                  pathname === item.path
                                    ? "inherit"
                                    : "primary.main",
                                transition: (theme) =>
                                  theme.transitions.create(
                                    ["transform", "opacity"],
                                    {
                                      duration:
                                        theme.transitions.duration.shorter,
                                    }
                                  ),
                              }}
                            />
                          ))}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>

              {/* FIXME: sub menu session */}
              {item.subItems && isOpen && (
                <Collapse
                  in={expandedMenus[item.text]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        disablePadding
                        sx={{ px: 0.8, mb: 0.5 }}
                      >
                        <ListItemButton
                          onClick={() => handleNavigation(subItem.path)}
                          selected={pathname === subItem.path}
                          sx={{
                            borderRadius: 1,
                            minHeight: 40,
                            pl: 4,
                            transition: (theme) =>
                              theme.transitions.create(
                                ["background-color", "color", "transform"],
                                {
                                  duration: theme.transitions.duration.shorter,
                                }
                              ),
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                            "&.Mui-selected": {
                              backgroundColor: "primary.light",
                              color: "primary.contrastText",
                              "&:hover": {
                                backgroundColor: "primary.main",
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
                              mr: 2,
                              justifyContent: "center",
                              color:
                                pathname === subItem.path
                                  ? "inherit"
                                  : "primary.main",
                              transition: (theme) =>
                                theme.transitions.create("color", {
                                  duration: theme.transitions.duration.shorter,
                                }),
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.text}
                            primaryTypographyProps={{
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              color:
                                pathname === item.path
                                  ? "inherit"
                                  : "primary.main",
                            }}
                            sx={{
                              "& .MuiTypography-root": {
                                transition: (theme) =>
                                  theme.transitions.create("color", {
                                    duration:
                                      theme.transitions.duration.shorter,
                                  }),
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>

      <Divider />

      {/* FIXME:  User Profile Section */}
      <UserProfile handleLogout={handleLogout} isOpen={isOpen} />
      {mode.toString()}
    </Drawer>
  );
};

export default Sidebar;
