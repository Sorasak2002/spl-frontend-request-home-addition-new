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
import useDarkMode from "@/hooks/useDarkMode";
import CustomIconButton from "@/components/mui/CustomIconButton";
import EmailIcon from '@mui/icons-material/Email';

// ==================== Types ====================
interface UnitDetailFormProps {
  isDetail?: boolean;
  data?: {
    plotNumber?: string;
    documentNumber?: string;
    projectName?: string;
    houseNumber?: string;
    ownerName?: string;
    phone?: string;
    idCard?: string;
  };
}

// ==================== Main Component ====================
const UnitDetailForm = ({ isDetail = false, data }: UnitDetailFormProps) => {
  const theme = useTheme();

  // ==================== Mock Data ====================
  const defaultData = {
    plotNumber: "",
    documentNumber: "RD-202511005XX",
    projectName: "ศุภาลัย ปาล์มสปริง เทพารักษ์",
    houseNumber: "54/1",
    ownerName: "นาย จักรกฤช วราศิลป์",
    phone: "0816238500",
    idCard: "1120100057770",
  };

  const formData = { ...defaultData, ...data };

  return (
    <Box>
      {/* ==================== Header ==================== */}
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

      {/* ==================== Search Section ==================== */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 3 },
          mb: 2,
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        {!isDetail ? (
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
              value={formData.plotNumber}
            />
            <Box>
              <CustomIconButton
                size="small"
                className="btn-hover-scale"
                sx={{ color: "white" }}
              >
                <SearchIcon />
              </CustomIconButton>
            </Box>
          </Box>
        ) : (<Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "1rem" }} >เลขที่แปลง :</Typography>
          <Typography sx={{ fontSize: "1rem" }} className="font-bold">1113</Typography>
        </Box>)}

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>เลขที่เอกสาร :</Typography>
          <Typography sx={{ fontSize: "1rem" }}>{formData.documentNumber}</Typography>
        </Box>
      </Box>

      {/* ==================== Form Content ==================== */}
      {/* <FormPaper> */}
      {/* ==================== Form Content ==================== */}
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
              {formData.projectName}
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
                md: "1 1 calc(33.33% - 16px)",
              },
            },
          }}
        >
          <OwnerInfoBox
            title="เลขที่บ้าน"
            data={formData.houseNumber}
            icon={<HomeIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          <OwnerInfoBox
            title="ชื่อ-นามสกุล"
            data={formData.ownerName}
            icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          <OwnerInfoBox
            title="เบอร์โทรศัพท์"
            data={formData.phone}
            icon={<PhoneIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          <OwnerInfoBox
            title="เลขบัตรประชาชน"
            data={formData.idCard}
            icon={<BadgeIcon color="primary" sx={{ fontSize: 20 }} />}
          />

          <OwnerInfoBox
            title="Email"
            data={"XXX@gmail.com"}
            icon={<EmailIcon color="primary" sx={{ fontSize: 20 }} />}
          />
        </Box>
      </FormPaper>
    </Box>
  );
};

// ==================== Sub Component ====================
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
