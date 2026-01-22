"use client";

import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Button, useTheme } from '@mui/material';
import { colors } from '@/configs/colorConfig';
import FormPaper from '../FormPaper';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import QrCodeIcon from '@mui/icons-material/QrCode';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// ==================== Sub Component ====================
const InfoBox = ({
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
                p: 2,
                bgcolor: (theme) => theme.palette.background.paper,
                borderRadius: 1.5,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                height: "100%",
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
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 1,
                        bgcolor: (theme) => theme.palette.action.hover,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {icon}
                </Box>
                <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", fontWeight: 500 }}
                >
                    {title}
                </Typography>
            </Box>
            <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: "text.primary", wordBreak: "break-word" }}
            >
                {data}
            </Typography>
        </Box>
    );
};

const DepositRefundInformationForm = () => {
    const theme = useTheme();
    const [receiptNo, setReceiptNo] = useState("R-1234-23458975");

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
                ผู้วางเงินประกัน
            </Typography>

            <FormPaper>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 3,
                    }}
                >
                    <Box sx={{ width: { xs: "100%", lg: 320 }, flexShrink: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1.5, color: "primary.main" }}
                        >
                            รายละเอียดใบเสร็จ
                        </Typography>
                        <FormControl fullWidth size="small">
                            <InputLabel>เลขที่ใบเสร็จ</InputLabel>
                            <Select
                                value={receiptNo}
                                onChange={(e) => setReceiptNo(e.target.value)}
                                label="เลขที่ใบเสร็จ"
                                sx={{ bgcolor: "background.paper" }}
                                size='medium'
                            >
                                <MenuItem value="R-1234-23458975">R-1234-23458975</MenuItem>
                                <MenuItem value="R-5678-00000000">R-5678-00000000</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 1.5, color: "primary.main" }}
                        >
                            ข้อมูลใบเสร็จ
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                                "& > *": {
                                    flex: {
                                        xs: "1 1 100%",
                                        sm: "1 1 calc(50% - 12px)",
                                        xl: "1 1 calc(25% - 12px)",
                                    },
                                },
                            }}
                        >
                            <InfoBox
                                title="วันที่ออกใบเสร็จ"
                                data="12/01/2025 13:59:29"
                                icon={<CalendarTodayIcon color="primary" sx={{ fontSize: 18 }} />}
                            />
                            <InfoBox
                                title="ชื่อนามสกุลผู้วางประกัน"
                                data="นายเดวิด ยองยอง"
                                icon={<PersonIcon color="primary" sx={{ fontSize: 18 }} />}
                            />
                            <InfoBox
                                title="วิธีการชำระ"
                                data="Qr Code"
                                icon={<QrCodeIcon color="primary" sx={{ fontSize: 18 }} />}
                            />
                            <InfoBox
                                title="เงินวางประกัน"
                                data="12,345,678 บาท"
                                icon={<MonetizationOnIcon color="primary" sx={{ fontSize: 18 }} />}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ my: 3, borderTop: (theme) => `1px solid ${theme.palette.divider}` }} />

                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, mb: 2, color: "primary.main" }}
                    >
                        ข้อมูลเพิ่มเติม
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                defaultValue="damrong.hen@supalai.com"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <Box component="span" sx={{ color: "action.active", mr: 1, display: "flex" }}>
                                            <EmailIcon />
                                        </Box>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="เบอร์โทรศัพท์"
                                required
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <Box component="span" sx={{ color: "action.active", mr: 1, display: "flex" }}>
                                            <PhoneIcon />
                                        </Box>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="บัตรคนงานเลขที่"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <Box component="span" sx={{ color: "action.active", mr: 1, display: "flex" }}>
                                            <BadgeIcon />
                                        </Box>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField
                                fullWidth
                                label="ป้ายอนุญาตเลขที่"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <Box component="span" sx={{ color: "action.active", mr: 1, display: "flex" }}>
                                            <ConfirmationNumberIcon />
                                        </Box>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </FormPaper>
        </Box>
    );
};

export default DepositRefundInformationForm;
