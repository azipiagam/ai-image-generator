import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography, Tooltip, Avatar, Menu, MenuItem, Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import piagamLogo from "../assets/piagam.png";
import { useAuth } from "../auth/AuthContext";

const FontStyle = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');`}</style>
);

const drawerWidth   = 280;
const collapsedWidth = 72;
const SIDEBAR_BG    = "#233971";
const AI_WORKSPACE_COLOR = "#233971";

const menuItems = [
  { label: "Gallery",      path: "/",             icon: <PhotoLibraryRoundedIcon /> },
  { label: "Image Editor", path: "/image-editor", icon: <AutoAwesomeRoundedIcon /> },
];

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
}

function SidebarContent({ onNavigate, collapsed = false }) {
  const location = useLocation();
  const F = { fontFamily: "'Sora',sans-serif" };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", background: SIDEBAR_BG, color: "#fff", borderRight: "1px solid rgba(191,219,254,0.12)", ...F }}>
      {/* Header */}
      <Box sx={{ px: collapsed ? 1.5 : 2.8, height: 68, minHeight: 68, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", transition: "all 0.25s ease", borderBottom: "1px solid rgba(191,219,254,0.12)" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", gap: 1.4 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "14px", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(191,219,254,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
            <Box component="img" src={piagamLogo} alt="logo" sx={{ width: 38, height: 38, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(101%)" }} />
          </Box>
          {!collapsed && (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ ...F, fontWeight: 800, fontSize: 15.5, letterSpacing: "-0.01em", lineHeight: 1.2, color: "#fff" }}>AI Image Generator</Typography>
              <Typography sx={{ ...F, mt: 0.35, fontSize: "0.72rem", color: "rgba(191,219,254,0.55)", letterSpacing: "0.03em", fontWeight: 500 }}>Creative Workspace</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Nav label */}
      {!collapsed && (
        <Typography variant="caption" sx={{ ...F, px: 3, pt: 1.8, pb: 0.5, color: "rgba(148,163,184,0.45)", letterSpacing: "1.4px", fontSize: "0.65rem", display: "block", fontWeight: 700, textTransform: "uppercase" }}>
          Navigation
        </Typography>
      )}

      {/* Menu */}
      <Box sx={{ px: collapsed ? 1 : 1.5, py: 1, flex: 1, transition: "all 0.25s ease" }}>
        <List sx={{ mt: 0, p: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const btn = (
              <ListItemButton
                component={RouterLink} to={item.path} onClick={onNavigate}
                sx={{ minHeight: 50, px: collapsed ? 1.25 : 2, borderRadius: "12px", justifyContent: collapsed ? "center" : "initial", background: isActive ? "linear-gradient(90deg, rgba(191,219,254,0.24) 0%, rgba(147,197,253,0.10) 100%)" : "transparent", boxShadow: isActive ? "inset 0 0 0 1px rgba(191,219,254,0.28)" : "none", color: isActive ? "#fff" : "rgba(148,163,184,0.55)", transition: "all 0.18s ease", "& .MuiListItemIcon-root": { color: isActive ? "#bfdbfe" : "rgba(148,163,184,0.55)", minWidth: collapsed ? "unset" : 42, transition: "color 0.18s", "& svg": { fontSize: collapsed ? 26 : 22 } }, "& .MuiListItemText-primary": { fontSize: 14.5, fontWeight: isActive ? 700 : 600, fontFamily: "'Sora',sans-serif", letterSpacing: "-0.1px", color: isActive ? "#fff" : "rgba(148,163,184,0.55)" }, "&:hover": { background: isActive ? "linear-gradient(90deg, rgba(191,219,254,0.28) 0%, rgba(147,197,253,0.14) 100%)" : "rgba(255,255,255,0.09)", color: "#f8fafc", "& .MuiListItemIcon-root": { color: "#bfdbfe" } } }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            );
            return collapsed ? (
              <Tooltip title={item.label} placement="right" key={item.path}><Box>{btn}</Box></Tooltip>
            ) : (
              <Box key={item.path}>{btn}</Box>
            );
          })}
        </List>
      </Box>

      {/* Footer card */}
      {!collapsed && (
        <Box sx={{ mx: 2, mb: 2.5 }}>
          <Box sx={{ px: 1.75, py: 1.25, borderRadius: "12px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(191,219,254,0.14)" }}>
            <Typography sx={{ ...F, fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.82)", mb: 0.5, letterSpacing: "0.02em" }}>Creative Workspace</Typography>
            <Typography sx={{ ...F, fontSize: "0.71rem", color: "rgba(191,219,254,0.62)", lineHeight: 1.65 }}>
              Kelola hasil generate dan edit gambar AI dalam satu panel yang konsisten.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function Layout({ children, pageTitle = "Gallery", pageSubtitle = "Manage your generated images" }) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [collapsed, setCollapsed]     = useState(false);
  const [anchorEl, setAnchorEl]       = useState(null);
  const { user, logout }              = useAuth();

  const desktopDrawerWidth = collapsed ? collapsedWidth : drawerWidth;
  const F = { fontFamily: "'Sora',sans-serif" };

  const handleOpenUserMenu  = (e) => setAnchorEl(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    window.location.href = "https://pilargroup.id";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f4f6fb", ...F }}>
      <FontStyle />
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" elevation={0} sx={{ width: { lg: `calc(100% - ${desktopDrawerWidth}px)` }, ml: { lg: `${desktopDrawerWidth}px` }, background: "rgba(255,255,255,0.82)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(226,232,240,0.45)", color: "#0f172a", boxShadow: "0 1px 12px rgba(15,23,42,0.04)", transition: "all 0.25s ease" }}>
        <Toolbar sx={{ minHeight: "68px !important", px: { xs: 2, md: 3.5 }, display: "flex", alignItems: "center", gap: 1.5 }}>

          {/* Mobile menu */}
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen((p) => !p)} sx={{ display: { xs: "inline-flex", lg: "none" }, width: 38, height: 38, borderRadius: "10px", border: "1px solid rgba(15,23,42,0.09)", background: "#fff", color: "#475569" }}>
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* Desktop collapse */}
          <IconButton color="inherit" onClick={() => setCollapsed((p) => !p)} sx={{ display: { xs: "none", lg: "inline-flex" }, width: 38, height: 38, borderRadius: "10px", border: "1px solid rgba(15,23,42,0.09)", background: "#fff", color: "#475569", "&:hover": { background: "#f1f5f9", borderColor: "rgba(22,38,63,0.3)", color: "#16263f" }, transition: "all 0.18s ease" }}>
            {collapsed ? <MenuIcon sx={{ fontSize: 20 }} /> : <MenuOpenRoundedIcon sx={{ fontSize: 20 }} />}
          </IconButton>

          {/* Title */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ ...F, fontSize: { xs: "1.3rem", md: "1.55rem" }, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "#0f172a" }}>{pageTitle}</Typography>
            <Typography sx={{ ...F, mt: 0.3, color: "#94a3b8", fontSize: "0.8rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pageSubtitle}</Typography>
          </Box>

          {/* Back to Pilar */}
          <Box component="a" href="https://pilargroup.id" target="_blank" rel="noopener noreferrer" sx={{ display: "flex", alignItems: "center", gap: 0.7, px: { xs: 1.1, md: 1.6 }, py: { xs: 0.85, md: 0.78 }, borderRadius: "12px", background: "rgba(35,57,113,0.06)", border: "1.5px solid rgba(35,57,113,0.18)", color: "#233971", textDecoration: "none", cursor: "pointer", transition: "all 0.18s ease", flexShrink: 0, "&:hover": { background: "rgba(35,57,113,0.12)", borderColor: "rgba(35,57,113,0.38)", transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(35,57,113,0.12)" } }}>
            <ArrowBackRoundedIcon sx={{ fontSize: { xs: 17, md: 16 }, color: "#233971", flexShrink: 0 }} />
            <Typography sx={{ ...F, display: { xs: "none", sm: "block" }, color: "#233971", fontWeight: 700, fontSize: "0.78rem", whiteSpace: "nowrap" }}>Back to Pilar</Typography>
          </Box>

          {/* AI Workspace badge */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.8, px: 1.7, py: 0.78, borderRadius: "12px", bgcolor: `${AI_WORKSPACE_COLOR} !important`, background: `${AI_WORKSPACE_COLOR} !important`, border: "1px solid rgba(255,255,255,0.06)" }}>
            <BoltRoundedIcon sx={{ color: "#ffffff", fontSize: 18 }} />
            <Typography sx={{ ...F, color: "#ffffff", fontWeight: 700, fontSize: "0.78rem" }}>AI Workspace</Typography>
          </Box>

          {/* User avatar + menu */}
          {user && (
            <>
              <Tooltip title={user.name || user.username}>
                <Avatar
                  onClick={handleOpenUserMenu}
                  sx={{ width: 36, height: 36, cursor: "pointer", bgcolor: "#233971", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.8rem", border: "2px solid rgba(35,57,113,0.2)", transition: "all 0.18s ease", "&:hover": { borderColor: "#233971", boxShadow: "0 0 0 3px rgba(35,57,113,0.12)" } }}
                >
                  {getInitials(user.name || user.username)}
                </Avatar>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                PaperProps={{ elevation: 0, sx: { mt: 1, minWidth: 200, borderRadius: "14px", border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 8px 32px rgba(15,23,42,0.10)", overflow: "visible" } }}
              >
                {/* User info */}
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography sx={{ ...F, fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>{user.name}</Typography>
                  <Typography sx={{ ...F, fontSize: "0.73rem", color: "#64748b", mt: 0.2 }}>{user.department || user.job_position || user.username}</Typography>
                </Box>
                <Divider sx={{ borderColor: "rgba(226,232,240,0.7)" }} />
                <MenuItem onClick={handleCloseUserMenu} disableRipple sx={{ gap: 1.5, px: 2, py: 1, color: "#475569", fontSize: "0.84rem", fontFamily: "'Sora',sans-serif", "&:hover": { background: "rgba(14,60,110,0.04)" } }}>
                  <PersonRoundedIcon sx={{ fontSize: 18 }} />
                  Profil
                </MenuItem>
                <MenuItem onClick={handleLogout} disableRipple sx={{ gap: 1.5, px: 2, py: 1, color: "#DC2626", fontSize: "0.84rem", fontFamily: "'Sora',sans-serif", "&:hover": { background: "rgba(220,38,38,0.05)" } }}>
                  <LogoutRoundedIcon sx={{ fontSize: 18 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar nav */}
      <Box component="nav" sx={{ width: { lg: desktopDrawerWidth }, flexShrink: { lg: 0 }, transition: "all 0.25s ease" }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: "block", lg: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, border: "none", boxSizing: "border-box", background: "transparent" }, "& .MuiBackdrop-root": { bgcolor: "rgba(6,14,36,0.55)", backdropFilter: "blur(3px)" } }}>
          <SidebarContent onNavigate={() => setMobileOpen(false)} collapsed={false} />
        </Drawer>
        <Drawer variant="permanent" open sx={{ display: { xs: "none", lg: "block" }, "& .MuiDrawer-paper": { width: desktopDrawerWidth, border: "none", overflowX: "hidden", boxSizing: "border-box", transition: "width 0.25s cubic-bezier(.4,0,.2,1)", background: "transparent", boxShadow: "10px 0 40px rgba(6,14,36,0.24)" } }}>
          <SidebarContent collapsed={collapsed} />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, width: { lg: `calc(100% - ${desktopDrawerWidth}px)` }, transition: "all 0.25s ease", minWidth: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Toolbar sx={{ minHeight: "68px !important" }} />
        <Box sx={{ p: { xs: 2, md: 3.5 }, flex: 1 }}>{children}</Box>
        <Box component="footer" sx={{ px: { xs: 2, md: 3.5 }, py: 2, borderTop: "1px solid rgba(226,232,240,0.7)", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", gap: 1.2 }}>
          <Typography sx={{ ...F, fontSize: "0.75rem", fontWeight: 600, color: "#64748b" }}>AI Image Generator</Typography>
          <Box sx={{ width: 5, height: 5, borderRadius: "50%", background: "#16263f", flexShrink: 0 }} />
          <Typography sx={{ ...F, fontSize: "0.72rem", fontWeight: 500, color: "#94a3b8" }}>PT Pilar Niaga Makmur</Typography>
        </Box>
      </Box>
    </Box>
  );
}