"use client";

import React from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WarningIcon from '@mui/icons-material/Warning';
import FormPaper from '../FormPaper';
import { colors } from '@/configs/colorConfig';

interface DamageInspectionFormProps {
    actualCompletionDate?: string;
    onDateChange?: (date: string) => void;
    startDate?: string;
    endDate?: string;
    totalDays?: number;
    overdueDays?: number;
}

const InfoBox = ({
    title,
    data,
    icon,
    color = "primary"
}: {
    title: string;
    data: string | number;
    icon: React.ReactNode;
    color?: "primary" | "error" | "default";
}) => {
    return (
        <Box
            sx={{
                p: 1.5,
                bgcolor: (theme) => theme.palette.background.paper,
                borderRadius: 1.5,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                flex: 1,
                minWidth: "140px",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 4px 12px rgba(0, 0, 0, 0.3)"
                            : "0 4px 12px rgba(0, 0, 0, 0.08)",
                    borderColor: (theme) => color === 'error' ? theme.palette.error.main : theme.palette.primary.main,
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
                sx={{
                    fontWeight: 600,
                    color: color === 'error' ? 'error.main' : 'text.primary'
                }}
            >
                {data}
            </Typography>
        </Box>
    );
};

const DamageInspectionForm: React.FC<DamageInspectionFormProps> = ({
    actualCompletionDate = "",
    onDateChange,
    startDate = "DD/MM/YYYY",
    endDate = "DD/MM/YYYY",
    totalDays = 0,
    overdueDays = 0
}) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        borderBottom: `3px solid ${colors.primary.main}`,
                        display: "inline-block",
                    }}
                >
                    ตรวจความเสียหาย
                </Typography>
            </Box>
            <FormPaper>
                <Box className="flex flex-col gap-4">
                    {/* Date Input Section */}
                    <Box className="w-full lg:max-w-[30rem]">
                        <TextField
                            fullWidth
                            label="วันที่เสร็จงานจริง"
                            type="date"
                            value={actualCompletionDate}
                            onChange={(e) => onDateChange && onDateChange(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CalendarTodayIcon sx={{ color: 'action.active' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Info Text Section */}
                    <Box className="grid grid-cols-12 gap-4">
                        <Box className="col-span-12 lg:col-span-6 xl:col-span-3" >
                            <InfoBox
                                title="วันที่เริ่มต้น"
                                data={startDate}
                                icon={<EventIcon color="primary" sx={{ fontSize: 20 }} />}
                            />
                        </Box>
                        <Box className="col-span-12 lg:col-span-6 xl:col-span-3" >
                            <InfoBox
                                title="วันที่สิ้นสุด"
                                data={endDate}
                                icon={<EventIcon color="primary" sx={{ fontSize: 20 }} />}
                            />
                        </Box>
                        <Box className="col-span-12 lg:col-span-6 xl:col-span-3" >
                            <InfoBox
                                title="จำนวนวันที่ทำงานทั้งหมด"
                                data={`${totalDays} วัน`}
                                icon={<WorkHistoryIcon color="primary" sx={{ fontSize: 20 }} />}
                            />
                        </Box>
                        <Box className="col-span-12 lg:col-span-6 xl:col-span-3" >
                            <InfoBox
                                title="จำนวนวันที่เกิน"
                                data={`${overdueDays} วัน`}
                                icon={<WarningIcon color="error" sx={{ fontSize: 20 }} />}
                                color="error"
                            />
                        </Box>
                    </Box>
                </Box>
            </FormPaper>
        </Box>
    );
};

export default DamageInspectionForm;
