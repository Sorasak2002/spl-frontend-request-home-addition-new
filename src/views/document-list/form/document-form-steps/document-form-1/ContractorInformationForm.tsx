"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import FormPaper from "../FormPaper";
import CustomNumberField from "@/components/mui/CustomNumberField";
import { colors } from "@/configs/colorConfig";

// ==================== Types ====================
interface ContractorInformationFormProps {
  isDetail?: boolean;
  data?: {
    extensionIntention?: string;
    prefix?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    idCard?: string;
    workerCount?: number;
  };
}

// ==================== Main Component ====================
const ContractorInformationForm = ({
  isDetail = false,
  data,
}: ContractorInformationFormProps) => {
  const theme = useTheme();

  // ==================== Mock Data ====================
  const defaultData = {
    extensionIntention: "ตกแต่งภายใน",
    prefix: "นาย",
    firstName: "สมชาย",
    lastName: "ใจดี",
    phone: "0812345678",
    idCard: "1234567890123",
    workerCount: 5,
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
          borderBottom: `3px solid ${colors.primary.main}`,
          display: "inline-block",
        }}
      >
        ข้อมูลผู้รับเหมา
      </Typography>

      <FormPaper>
        {/* ==================== Extension Intention Section ==================== */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <ConstructionIcon color="primary" sx={{ fontSize: 24 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              รายละเอียดงานต่อเติม
            </Typography>
          </Box>

          {isDetail ? (
            <DetailInfoBox
              title="ความประสงค์ที่ต้องการจะต่อเติม"
              data={formData.extensionIntention}
              icon={<ConstructionIcon color="primary" sx={{ fontSize: 20 }} />}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > *": {
                  flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)" },
                },
              }}
            >
              <FormControl>
                <InputLabel>ความประสงค์ที่ต้องการจะต่อเติม</InputLabel>
                <Select
                  value={formData.extensionIntention}
                  label="ความประสงค์ที่ต้องการจะต่อเติม"
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <MenuItem value="ตกแต่งภายใน">ตกแต่งภายใน</MenuItem>
                  <MenuItem value="อื่นๆ">อื่นๆ</MenuItem>
                  <MenuItem value="ต่อเติมห้อง">ต่อเติมห้อง</MenuItem>
                  <MenuItem value="ต่อเติมชั้น">ต่อเติมชั้น</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>

        {/* ==================== Contractor Details Section ==================== */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <BusinessIcon color="primary" sx={{ fontSize: 24 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              ข้อมูลผู้รับเหมา
            </Typography>
          </Box>

          {isDetail ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > *": {
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 12px)",
                    md: "1 1 calc(33.333% - 11px)",
                  },
                },
              }}
            >
              <DetailInfoBox
                title="คำนำหน้า"
                data={formData.prefix}
                icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="ชื่อผู้รับเหมา/บริษัท"
                data={formData.firstName}
                icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="นามสกุลผู้รับเหมา/จำกัด"
                data={formData.lastName}
                icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="เบอร์โทรศัพท์"
                data={formData.phone}
                icon={<PhoneIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="บัตรประชาชน/เลขที่ผู้เสียภาษี"
                data={formData.idCard}
                icon={<BadgeIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="จำนวนคนงาน"
                data={`${formData.workerCount} คน`}
                icon={<GroupIcon color="primary" sx={{ fontSize: 20 }} />}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                "& > *": {
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 8px)",
                    md: "1 1 calc(33.333% - 11px)",
                  },
                  minWidth: { xs: "100%", sm: "200px" },
                },
              }}
            >
              {/* Prefix */}
              <FormControl
                required
                sx={{
                  flex: {
                    xs: "0 0 100%",
                    sm: "0 0 110px",
                  },
                }}
              >
                <InputLabel>คำนำหน้า</InputLabel>
                <Select
                  value={formData.prefix}
                  label="คำนำหน้า"
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <MenuItem value="นาย">นาย</MenuItem>
                  <MenuItem value="นาง">นาง</MenuItem>
                  <MenuItem value="นางสาว">นางสาว</MenuItem>
                  <MenuItem value="บริษัท">บริษัท</MenuItem>
                </Select>
              </FormControl>

              {/* Contractor Name */}
              <TextField
                fullWidth
                required
                value={formData.firstName}
                label="ชื่อผู้รับเหมา/บริษัท"
                placeholder="กรอกชื่อ"
                InputProps={{
                  startAdornment: (
                    <PersonIcon
                      sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                    />
                  ),
                }}
              />

              {/* Contractor Last Name */}
              <TextField
                fullWidth
                value={formData.lastName}
                label="นามสกุลผู้รับเหมา/จำกัด"
                placeholder="กรอกนามสกุล"
                InputProps={{
                  startAdornment: (
                    <PersonIcon
                      sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                    />
                  ),
                }}
              />

              {/* Phone Number */}
              <TextField
                fullWidth
                value={formData.phone}
                label="เบอร์โทรศัพท์"
                placeholder="กรอกเบอร์โทรศัพท์"
                InputProps={{
                  startAdornment: (
                    <PhoneIcon
                      sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                    />
                  ),
                }}
              />

              {/* ID Card / Tax ID */}
              <TextField
                fullWidth
                value={formData.idCard}
                label="บัตรประชาชน/เลขที่ผู้เสียภาษี"
                placeholder="กรอกเลขบัตร"
                InputProps={{
                  startAdornment: (
                    <BadgeIcon
                      sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                    />
                  ),
                }}
              />

              {/* Worker Count */}
              <CustomNumberField
                sx={{
                  bgcolor: "background.paper",
                }}
                value={formData.workerCount}
                label="จำนวนคนงาน"
                min={0}
                required
              />
            </Box>
          )}
        </Box>
      </FormPaper>
    </Box>
  );
};

// ==================== Sub Component ====================
const DetailInfoBox = ({
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

export default ContractorInformationForm;
