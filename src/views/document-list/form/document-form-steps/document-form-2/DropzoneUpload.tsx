"use client";

import {
  Box,
  Typography,
  useTheme,
  Button,
  alpha,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import CustomButton from "@/components/mui/CustomButton";

export interface FileWithPreview extends File {
  preview?: string;
}

export interface DropzoneUploadProps {
  maxFiles?: number;
  acceptedFileTypes?: Record<string, string[]>;
  onFilesChange?: (files: FileWithPreview[]) => void;
  initialFiles?: FileWithPreview[];
  title?: string;
  description?: string;
  showFileList?: boolean;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
  };
  disabled?: boolean;
  showPreview?: boolean;
  onPreview?: (file: FileWithPreview) => void;
  customFileIcon?: (file: FileWithPreview) => React.ReactNode;
  height?: number | string;
  allowMultiple?: boolean;
  minHeight?: string;
}

const DEFAULT_ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

const DropzoneUpload: React.FC<DropzoneUploadProps> = ({
  maxFiles = 2,
  acceptedFileTypes = DEFAULT_ACCEPTED_TYPES,
  onFilesChange,
  initialFiles = [],
  title = "Drag & Drop Files here",
  description,
  showFileList = true,
  columns = { xs: 12, sm: 6, md: 4 },
  disabled = false,
  showPreview = true,
  onPreview,
  customFileIcon,
  height = 180,
  allowMultiple = true,
  minHeight = "18rem",
}) => {
  const theme = useTheme();
  const [files, setFiles] = useState<FileWithPreview[]>(initialFiles);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFilesWithPreview = acceptedFiles.map((file) => {
        const fileWithPreview: FileWithPreview = file;
        // สร้าง preview URL สำหรับไฟล์รูปภาพ
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }
        return fileWithPreview;
      });

      const updatedFiles = allowMultiple
        ? [...files, ...newFilesWithPreview].slice(0, maxFiles)
        : newFilesWithPreview.slice(0, 1);

      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    },
    [files, maxFiles, allowMultiple, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: maxFiles - files.length,
    disabled: disabled || files.length >= maxFiles,
    multiple: allowMultiple,
  });

  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    // ล้าง preview URL เพื่อป้องกัน memory leak
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handlePreviewFile = (file: FileWithPreview) => {
    if (onPreview) {
      onPreview(file);
    } else {
      // Default preview behavior
      if (file.type === "application/pdf") {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      } else if (file.type.startsWith("image/") && file.preview) {
        const fileURL = file.preview || URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (file: FileWithPreview) => {
    if (customFileIcon) {
      return customFileIcon(file);
    }

    if (file.type === "application/pdf") {
      return <PictureAsPdfIcon sx={{ fontSize: 48, color: "error.main" }} />;
    } else if (file.type.startsWith("image/")) {
      return <ImageIcon sx={{ fontSize: 48, color: "success.main" }} />;
    }
    return <InsertDriveFileIcon sx={{ fontSize: 48, color: "primary.main" }} />;
  };

  const getFileTypeLabel = (type: string): string => {
    if (type === "application/pdf") return "PDF";
    if (type.startsWith("image/")) {
      return type.split("/")[1].toUpperCase();
    }
    return type.split("/")[1]?.toUpperCase() || "FILE";
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: `2px dashed ${isDragActive
          ? theme.palette.primary.main
          : alpha(theme.palette.primary.main, 0.5)
          }`,
        borderRadius: 2,
        backgroundColor: isDragActive
          ? alpha(theme.palette.primary.main, 0.05)
          : alpha(theme.palette.primary.main, 0.02),
        padding: 4,
        textAlign: "center",
        cursor:
          disabled || files.length >= maxFiles ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        minHeight: files.length > 0 ? "auto" : minHeight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.6 : 1,
        "&:hover": {
          backgroundColor:
            disabled || files.length >= maxFiles
              ? alpha(theme.palette.primary.main, 0.02)
              : alpha(theme.palette.primary.main, 0.08),
          borderColor:
            disabled || files.length >= maxFiles
              ? alpha(theme.palette.primary.main, 0.5)
              : theme.palette.primary.main,
        },
      }}
    >
      <input {...getInputProps()} />

      {/* แสดงไฟล์ที่ Upload */}
      {files.length > 0 && showFileList ? (
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {files.map((file, index) => (
            <Grid size={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  position: "relative",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "transform 0.2s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Preview Image หรือ Icon */}
                {file.type.startsWith("image/") && file.preview ? (
                  <CardMedia
                    component="img"
                    height={typeof height === "number" ? height : 180}
                    image={file.preview}
                    alt={file.name}
                    sx={{
                      objectFit: "cover",
                      backgroundColor: theme.palette.grey[100],
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: typeof height === "number" ? height : 180,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }}
                  >
                    {getFileIcon(file)}
                  </Box>
                )}

                {/* File Info */}
                <CardContent sx={{ pb: 1, flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      minHeight: "20px",
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip
                      label={formatFileSize(file.size)}
                      size="small"
                      sx={{ fontSize: "0.7rem" }}
                    />
                    <Chip
                      label={getFileTypeLabel(file.type)}
                      size="small"
                      color="primary"
                      sx={{ fontSize: "0.7rem" }}
                    />
                  </Box>
                </CardContent>

                {/* Action Buttons */}
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                    pt: 0,
                  }}
                >
                  {showPreview && (
                    <Tooltip title="ดูตัวอย่าง">
                      <IconButton
                        size="small"
                        onClick={() => handlePreviewFile(file)}
                        sx={{
                          color: "primary.main",
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="ลบไฟล์">
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                      sx={{
                        color: "error.main",
                        "&:hover": {
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {/* Add More Files Button */}
          {files.length < maxFiles && allowMultiple && (
            <Grid size={3}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: {
                    xs: 250,
                    md: typeof height === "number" ? height + 135 : 315,
                  },
                  border: `2px dashed ${alpha(
                    theme.palette.primary.main,
                    0.5
                  )}`,
                  borderRadius: 1,
                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <AddIcon
                  sx={{
                    fontSize: 64,
                    color: alpha(theme.palette.primary.main, 0.5),
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: alpha(theme.palette.primary.main, 0.7),
                    fontWeight: 500,
                  }}
                >
                  เพิ่มไฟล์
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    mt: 1,
                  }}
                >
                  (คลิกหรือลากไฟล์มาที่นี่)
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          {/* Upload Icon */}
          <CloudUploadIcon
            sx={{
              fontSize: 64,
              color: alpha(theme.palette.primary.main, 0.7),
              mb: 2,
            }}
          />

          {/* Upload Text */}
          <Typography
            variant="h6"
            sx={{
              color: alpha(theme.palette.primary.main, 0.9),
              fontWeight: 500,
              mb: 1,
            }}
          >
            {isDragActive ? "วางไฟล์ที่นี่..." : title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
              }}
            >
              {description}
            </Typography>
          )}

          {/* Or Text */}
          {!isDragActive && (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                or
              </Typography>

              {/* Browse Button */}
              <Button
                variant="contained"
                color="primary"
                disabled={disabled || files.length >= maxFiles}
                sx={{
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Browse Files
              </Button>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default DropzoneUpload;
