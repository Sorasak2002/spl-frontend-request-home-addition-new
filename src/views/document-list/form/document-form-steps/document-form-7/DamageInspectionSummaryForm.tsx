"use client";;
import React from 'react';
import {
    Box,
    Typography,
    Link,
} from '@mui/material';
import { colors } from '@/configs/colorConfig';
import FormPaper from '../FormPaper';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CustomDataGrid from '@/components/mui/CustomDataGrid';
import { GridColDef } from '@mui/x-data-grid-pro';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventIcon from '@mui/icons-material/Event';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WarningIcon from '@mui/icons-material/Warning';
import BadgeIcon from '@mui/icons-material/Badge';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const InfoBox = ({
    title,
    data,
    icon,
}: {
    title: string;
    data: string;
    icon?: React.ReactNode;
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

const DamageInspectionSummaryForm = () => {
    const columns: GridColDef[] = [
        {
            field: 'damageType',
            headerName: 'ประเภทความเสียหาย',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'damageDetail',
            headerName: 'ความเสียหาย',
            flex: 2,
            minWidth: 300,
        },
        {
            field: 'damageAmount',
            headerName: 'ค่าความเสียหาย (บาท)',
            flex: 1,
            minWidth: 180,
        },
    ];

    const rows = [
        { id: 1, damageType: '-', damageDetail: '-', damageAmount: '-' },
        { id: 2, damageType: '-', damageDetail: '-', damageAmount: '-' },
        { id: 3, damageType: '-', damageDetail: '-', damageAmount: '-' },
    ];

    return (
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

            <FormPaper>
                <Box className="grid grid-cols-12 gap-4">
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="วันที่ทำงานเสร็จจริง"
                            data="DD/MM/YYYY"
                            icon={<EventAvailableIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="วันที่เริ่มต้น"
                            data="DD/MM/YYYY"
                            icon={<EventIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="วันที่สิ้นสุด"
                            data="DD/MM/YYYY"
                            icon={<EventIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="จำนวนวันที่ทำงานทั้งหมด"
                            data="XXX วัน"
                            icon={<WorkHistoryIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="จำนวนวันที่เกิน"
                            data="XXX วัน"
                            icon={<WarningIcon color="error" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="บัตรคนงานเลขที่"
                            data="XXX"
                            icon={<BadgeIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                    <Box className="col-span-12 sm:col-span-6 lg:col-span-3" >
                        <InfoBox
                            title="ป้ายอนุญาตเลขที่"
                            data="DD/MM/YYYY"
                            icon={<ConfirmationNumberIcon color="primary" sx={{ fontSize: 18 }} />}
                        />
                    </Box>
                </Box>

                <Box className="flex flex-col sm:flex-row sm:items-center mt-5 mb-3 gap-2">
                    <Box className="flex flex-wrap gap-2 items-baseline">
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            ฝ่ายบริการชุมชน
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            (รวมเป็นเงิน XXX บาท)
                        </Typography>
                    </Box>
                    <Box className="flex items-center">
                        <Link
                            href="#"
                            underline="hover"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                color: 'primary.main',
                                fontWeight: 600,
                            }}
                        >
                            <AttachFileIcon fontSize="small" />
                            ไฟล์รูปภาพเพิ่มเติม
                        </Link>
                    </Box>
                </Box>

                <Box>
                    <CustomDataGrid
                        rows={rows}
                        columns={columns}
                        rowHeight={44}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: colors.warning.main,
                                color: '#fff',
                                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#fff',
                                fontWeight: 600,
                            },
                        }}
                    />
                </Box>

                <Box className="flex flex-col sm:flex-row sm:items-center mt-5 mb-3 gap-2">
                    <Box className="flex flex-wrap gap-2 items-baseline">
                        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            ฝ่ายบริการชุมชน
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            (รวมเป็นเงิน XXX บาท)
                        </Typography>
                    </Box>
                    <Box className="flex items-center">
                        <Link
                            href="#"
                            underline="hover"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1,
                                color: 'primary.main',
                                fontWeight: 600,
                            }}
                        >
                            <AttachFileIcon fontSize="small" />
                            ไฟล์รูปภาพเพิ่มเติม
                        </Link>
                    </Box>
                </Box>

                <Box>
                    <CustomDataGrid
                        rows={rows}
                        columns={columns}
                        rowHeight={44}
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: colors.warning.main,
                                color: '#fff',
                                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: '#fff',
                                fontWeight: 600,
                            },
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        mt: 3,
                        pt: 2,
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                    className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                >
                    <Box className="flex items-center gap-3">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            จำนวนเงินที่ชำระทั้งหมด
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            XXXXXX
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>บาท</Typography>
                    </Box>

                    <Box className="flex items-center gap-3">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            จำนวนเงินที่หักทั้งหมด
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            XXXXXX
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>บาท</Typography>
                    </Box>

                    <Box className="flex items-center gap-3">
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            จำนวนเงินที่คืนทั้งหมด
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            XXXXXX
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>บาท</Typography>
                    </Box>
                </Box>
            </FormPaper>
        </Box>
    );
};

export default DamageInspectionSummaryForm;
