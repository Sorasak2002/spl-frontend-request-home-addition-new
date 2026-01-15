import { colors } from "@/configs/colorConfig";
import {
  Typography,
  TextField,
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import FormPaper from "../FormPaper";

const UnitDetailForm = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          borderBottom: `3px solid ${theme.palette.primary.main}`,
          display: "inline-block",
        }}
      >
        รายละเอียดแปลง
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 3 },
          mb: 2,
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <TextField
            sx={{ width: { xs: "100%", sm: "auto" } }}
            label="เลขแปลง"
            size="small"
            variant="outlined"
          />
          <Box>
            <IconButton
              size="small"
              className="btn-hover-scale"
              sx={{
                backgroundColor: colors.primary.main,
                color: "white",
                "&:hover": { backgroundColor: colors.primary.hover },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography>เลขที่เอกสาร :</Typography>
          <Typography className="font-bold">RD-202511005XX</Typography>
        </Box>
      </Box>

      <FormPaper>
        {/* Project Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <HomeIcon
            sx={{
              color: "primary.main",
              fontSize: 28,
              display: { xs: "none", sm: "block" },
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              ชื่อโครงการ
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              ศุภาลัย ปาล์มสปริง เทพารักษ์
            </Typography>
          </Box>
          <Chip
            label="เจ้าของบ้าน"
            size="small"
            color="primary"
            sx={{ fontWeight: 300 }}
          />
        </Box>

        {/* Owner Details Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            "& > *": {
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(20% - 16px)",
              },
              //   minWidth: { xs: "100%", sm: "250px" },
            },
          }}
        >
          {/* House Number */}
          <OwnerInfoBox
            title="เลขที่บ้าน"
            data="54/1"
            icon={<HomeIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          {/* Full Name */}
          <OwnerInfoBox
            title="ชื่อ-นามสกุล"
            data="นาย จักรกฤช วราศิลป์"
            icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          {/* Phone */}
          <OwnerInfoBox
            title="เบอร์โทรศัพท์"
            data="0816238500"
            icon={<PhoneIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          {/* ID Card Number */}
          <OwnerInfoBox
            title="เลขบัตรประชาชน"
            data="1120100057770"
            icon={<BadgeIcon color="primary" sx={{ fontSize: 20 }} />}
          />
        </Box>
      </FormPaper>
    </Box>
  );
};

// Sub Function
const OwnerInfoBox = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: string;
  icon: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: (theme) => theme.palette.background.paper,
        borderRadius: 1.5,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 4px 12px rgba(0, 0, 0, 0.3)"
              : "0 4px 12px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontWeight: 500 }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        {data}
      </Typography>
    </Box>
  );
};

export default UnitDetailForm;
