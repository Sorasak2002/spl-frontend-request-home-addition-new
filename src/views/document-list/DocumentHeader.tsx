"use client";

import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

type DocumentsHeaderProps = {
  onCreateDocument: () => void;
};

const DocumentsHeader: FC<DocumentsHeaderProps> = ({
  onCreateDocument,
}: DocumentsHeaderProps) => {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
        >
          รายการฟอร์ม
        </Typography>
        {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Manage and track all project documents
        </Typography> */}
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateDocument}
        sx={{
          backgroundColor: "primary.main",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          textTransform: "none",
        }}
      >
        เพิ่มรายการ
      </Button>
    </Box>
  );
};

export default DocumentsHeader;
