"use client";

import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DropzoneUpload, { FileWithPreview } from "./DropzoneUpload";

const MAX_FILES = 2;
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

export enum FileType {
  DepositorIDCard = "DepositorIDCard", // สำเนาบัตรประชาชนผู้วางเงินประกัน
  BankAccount = "BankAccount", // สำเนาบัญชีธนาคารผู้วางเงินประกัน
  HomeAdditionPlan = "HomeAdditionPlan", // แบบสำหรับต่อเติม
  WarrantyPolicyHomeAddition = "WarrantyPolicyHomeAddition", // ระเบียบประกันต่อเติม
  ContractorIDCard = "ContractorIDCard", // บัตรประชาชนผู้รับเหมา หรือไฟล์อื่นๆ
}

const DocumentForm2 = () => {
  const theme = useTheme();
  const [depositorIDCardFiles, setDepositorIDCardFiles] = useState<
    FileWithPreview[]
  >([]);
  const [bankAccountFiles, setBankAccountFiles] = useState<FileWithPreview[]>(
    []
  );
  const [homeAdditionPlanFiles, setHomeAdditionPlanFiles] = useState<
    FileWithPreview[]
  >([]);
  const [WarrantyPolicyHomeAdditionFiles, setWarrantyPolicyHomeAdditionFiles] =
    useState<FileWithPreview[]>([]);
  const [contractorIDCardFiles, setContractorIDCardFiles] = useState<
    FileWithPreview[]
  >([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileWithPreview | null>(
    null
  );

  const handleFilesChange = (newFiles: FileWithPreview[], type: FileType) => {
    switch (type) {
      case FileType.DepositorIDCard:
        setDepositorIDCardFiles(newFiles);
        break;
      case FileType.BankAccount:
        setBankAccountFiles(newFiles);
        break;
      case FileType.HomeAdditionPlan:
        setHomeAdditionPlanFiles(newFiles);
        break;
      case FileType.WarrantyPolicyHomeAddition:
        setWarrantyPolicyHomeAdditionFiles(newFiles);
        break;
      case FileType.ContractorIDCard:
        setContractorIDCardFiles(newFiles);
        break;
    }
  };

  const handlePreview = (file: FileWithPreview) => {
    if (file.type === "application/pdf") {
      // เปิด PDF ใน tab ใหม่
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } else if (file.type.startsWith("image/")) {
      // เปิด Image ใน Dialog
      setSelectedFile(file);
      setPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
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
          ไฟล์สำเนา (ในรูปแบบ PDF , PNG , JPEG)
        </Typography>
      </Box>

      {/* FIXME: สำเนาบัตรประชาชนผู้วางเงินประกัน */}
      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          สำเนาบัตรประชาชนผู้วางเงินประกัน{" "}
          <Typography
            component="span"
            variant="h6"
            sx={{
              color: "error.main",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            อัปโหลดได้ไม่เกิน {MAX_FILES} ไฟล์
          </Typography>
        </Typography>

        {/* FIXME: Dropzone */}
        <DropzoneUpload
          maxFiles={MAX_FILES}
          acceptedFileTypes={ACCEPTED_FILE_TYPES}
          onFilesChange={(newFiles: FileWithPreview[]) =>
            handleFilesChange(newFiles, FileType.DepositorIDCard)
          }
          initialFiles={depositorIDCardFiles}
          title="Drag & Drop Files here"
          showFileList={true}
          columns={{ xs: 12, sm: 6, md: 4 }}
          disabled={false}
          showPreview={true}
          onPreview={handlePreview}
          height={180}
          allowMultiple={true}
        />
      </Box>

      {/* FIXME: สำเนาบัญชีธนาคารผู้วางเงินประกัน */}
      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          สำเนาบัญชีธนาคารผู้วางเงินประกัน{" "}
          <Typography
            component="span"
            variant="h6"
            sx={{
              color: "error.main",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            อัปโหลดได้ไม่เกิน {MAX_FILES} ไฟล์
          </Typography>
        </Typography>

        {/* FIXME: Dropzone */}
        <DropzoneUpload
          maxFiles={MAX_FILES}
          acceptedFileTypes={ACCEPTED_FILE_TYPES}
          onFilesChange={(newFiles: FileWithPreview[]) =>
            handleFilesChange(newFiles, FileType.BankAccount)
          }
          initialFiles={bankAccountFiles}
          title="Drag & Drop Files here"
          showFileList={true}
          columns={{ xs: 12, sm: 6, md: 4 }}
          disabled={false}
          showPreview={true}
          onPreview={handlePreview}
          height={180}
          allowMultiple={true}
        />
      </Box>

      {/* FIXME: แบบสำหรับต่อเติม*  */}
      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          แบบสำหรับต่อเติม*
          <Typography
            component="span"
            variant="h6"
            sx={{
              color: "error.main",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            อัปโหลดได้ไม่เกิน 5 ไฟล์
          </Typography>
        </Typography>

        {/* FIXME: Dropzone */}
        <DropzoneUpload
          maxFiles={MAX_FILES}
          acceptedFileTypes={ACCEPTED_FILE_TYPES}
          onFilesChange={(newFiles: FileWithPreview[]) =>
            handleFilesChange(newFiles, FileType.HomeAdditionPlan)
          }
          initialFiles={homeAdditionPlanFiles}
          title="Drag & Drop Files here"
          showFileList={true}
          columns={{ xs: 12, sm: 6, md: 4 }}
          disabled={false}
          showPreview={true}
          onPreview={handlePreview}
          height={180}
          allowMultiple={true}
        />
      </Box>

      {/* FIXME: ระเบียบประกันต่อเติม*  */}
      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          ระเบียบประกันต่อเติม*
          <Typography
            component="span"
            variant="h6"
            sx={{
              color: "error.main",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            อัปโหลดได้ไม่เกิน 2 ไฟล์
          </Typography>
        </Typography>

        {/* FIXME: Dropzone */}
        <DropzoneUpload
          maxFiles={MAX_FILES}
          acceptedFileTypes={ACCEPTED_FILE_TYPES}
          onFilesChange={(newFiles: FileWithPreview[]) =>
            handleFilesChange(newFiles, FileType.WarrantyPolicyHomeAddition)
          }
          initialFiles={WarrantyPolicyHomeAdditionFiles}
          title="Drag & Drop Files here"
          showFileList={true}
          columns={{ xs: 12, sm: 6, md: 4 }}
          disabled={false}
          showPreview={true}
          onPreview={handlePreview}
          height={180}
          allowMultiple={true}
        />
      </Box>

      {/* FIXME: บัตรประชาชนผู้รับเหมา หรือไฟล์อื่นๆ */}
      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          บัตรประชาชนผู้รับเหมา หรือไฟล์อื่นๆ
          <Typography
            component="span"
            variant="h6"
            sx={{
              color: "error.main",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            อัปโหลดได้ไม่เกิน 10 ไฟล์
          </Typography>
        </Typography>

        {/* FIXME: Dropzone */}
        <DropzoneUpload
          maxFiles={MAX_FILES}
          acceptedFileTypes={ACCEPTED_FILE_TYPES}
          onFilesChange={(newFiles: FileWithPreview[]) =>
            handleFilesChange(newFiles, FileType.ContractorIDCard)
          }
          initialFiles={contractorIDCardFiles}
          title="Drag & Drop Files here"
          showFileList={true}
          columns={{ xs: 12, sm: 6, md: 4 }}
          disabled={false}
          showPreview={true}
          onPreview={handlePreview}
          height={180}
          allowMultiple={true}
        />
      </Box>

      {/* Image Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ดูตัวอย่างไฟล์
          </Typography>
          <IconButton onClick={handleClosePreview} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedFile && selectedFile.preview && (
            <Box>
              <img
                src={selectedFile.preview}
                alt={selectedFile.name}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                }}
              />
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {selectedFile.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ขนาด: {formatFileSize(selectedFile.size)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentForm2;
