"use client";;
import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import FormPaper from "../FormPaper";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { colors } from "@/configs/colorConfig";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// ==================== Types ====================
interface FileData {
    name: string;
    size?: number;
    uploadedAt?: string;
}

interface AttachmentSection {
    id: string;
    title: string;
    description?: string;
    required?: boolean;
    file?: FileData;
}

interface DocumentAttachmentsFormProps {
    data?: AttachmentSection[];
}

// ==================== Main Component ====================
const DocumentAttachmentsForm = ({
    data,
}: DocumentAttachmentsFormProps) => {
    // ==================== Mock Data ====================
    const defaultData: AttachmentSection[] = [
        {
            id: "id_card",
            title: "สำเนาบัตรประชาชนผู้วางเงินประกัน",
            required: true,
            file: {
                name: "สำเนาบัตรปชช.pdf",
                size: 1024000,
                uploadedAt: "2024-01-15",
            },
        },
        {
            id: "bank_book",
            title: "สำเนาบัญชีธนาคารผู้วางเงินประกัน",
            required: true,
            file: {
                name: "สำเนาบัญชีธนาคารผู้วางเงินประกัน.pdf",
                size: 2048000,
                uploadedAt: "2024-01-15",
            },
        },
        {
            id: "building_form",
            title: "แบบสำหรับต่อเติม",
            required: true,
            file: {
                name: "สำเนาบัตรปชช.pdf",
                size: 512000,
                uploadedAt: "2024-01-15",
            },
        },
        {
            id: "regulations",
            title: "ระเบียบประกันต่อเติม",
            required: true,
            file: {
                name: "สำเนาบัตรปชช.pdf",
                size: 768000,
                uploadedAt: "2024-01-15",
            },
        },
    ];

    const attachments = data || defaultData;

    const handleFileUpload = (sectionId: string) => {
        console.log("Upload file for:", sectionId);
        // Handle file upload logic
    };

    const handleFileDelete = (sectionId: string) => {
        console.log("Delete file for:", sectionId);
        // Handle file delete logic
    };

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return "";
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
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
                ไฟล์สำเนา
            </Typography>

            <FormPaper>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    {attachments.map((section) => (
                        <Box key={section.id}>
                            {/* Section Title */}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    mb: 1,
                                    color: "text.primary",
                                }}
                            >
                                {section.title}
                                {section.required && (
                                    <Typography
                                        component="span"
                                        sx={{ color: "error.main", ml: 0.5 }}
                                    >
                                        *
                                    </Typography>
                                )}
                            </Typography>

                            {/* File Display/Upload Area */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border: "2px dashed",
                                    borderColor: "primary.main",
                                    borderRadius: 2,
                                    bgcolor: (theme) =>
                                        section.file
                                            ? theme.palette.mode === "dark"
                                                ? `${colors.primary.dark}15`
                                                : `${colors.primary.light}15`
                                            : "background.paper",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        borderColor: "primary.main",
                                        bgcolor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? `${colors.primary.dark}20`
                                                : `${colors.primary.light}20`,
                                    },
                                }}
                            >
                                {section.file ? (
                                    // File Uploaded
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                            <DescriptionIcon
                                                sx={{ fontSize: 32, color: "primary.main" }}
                                            />
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {section.file.name}
                                                </Typography>
                                                {section.file.size && (
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {formatFileSize(section.file.size)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleFileDelete(section.id)}
                                            sx={{
                                                color: "info.main",
                                            }}
                                        >
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    // No File - Upload Area
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1.5,
                                            py: 2,
                                        }}
                                    >
                                        <CloudUploadIcon
                                            sx={{ fontSize: 40, color: "text.secondary" }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            align="center"
                                        >
                                            ลากไฟล์มาวางที่นี่ หรือ
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            startIcon={<AttachFileIcon />}
                                            onClick={() => handleFileUpload(section.id)}
                                            sx={{ fontWeight: 500 }}
                                        >
                                            เลือกไฟล์
                                        </Button>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            align="center"
                                        >
                                            รองรับไฟล์: PDF, JPG, PNG (ไม่เกิน 10 MB)
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </FormPaper>
        </Box>
    );
};

export default DocumentAttachmentsForm;
