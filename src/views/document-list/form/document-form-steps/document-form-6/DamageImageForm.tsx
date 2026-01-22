"use client";

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { colors } from '@/configs/colorConfig';
import DropzoneUpload, { FileWithPreview } from '../document-form-2/DropzoneUpload';
import { FileType } from '../document-form-2/DocumentForm2';

const MAX_FILES = 2;
const ACCEPTED_FILE_TYPES = {
    "application/pdf": [".pdf"],
    "image/png": [".png"],
    "image/jpeg": [".jpg", ".jpeg"],
};

const DamageImageForm = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const handlePreview = (file: FileWithPreview) => {
        if (file.type === "application/pdf") {
            // เปิด PDF ใน tab ใหม่
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, "_blank");
        } else if (file.type.startsWith("image/")) {
            // เปิด Image ใน Dialog

        }
    };



    return (
        <Box className="flex flex-col w-full mt-8">
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
                    แนบภาพความเสียหาย
                </Typography>
            </Box>

            <DropzoneUpload
                acceptedFileTypes={ACCEPTED_FILE_TYPES}
                onFilesChange={(newFiles: FileWithPreview[]) =>
                    setFiles(newFiles)
                }
                initialFiles={files}
                title="Drag & Drop Files here"
                showFileList={true}
                columns={{ xs: 12, sm: 6, md: 4 }}
                disabled={false}
                showPreview={true}
                onPreview={handlePreview}
                height={180}
                allowMultiple={true}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: colors.primary.main,
                        color: colors.primary.main,
                        '&:hover': {
                            borderColor: colors.primary.hover,
                            color: colors.primary.hover,
                            bgcolor: 'transparent'
                        },
                        minWidth: 120,
                        fontWeight: 600
                    }}
                >
                    บันทึก
                </Button>
            </Box>
        </Box>
    );
};

export default DamageImageForm;
