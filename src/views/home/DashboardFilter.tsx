"use client";

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { colors } from "@/configs/colorConfig";
import CustomIconButton from "@/components/mui/CustomIconButton";

const DashboardFilter = () => {
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = () => {
    setCategory("");
    setProject("");
    setStatus("");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ minWidth: 200, flex: { xs: "1 1 100%", sm: "1" } }}>
          <InputLabel>บริษัทฯ</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="documents">Documents</MenuItem>
            <MenuItem value="reports">Reports</MenuItem>
            <MenuItem value="analytics">Analytics</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200, flex: { xs: "1 1 100%", sm: "1" } }}>
          <InputLabel>โครงการ</InputLabel>
          <Select
            value={project}
            label="Project"
            onChange={(e) => setProject(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="project-a">Project A</MenuItem>
            <MenuItem value="project-b">Project B</MenuItem>
            <MenuItem value="project-c">Project C</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 200, flex: { xs: "1 1 100%", sm: "1" } }}
          placeholder="Enter status..."
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Search">
            <CustomIconButton sx={{ color: 'white' }} >
              <SearchIcon />
            </CustomIconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <CustomIconButton
              onClick={handleReset}
              sx={{
                backgroundColor: "action.hover",
                "&:hover": { backgroundColor: "action.selected" },
              }}
            >
              <RefreshIcon />
            </CustomIconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default DashboardFilter;
