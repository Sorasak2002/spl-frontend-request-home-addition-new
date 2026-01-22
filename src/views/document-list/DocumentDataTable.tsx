/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type React from "react";

import { Box, Chip, Tooltip, useTheme } from "@mui/material";

import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid-pro";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDataGrid from "@/components/mui/CustomDataGrid";
import useDarkMode from "@/hooks/useDarkMode";
import { useThemeMode } from "@/contexts/ThemeContext";

export interface Document {
  id: string;
  documentNumber: string;
  daysUntilExpiry: number;
  projectName: string;
  plotNumber: string;
  creator: string;
  updater: string;
  refundDate: string;
  status: string;
}

interface DocumentDataTableProps {
  documents: Document[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onView?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
}

const DocumentDataTable = ({
  documents,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
}: DocumentDataTableProps) => {
  const theme = useTheme();
  const { mode } = useThemeMode();

  const columns: GridColDef[] = [
    {
      field: "documentNumber",
      headerName: "เลขเอกสาร",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ fontWeight: 500, color: "text.primary" }}>
          {params.value}
        </Box>
      ),
    },
    {
      field: "daysUntilExpiry",
      headerName: `จำนวนวันก่อน \n
      เอกสารหมดอายุ`,
      width: 150,
      renderCell: (params) => (
        <Chip
          sx={{
            borderRadius: 1,
            backgroundColor:
              theme.palette.mode === "dark"
                ? `${getDaysColor(params.value)}20`
                : `${getDaysColor(params.value)}15`,
            color: getDaysColor(params.value),
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
          label={`${params.value} days`}
        />
      ),
    },
    {
      field: "projectName",
      headerName: "ชื่อโครงการ",
      width: 150,
    },
    {
      field: "plotNumber",
      headerName: "เลขแปลง",
      width: 100,
    },
    {
      field: "creator",
      headerName: "ผู้สร้าง",
      width: 100,
    },
    {
      field: "updater",
      headerName: "ผู้อัปเดต",
      width: 120,
    },
    {
      field: "refundDate",
      headerName: "วันที่โอนเงินคืน",
      width: 120,
    },
    {
      field: "status",
      headerName: "สถานะ",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={
            <Tooltip title="View">
              <VisibilityIcon sx={{ color: "info.main" }} />
            </Tooltip>
          }
          label="View"
          onClick={() => onView?.(params.row)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Edit">
              <EditIcon sx={{ color: "primary.main" }} />
            </Tooltip>
          }
          label="Edit"
          onClick={() => onEdit?.(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Delete">
              <DeleteIcon sx={{ color: "error.main" }} />
            </Tooltip>
          }
          label="Delete"
          onClick={() => onDelete?.(params.row)}
        />,
      ],
    },
  ];

  return (
    <CustomDataGrid
      rows={documents}
      columns={columns}
    />
  );
};

export default DocumentDataTable;

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "success";
    case "Completed":
      return "info";
    case "In Progress":
      return "warning";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

const getDaysColor = (days: number) => {
  if (days <= 7) return "#d32f2f";
  if (days <= 30) return "#ed6c02";
  return "#2e7d32";
};
