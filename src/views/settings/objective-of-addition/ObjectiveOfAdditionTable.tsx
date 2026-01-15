"use client";

import type React from "react";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid-pro";
import { FC } from "react";
import { ObjectiveOfAddition } from "./ObjectiveOfAdditionPage";
import CustomDataGrid from "@/components/mui/CustomDataGrid";
import { colors } from "@/configs/colorConfig";
import { useThemeMode } from "@/contexts/ThemeContext";

type Props = {
  row: ObjectiveOfAddition[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit?: (intention: ObjectiveOfAddition) => void;
  onDelete?: (intention: ObjectiveOfAddition) => void;
  onToggle?: (intention: ObjectiveOfAddition) => void;
};

const ObjectiveOfAdditionTable: FC<Props> = ({
  row,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const theme = useTheme();

  const { mode } = useThemeMode();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "ความประสงค์ที่ต้องการจะต่อเติม",
      flex: 1, // ใช้ flex แทน width
      minWidth: 300,
      headerClassName: "background-header",
      renderCell: ({ row }) => (
        <Box sx={{ fontWeight: 500, color: "text.primary", fontSize: 15 }}>
          {row.description}
        </Box>
      ),
    },
    {
      field: "active",
      headerName: `เปิดใช้งาน`,
      width: 150,
      headerClassName: "background-header",
      renderCell: ({ row }) => (
        <Switch checked={row.isEnabled} onChange={() => onToggle?.(row)} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "background-header",
      renderCell: ({ row }) => (
        <Box>
          <Tooltip title="แก้ไข">
            <IconButton
              size="small"
              onClick={() => onEdit?.(row)}
              sx={{ color: "warning.main" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ลบ">
            <IconButton
              size="small"
              onClick={() => onDelete?.(row)}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <CustomDataGrid
      sx={{
        "& .background-header": {
          backgroundColor:
            mode === "dark"
              ? `${colors.primary.main}25`
              : `${colors.primary.light}25`,
          color: "white",
        },
      }}
      rows={row}
      columns={columns}
    />
  );
};

export default ObjectiveOfAdditionTable;
