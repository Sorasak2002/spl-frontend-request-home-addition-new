"use client";

import { colors } from "@/configs/colorConfig";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { DataGridProProps } from "@mui/x-data-grid-pro";
import dynamic from "next/dynamic";

// 1. Import DataGrid แบบปิด SSR
const DataGridPro = dynamic(
  () => import("@mui/x-data-grid-pro").then((mod) => mod.DataGridPro),
  {
    ssr: false, // บรรทัดนี้สำคัญ คือบอกว่าไม่ต้อง render ที่ server
    loading: () => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // จัดแกนนอน (ซ้าย-ขวา)
          alignItems: "center", // จัดแกนตั้ง (บน-ล่าง)
        }}
      >
        <CircularProgress />
      </Box>
    ),
  }
);

const CustomDataGrid = (props: DataGridProProps) => {
  const {} = props;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <DataGridPro
      {...props}
      autoHeight
      disableColumnMenu
      disableColumnFilter
      showColumnVerticalBorder
      hideFooter
      localeText={{
        noRowsLabel: "ไม่มีข้อมูล",
      }}
      sx={{
        ...props.sx,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        bgcolor: "background.paper",
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? `${colors.primary.dark}25`
              : `${colors.primary.light}25`,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          fontWeight: 600,
          borderBottom: `2px solid ${theme.palette.divider}`,
          fontSize: 16,
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: 600,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.main,
        },
        "& .MuiDataGrid-row:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        "& .MuiDataGrid-virtualScroller": {
          overflow: "auto",
        },
        ...(isMobile && {
          "& .MuiDataGrid-columnHeader[data-field='creator']": {
            display: "none",
          },
          "& .MuiDataGrid-cell[data-field='creator']": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeader[data-field='updater']": {
            display: "none",
          },
          "& .MuiDataGrid-cell[data-field='updater']": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeader[data-field='plotNumber']": {
            display: "none",
          },
          "& .MuiDataGrid-cell[data-field='plotNumber']": {
            display: "none",
          },
        }),
      }}
    />
  );
};

export default CustomDataGrid;
