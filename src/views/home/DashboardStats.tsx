"use client";

import { Box, Paper, Typography } from "@mui/material";
import {
  Description as DocumentIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { colors } from "@/configs/colorConfig";
import { useRouter } from "next/navigation";

const DashboardStats = () => {
  const router = useRouter();
  const stats = [
    {
      icon: <DocumentIcon sx={{ fontSize: 32 }} />,
      label: "เอกสารทั้งหมด",
      value: "142",
      color: colors.info.light,
      bgColor: "rgba(41, 182, 246, 0.08)",
    },
    {
      icon: <ErrorIcon sx={{ fontSize: 32 }} />,
      label: "เอกสารที่ใกล้หมดอายุ",
      value: "15",
      color: colors.error.light,
      bgColor: "rgba(229, 115, 115, 0.08)",
    },
    {
      icon: <CheckIcon sx={{ fontSize: 32 }} />,
      label: "โอนเงินคืนสำเร็จ",
      value: "95",
      color: colors.success.light,
      bgColor: "rgba(129, 199, 132, 0.08)",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, index) => (
        <Paper
          key={index}
          elevation={0}
          component={Box}
          sx={{
            width: { xs: "100%", sm: "calc(50% - 12px)", md: 280 },
            p: 3,
            borderRadius: 2,
            border: `2px solid ${stat.color}`,
            backgroundColor: "background.paper",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 8px 24px ${stat.color}33`,
            },
          }}
          onClick={() => router.push("/document-list")}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                backgroundColor: stat.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: stat.color,
              }}
            >
              {stat.icon}
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "1rem",
                  mb: 0.5,
                }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: stat.color,
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default DashboardStats;
