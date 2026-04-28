import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import piagamLogo from "../assets/logo-piagam (1).svg";

const FontStyle = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`}</style>
);

const drawerWidth = 280;
const collapsedWidth = 72;

const SIDEBAR_BG = "#233971";
const AI_WORKSPACE_COLOR = "#233971";

const menuItems = [
  {
    label: "Gallery",
    path: "/",
    icon: <PhotoLibraryRoundedIcon />,
  },
  {
    label: "Image Editor",
    path: "/image-editor",
    icon: <AutoAwesomeRoundedIcon />,
  },
];

function SidebarContent({ onNavigate, collapsed = false }) {
  const location = useLocation();
  const F = { fontFamily: "'Sora',sans-serif" };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: SIDEBAR_BG,
        color: "#fff",
        borderRight: "1px solid rgba(191,219,254,0.12)",
        ...F,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: collapsed ? 1.5 : 2.8,
          height: 68,
          minHeight: 68,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          transition: "all 0.25s ease",
          borderBottom: "1px solid rgba(191,219,254,0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 1.4,
          }}
        >
          {/* Logo mark */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(191,219,254,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={piagamLogo}
              alt="logo"
              sx={{
                width: 38,
                height: 38,
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(101%)",
              }}
            />
          </Box>

          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  ...F,
                  fontWeight: 800,
                  fontSize: 15.5,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: "#fff",
                }}
              >
                AI Image Generator
              </Typography>
              <Typography
                sx={{
                  ...F,
                  mt: 0.35,
                  fontSize: "0.72rem",
                  color: "rgba(191,219,254,0.55)",
                  letterSpacing: "0.03em",
                  fontWeight: 500,
                }}
              >
                Creative Workspace
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* NAV LABEL */}
      {!collapsed && (
        <Typography
          variant="caption"
          sx={{
            ...F,
            px: 3,
            pt: 1.8,
            pb: 0.5,
            color: "rgba(148,163,184,0.45)",
            letterSpacing: "1.4px",
            fontSize: "0.65rem",
            display: "block",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Navigation
        </Typography>
      )}

      {/* MENU */}
      <Box
        sx={{
          px: collapsed ? 1 : 1.5,
          py: 1,
          flex: 1,
          transition: "all 0.25s ease",
        }}
      >
        <List sx={{ mt: 0, p: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            const menuButton = (
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={onNavigate}
                sx={{
                  minHeight: 50,
                  px: collapsed ? 1.25 : 2,
                  borderRadius: "12px",
                  justifyContent: collapsed ? "center" : "initial",
                  background: isActive
                    ? "linear-gradient(90deg, rgba(191,219,254,0.24) 0%, rgba(147,197,253,0.10) 100%)"
                    : "transparent",
                  boxShadow: isActive
                    ? "inset 0 0 0 1px rgba(191,219,254,0.28)"
                    : "none",
                  color: isActive ? "#fff" : "rgba(148,163,184,0.55)",
                  transition: "all 0.18s ease",
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "#bfdbfe" : "rgba(148,163,184,0.55)",
                    minWidth: collapsed ? "unset" : 42,
                    transition: "color 0.18s",
                    "& svg": { fontSize: collapsed ? 26 : 22 },
                  },
                  "& .MuiListItemText-primary": {
                    fontSize: 14.5,
                    fontWeight: isActive ? 700 : 600,
                    fontFamily: "'Sora',sans-serif",
                    letterSpacing: "-0.1px",
                    color: isActive ? "#fff" : "rgba(148,163,184,0.55)",
                  },
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(90deg, rgba(191,219,254,0.28) 0%, rgba(147,197,253,0.14) 100%)"
                      : "rgba(255,255,255,0.09)",
                    color: "#f8fafc",
                    "& .MuiListItemIcon-root": {
                      color: "#bfdbfe",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            );

            return collapsed ? (
              <Tooltip title={item.label} placement="right" key={item.path}>
                <Box>{menuButton}</Box>
              </Tooltip>
            ) : (
              <Box key={item.path}>{menuButton}</Box>
            );
          })}
        </List>
      </Box>

      {/* FOOTER CARD */}
      {!collapsed && (
        <Box sx={{ mx: 2, mb: 2.5 }}>
          <Box
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(191,219,254,0.14)",
            }}
          >
            <Typography
              sx={{
                ...F,
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.82)",
                mb: 0.5,
                letterSpacing: "0.02em",
              }}
            >
              Creative Workspace
            </Typography>
            <Typography
              sx={{
                ...F,
                fontSize: "0.71rem",
                color: "rgba(191,219,254,0.62)",
                lineHeight: 1.65,
              }}
            >
              Kelola hasil generate dan edit gambar AI dalam satu panel yang konsisten.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function Layout({
  children,
  pageTitle = "Gallery",
  pageSubtitle = "Manage your generated images",
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const desktopDrawerWidth = collapsed ? collapsedWidth : drawerWidth;
  const F = { fontFamily: "'Sora',sans-serif" };

  const handleMobileToggle = () => setMobileOpen((prev) => !prev);
  const handleDesktopToggle = () => setCollapsed((prev) => !prev);
  const handleCloseMobileDrawer = () => setMobileOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6fb",
        ...F,
      }}
    >
      <FontStyle />
      <CssBaseline />

      {/* APP BAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${desktopDrawerWidth}px)` },
          ml: { lg: `${desktopDrawerWidth}px` },
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(226,232,240,0.45)",
          color: "#0f172a",
          boxShadow: "0 1px 12px rgba(15,23,42,0.04)",
          transition: "all 0.25s ease",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "68px !important",
            px: { xs: 2, md: 3.5 },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Mobile menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileToggle}
            sx={{
              display: { xs: "inline-flex", lg: "none" },
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid rgba(15,23,42,0.09)",
              background: "#fff",
              color: "#475569",
              "&:hover": { background: "#f8fafc" },
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Desktop collapse */}
          <IconButton
            color="inherit"
            onClick={handleDesktopToggle}
            sx={{
              display: { xs: "none", lg: "inline-flex" },
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid rgba(15,23,42,0.09)",
              background: "#fff",
              color: "#475569",
              "&:hover": {
                background: "#f1f5f9",
                borderColor: "rgba(22,38,63,0.3)",
                color: "#16263f",
              },
              transition: "all 0.18s ease",
            }}
          >
            {collapsed ? (
              <MenuIcon sx={{ fontSize: 20 }} />
            ) : (
              <MenuOpenRoundedIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>

          {/* Title block */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                ...F,
                fontSize: { xs: "1.3rem", md: "1.55rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                color: "#0f172a",
              }}
            >
              {pageTitle}
            </Typography>
            <Typography
              sx={{
                ...F,
                mt: 0.3,
                color: "#94a3b8",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {pageSubtitle}
            </Typography>
          </Box>

          {/* Back to Pilar — mobile: icon only, desktop: icon + label */}
          <Box
            component="a"
            href="https://pilargroup.id"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.7,
              px: { xs: 1.1, md: 1.6 },
              py: { xs: 0.85, md: 0.78 },
              borderRadius: "12px",
              background: "rgba(35,57,113,0.06)",
              border: "1.5px solid rgba(35,57,113,0.18)",
              color: "#233971",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.18s ease",
              flexShrink: 0,
              "&:hover": {
                background: "rgba(35,57,113,0.12)",
                borderColor: "rgba(35,57,113,0.38)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(35,57,113,0.12)",
              },
              "&:active": {
                transform: "translateY(0px)",
                boxShadow: "none",
              },
            }}
          >
            <ArrowBackRoundedIcon
              sx={{
                fontSize: { xs: 17, md: 16 },
                color: "#233971",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                ...F,
                display: { xs: "none", sm: "block" },
                color: "#233971",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Back to Pilar
            </Typography>
          </Box>

          {/* AI Workspace Badge */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.8,
              px: 1.7,
              py: 0.78,
              borderRadius: "12px",
              bgcolor: `${AI_WORKSPACE_COLOR} !important`,
              background: `${AI_WORKSPACE_COLOR} !important`,
              backgroundColor: `${AI_WORKSPACE_COLOR} !important`,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "none",
            }}
          >
            <BoltRoundedIcon sx={{ color: "#ffffff", fontSize: 18 }} />
            <Typography
              sx={{
                ...F,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.01em",
              }}
            >
              AI Workspace
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR NAV */}
      <Box
        component="nav"
        sx={{
          width: { lg: desktopDrawerWidth },
          flexShrink: { lg: 0 },
          transition: "all 0.25s ease",
        }}
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxSizing: "border-box",
              background: "transparent",
            },
            "& .MuiBackdrop-root": {
              bgcolor: "rgba(6,14,36,0.55)",
              backdropFilter: "blur(3px)",
            },
          }}
        >
          <SidebarContent onNavigate={handleCloseMobileDrawer} collapsed={false} />
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              width: desktopDrawerWidth,
              border: "none",
              overflowX: "hidden",
              boxSizing: "border-box",
              transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
              background: "transparent",
              boxShadow: "10px 0 40px rgba(6,14,36,0.24)",
            },
          }}
        >
          <SidebarContent collapsed={collapsed} />
        </Drawer>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${desktopDrawerWidth}px)` },
          transition: "all 0.25s ease",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Toolbar sx={{ minHeight: "68px !important" }} />

        <Box sx={{ p: { xs: 2, md: 3.5 }, flex: 1 }}>
          {children}
        </Box>

        {/* PAGE FOOTER */}
        <Box
          component="footer"
          sx={{
            px: { xs: 2, md: 3.5 },
            py: 2,
            borderTop: "1px solid rgba(226,232,240,0.7)",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.2,
          }}
        >
          <Typography
            sx={{
              ...F,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#64748b",
              letterSpacing: "0.01em",
            }}
          >
            AI Image Generator
          </Typography>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#16263f",
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              ...F,
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "0.01em",
            }}
          >
            PT Pilar Niaga Makmur
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
