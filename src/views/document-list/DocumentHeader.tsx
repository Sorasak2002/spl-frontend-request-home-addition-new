"use client";

import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/configs/colorConfig";
import CustomButton from "@/components/mui/CustomButton";

type DocumentsHeaderProps = {
  onCreateDocument: () => void;
};

const DocumentsHeader: FC<DocumentsHeaderProps> = ({
  onCreateDocument,
}: DocumentsHeaderProps) => {
  const isDarkMode = useDarkMode()
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { xs: "center", sm: "space-between" },
        alignItems: "center",
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Box
        sx={{
          textAlign: { xs: "center", sm: "left" },
        }}
      >
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
      <CustomButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateDocument}
      >
        เพิ่มรายการ
      </CustomButton>
    </Box>
  );
};

export default DocumentsHeader;
