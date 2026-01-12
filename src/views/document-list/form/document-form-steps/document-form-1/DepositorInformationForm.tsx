"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import FormPaper from "../FormPaper";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const DepositorInformationForm = () => {
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
        ข้อมูลผู้วางประกัน
      </Typography>

      <FormPaper>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <PersonIcon color="primary" sx={{ fontSize: 24 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              รายละเอียดผู้วางประกัน
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
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 110px",
                },
              }}
              fullWidth
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
              </Select>
            </FormControl>

            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Phone */}
            {/* FIXME: อาจจะเปลี่ยน field เป็น phone format */}
            <TextField
              fullWidth
              required
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
              required
              label="เลขบัตรประชาชน/เลขผู้เสียภาษี"
              placeholder="กรอกเลขบัตร"
              InputProps={{
                startAdornment: (
                  <BadgeIcon
                    sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                  />
                ),
              }}
            />

            {/* Relationship */}
            <FormControl fullWidth>
              <InputLabel required>ความสัมพันธ์</InputLabel>
              <Select
                label="ความสัมพันธ์"
                sx={{
                  bgcolor: "background.paper",
                }}
              >
                <MenuItem value="บิดา">บิดา</MenuItem>
                <MenuItem value="มารดา">มารดา</MenuItem>
                <MenuItem value="คู่สมรส">คู่สมรส</MenuItem>
                <MenuItem value="บุตร">บุตร</MenuItem>
                <MenuItem value="พี่น้อง">พี่น้อง</MenuItem>
                <MenuItem value="อื่นๆ">อื่นๆ</MenuItem>
              </Select>
            </FormControl>

            {/* Start Date */}
            <TextField
              fullWidth
              required
              type="date"
              label="วันที่เริ่มต้น"
              InputLabelProps={{ shrink: true }}
            />

            {/* End Date */}
            <TextField
              fullWidth
              required
              type="date"
              label="วันที่สิ้นสุด"
              InputLabelProps={{ shrink: true }}
            />

            {/* Duration */}
            <TextField
              fullWidth
              type="number"
              label="ระยะเวลา (วัน)"
              placeholder="จำนวนวัน"
            />
          </Box>

          {/* Bank Transfer Section */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <BusinessIcon color="primary" sx={{ fontSize: 24 }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                ข้อมูลการโอนเงินประกัน
              </Typography>
            </Box>

            {/* Bank Selection */}
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>ธนาคารสำหรับโอนเงินประกัน</InputLabel>
                <Select
                  label="ธนาคารสำหรับโอนเงินประกัน"
                  sx={{
                    bgcolor: "background.paper",
                  }}
                >
                  <MenuItem value="KBANK">ธนาคารกสิกรไทย</MenuItem>
                  <MenuItem value="SCB">ธนาคารไทยพาณิชย์</MenuItem>
                  <MenuItem value="BBL">ธนาคารกรุงเทพ</MenuItem>
                  <MenuItem value="KTB">ธนาคารกรุงไทย</MenuItem>
                  <MenuItem value="TMB">ธนาคารทหารไทย</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Bank Details Display */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                p: 1.5,
                mb: 2,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? `${theme.palette.primary.main}`
                    : `${theme.palette.primary.main}30`,
                borderRadius: 2,
                border: `1px solid ${theme.palette.primary.main}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AccountBalanceIcon fontSize="small" />
                  ข้อมูลธนาคาร
                </Typography>

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
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: 1,
                      px: 1.5,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      รหัสธนาคาร
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        fontFamily: "monospace",
                      }}
                    >
                      XXX
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      py: 1,
                      px: 1.5,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      รหัสสาขาธนาคาร
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        fontFamily: "monospace",
                      }}
                    >
                      XXXX
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      py: 1,
                      px: 1.5,
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1.5,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      BANKKEY
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        fontFamily: "monospace",
                      }}
                    >
                      XXXXXXX
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Box>

            {/* Bank Account Fields */}
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
              <TextField
                fullWidth
                label="เลขที่บัญชีธนาคารของผู้วางเงินประกัน"
                placeholder="กรอกเลขบัญชี"
              />

              <TextField
                fullWidth
                label="ชื่อบัญชีธนาคารของผู้วางเงินประกัน"
                placeholder="กรอกชื่อบัญชี"
              />
            </Box>
          </Box>
        </Box>
      </FormPaper>
    </Box>
  );
};

export default DepositorInformationForm;
