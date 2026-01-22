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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { colors } from "@/configs/colorConfig";
import CustomNumberField from "@/components/mui/CustomNumberField";

// ==================== Types ====================
interface DepositorInformationFormProps {
  isDetail?: boolean;
  data?: {
    prefix?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    idCard?: string;
    relationship?: string;
    startDate?: string;
    endDate?: string;
    duration?: number;
    bank?: string;
    bankCode?: string;
    branchCode?: string;
    bankKey?: string;
    accountNumber?: string;
    accountName?: string;
  };
}

// ==================== Main Component ====================
const DepositorInformationForm = ({
  isDetail = false,
  data,
}: DepositorInformationFormProps) => {
  const theme = useTheme();

  // ==================== Mock Data ====================
  const defaultData = {
    prefix: "นาย",
    firstName: "สมศักดิ์",
    lastName: "ใจดี",
    phone: "0898765432",
    idCard: "1234567890123",
    relationship: "คู่สมรส",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    duration: 350,
    bank: "KBANK",
    bankCode: "004",
    branchCode: "0001",
    bankKey: "0040001",
    accountNumber: "1234567890",
    accountName: "นายสมศักดิ์ ใจดี",
  };

  const formData = { ...defaultData, ...data };

  const getBankName = (code: string) => {
    const banks: { [key: string]: string } = {
      KBANK: "ธนาคารกสิกรไทย",
      SCB: "ธนาคารไทยพาณิชย์",
      BBL: "ธนาคารกรุงเทพ",
      KTB: "ธนาคารกรุงไทย",
      TMB: "ธนาคารทหารไทย",
    };
    return banks[code] || code;
  };
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
        ข้อมูลผู้วางประกัน
      </Typography>

      <FormPaper>
        {/* ==================== Depositor Details Section ==================== */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <PersonIcon
              className="hidden md:flex"
              color="primary"
              sx={{ fontSize: 24 }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main" }}
            >
              รายละเอียดผู้วางประกัน
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
                title="ชื่อผู้วางประกัน"
                data={formData.firstName}
                icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="นามสกุลผู้วางประกัน"
                data={formData.lastName}
                icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="เบอร์โทรศัพท์"
                data={formData.phone}
                icon={<PhoneIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="เลขบัตรประชาชน"
                data={formData.idCard}
                icon={<BadgeIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="ความสัมพันธ์"
                data={formData.relationship}
                icon={<FamilyRestroomIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="วันที่เริ่มต้น"
                data={formData.startDate}
                icon={<CalendarMonthIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="วันที่สิ้นสุด"
                data={formData.endDate}
                icon={<CalendarMonthIcon color="primary" sx={{ fontSize: 20 }} />}
              />
              <DetailInfoBox
                title="ระยะเวลา"
                data={`${formData.duration} วัน`}
                icon={<AccessTimeIcon color="primary" sx={{ fontSize: 20 }} />}
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
                  value={formData.prefix}
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
                value={formData.firstName}
                label="ชื่อผู้วางประกัน"
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
                value={formData.lastName}
                label="นามสกุลผู้วางประกัน"
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
              <TextField
                fullWidth
                required
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
                required
                value={formData.idCard}
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
                  value={formData.relationship}
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
                value={formData.startDate}
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
              <CustomNumberField
                sx={{
                  bgcolor: "background.paper",
                }}
                label="ระยะเวลา (วัน)"
                min={0}
                required
              />

            </Box>
          )}

          {/* ==================== Bank Transfer Section ==================== */}
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
                  title="ธนาคาร"
                  data={getBankName(formData.bank)}
                  icon={<AccountBalanceIcon color="primary" sx={{ fontSize: 20 }} />}
                />
                <DetailInfoBox
                  title="รหัสธนาคาร"
                  data={formData.bankCode}
                  icon={<AccountBalanceIcon color="primary" sx={{ fontSize: 20 }} />}
                />
                <DetailInfoBox
                  title="รหัสสาขา"
                  data={formData.branchCode}
                  icon={<AccountBalanceIcon color="primary" sx={{ fontSize: 20 }} />}
                />
                <DetailInfoBox
                  title="BANKKEY"
                  data={formData.bankKey}
                  icon={<AccountBalanceIcon color="primary" sx={{ fontSize: 20 }} />}
                />
                <DetailInfoBox
                  title="เลขที่บัญชี"
                  data={formData.accountNumber}
                  icon={<AccountBalanceIcon color="primary" sx={{ fontSize: 20 }} />}
                />
                <DetailInfoBox
                  title="ชื่อบัญชี"
                  data={formData.accountName}
                  icon={<PersonIcon color="primary" sx={{ fontSize: 20 }} />}
                />
              </Box>
            ) : (
              <>
                {/* Bank Selection */}
                <Box sx={{ mb: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>ธนาคารสำหรับโอนเงินประกัน</InputLabel>
                    <Select
                      value={formData.bank}
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
                        ? `${colors.primary.dark}25`
                        : `${colors.primary.light}25`,
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
                          {formData.bankCode}
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
                          {formData.branchCode}
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
                          {formData.bankKey}
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
                    value={formData.accountNumber}
                    label="เลขที่บัญชีธนาคารของผู้วางเงินประกัน"
                    placeholder="กรอกเลขบัญชี"
                  />

                  <TextField
                    fullWidth
                    value={formData.accountName}
                    label="ชื่อบัญชีธนาคารของผู้วางเงินประกัน"
                    placeholder="กรอกชื่อบัญชี"
                  />
                </Box>
              </>
            )}
          </Box>
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

export default DepositorInformationForm;
