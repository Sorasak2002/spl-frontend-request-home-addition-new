"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onCreate: () => void;
};

const ObjectiveOfAdditionHeader = ({ onCreate }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          ความประสงค์ที่ต้องการจะต่อเติม
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          จัดการรายการความประสงค์ในการต่อเติม
        </Typography>
      </Box>
      <Button
        size="small"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
      >
        เพิ่มรายการ
      </Button>
    </Box>
  );
};

export default ObjectiveOfAdditionHeader;
