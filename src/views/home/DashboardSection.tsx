"use client";

import { colors } from "@/configs/colorConfig";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import type { FC, ReactNode } from "react";

interface DashboardItem {
  icon: ReactNode;
  label: string;
  count: number;
  color: string;
  highlighted?: boolean;
}

type DashboardSectionProps = {
  title: string;
  totalCount: number;
  items: DashboardItem[];
};

const DashboardSection: FC<DashboardSectionProps> = ({
  title,
  totalCount,
  items,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          backgroundColor: isDark
            ? `${colors.primary.dark}25`
            : `${colors.primary.light}25`,
          borderBottom: "1px solid",
          borderColor: "divider",
          borderTopLeftRadius: 23,
          borderTopRightRadius: 23,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          {totalCount} items
        </Typography>
      </Box>

      <Box
        sx={{
          p: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {items.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: item.highlighted
                ? `2px solid ${item.color}`
                : "1px solid",
              borderColor: item.highlighted ? item.color : "divider",
              backgroundColor: "background.paper",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 8px 20px ${item.color}22`,
                borderColor: item.color,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  backgroundColor: `${item.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.color,
                  "& svg": {
                    fontSize: 22,
                  },
                }}
              >
                {item.icon}
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                mb: 1,
                lineHeight: 1.4,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: item.color,
              }}
            >
              {item.count}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
};

export default DashboardSection;
