import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading, redirectToLogin } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirectToLogin();
    }
  }, [loading, user, redirectToLogin]);

  if (loading || !user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "#f4f6fb",
        }}
      >
        <CircularProgress size={36} sx={{ color: "#233971" }} />
        <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.875rem", color: "#64748b" }}>
          {loading ? "Memverifikasi sesi..." : "Mengarahkan ke halaman login..."}
        </Typography>
      </Box>
    );
  }

  return children;
}
