"use client";

import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { FC } from "react";

type DocumentFiltersProps = {
  documentNumberFilter: string;
  statusFilter: string;
  onDocumentNumberChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

const DocumentFilter: FC<DocumentFiltersProps> = ({
  documentNumberFilter,
  statusFilter,
  onDocumentNumberChange,
  onStatusChange,
  onSearch,
  onReset,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr auto auto",
          },
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="ค้นหา เลขเอกสาร, ชื่อโครงการ, เลขแปลง, ผู้สร้าง, ผู้อัปเดต"
          variant="outlined"
          value={documentNumberFilter}
          onChange={(e) => onDocumentNumberChange(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="สถานะ"
          variant="outlined"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </TextField>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearch}
          size="small"
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            textTransform: "none",
          }}
        >
          ค้นหา
        </Button>
        <Button variant="outlined" onClick={onReset} size="small">
          <RefreshIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default DocumentFilter;
