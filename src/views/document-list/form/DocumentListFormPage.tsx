"use client";

import {
  Box,
  Button,
  Paper,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  Stepper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { useForm } from "react-hook-form";

import CheckIcon from "@mui/icons-material/Check";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SmartStepper from "./smart-stepper/SmartStepper";
import DocumentForm1 from "./document-form-steps/document-form-1/DocumentForm1";

type Props = {
  documentId?: string;
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 28,
    left: "calc(-50% + 28px)",
    right: "calc(50% + 28px)",
  },
  [`&.${stepConnectorClasses.vertical}`]: {
    padding: 0,
    marginLeft: 28,
    minHeight: 20,
  },
  [`& .${stepConnectorClasses.line}`]: {
    minHeight: 48,
    borderLeftWidth: 4,
    borderColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#D0D0D0",
    borderRadius: 2,
    transition: "all 0.4s ease",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#D4A017",
      borderLeftWidth: 4,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#D4A017",
      borderLeftWidth: 4,
    },
  },
  [theme.breakpoints.up("md")]: {
    [`& .${stepConnectorClasses.line}`]: {
      height: 4,
      border: 0,
      backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#D0D0D0",
      borderRadius: 2,
      borderLeftWidth: 0,
      minHeight: 0,
      transition: "all 0.4s ease",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#D4A017",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#D4A017",
      },
    },
  },
}));

const CustomStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#D0D0D0",
  zIndex: 1,
  color: theme.palette.mode === "dark" ? "#888" : "#666",
  width: 56,
  height: 56,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.25rem",
  fontWeight: 700,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: `3px solid ${theme.palette.mode === "dark" ? "#3A3A3A" : "#D0D0D0"}`,
  ...(ownerState.active && {
    backgroundColor: "#D4A017",
    color: "#fff",
    boxShadow: "0 6px 20px 0 rgba(212, 160, 23, 0.5)",
    transform: "scale(1.1)",
    border: "3px solid #D4A017",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#D4A017",
    color: "#fff",
    border: "3px solid #D4A017",
  }),
}));

function CustomStepIcon(props: {
  active?: boolean;
  completed?: boolean;
  icon: React.ReactNode;
}) {
  const { active, completed, icon } = props;

  return (
    <CustomStepIconRoot ownerState={{ active, completed }}>
      {completed ? <CheckIcon sx={{ fontSize: "1.5rem" }} /> : icon}
    </CustomStepIconRoot>
  );
}

const steps = [
  "สร้างเอกสาร",
  "ข้อมูลโครงการ",
  "ข้อมูลการก่อสร้าง",
  "เอกสารแนบ",
  "รายละเอียดเพิ่มเติม",
  "ข้อมูลการเงิน",
  "การตรวจสอบ",
  "ยืนยันข้อมูล",
];

const DocumentListFormPage: FC<Props> = ({ documentId }) => {
  const router = useRouter();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const { handleSubmit, trigger } = useForm({
    mode: "onChange",
    defaultValues: {
      plotNumber: "",
      projectName: "",
      ownerPrefix: "",
      ownerName: "",
      ownerSurname: "",
      ownerPhone: "",
      ownerIdCard: "",
      ownerEmail: "",
      extensionIntention: "",
      houseNumber: "",
      position: "",
      extensionReceiverName: "",
      extensionReceiverPhone: "",
      extensionReceiverIdCard: "",
      buildingBank: "",
      duration: "",
      startDate: null,
      endDate: null,
      beforeExtensionNumber: "",
      afterExtensionNumber: "",
    },
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid && activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log("[v0] Form data:", data);
    router.push("/document-list");
  });

  // content render
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DocumentForm1 />;
      case 1:
        return <Box sx={{ p: 3 }}>ข้อมูลโครงการ (Coming Soon)</Box>;
      case 2:
        return <Box sx={{ p: 3 }}>ข้อมูลการก่อสร้าง (Coming Soon)</Box>;
      case 3:
        return <Box sx={{ p: 3 }}>เอกสารแนบ (Coming Soon)</Box>;
      case 4:
        return <Box sx={{ p: 3 }}>รายละเอียดเพิ่มเติม (Coming Soon)</Box>;
      case 5:
        return <Box sx={{ p: 3 }}>ข้อมูลการเงิน (Coming Soon)</Box>;
      case 6:
        return <Box sx={{ p: 3 }}>การตรวจสอบ (Coming Soon)</Box>;
      case 7:
        return <Box sx={{ p: 3 }}>ยืนยันข้อมูล (Coming Soon)</Box>;
      default:
        return null;
    }
  };

  return (
    <Box>
      {/* TODO: Step Component */}
      <SmartStepper
        steps={steps}
        activeStep={activeStep}
        onStepClick={setActiveStep}
      />

      <Paper
        elevation={0}
        sx={{
          my: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        {renderStepContent(activeStep)}
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBackIcon />}
        >
          ย้อนกลับ
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button onClick={onSubmit} color="success" variant="contained">
            Submit
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            ถัดไป
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DocumentListFormPage;
