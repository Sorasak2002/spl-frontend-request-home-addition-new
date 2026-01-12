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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import FormPaper from "../FormPaper";
import CustomNumberField from "@/components/mui/CustomNumberField";

const ContractorInformationForm = () => {
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
        ข้อมูลผู้รับเหมา
      </Typography>

      <FormPaper>
        {/* Extension Intention Section */}
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
        </Box>

        {/* Contractor Details Section */}
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

            {/* Contractor Location */}
            <TextField
              fullWidth
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

            {/* License Level */}
            <CustomNumberField
              sx={{
                bgcolor: "background.paper",
              }}
              label="จำนวนคนงาน"
              min={0}
              required
            />
          </Box>
        </Box>
      </FormPaper>
    </Box>
  );
};

export default ContractorInformationForm;
