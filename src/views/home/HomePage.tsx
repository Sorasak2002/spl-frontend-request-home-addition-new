"use client";

import { Box, Typography, useTheme } from "@mui/material";

import {
  Description as DocumentIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  AccountBalance as DepartmentIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  Analytics as AnalyticsIcon,
  Assessment as ReportIcon,
  BarChart as ChartIcon,
  PieChart as PieIcon,
} from "@mui/icons-material";
import DashboardStats from "./DashboardStats";
import DashboardFilter from "./DashboardFilter";
import DashboardSection from "./DashboardSection";
import { colors } from "@/configs/colorConfig";

const HomePage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box>
      <Box className="mb-9">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          หน้าแรก
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
          }}
        >
          Overview of your documents, departments, and reports
        </Typography>
      </Box>

      <Box className="mb-9">
        <DashboardStats />
      </Box>

      <Box className="mb-7">
        <DashboardFilter />
      </Box>

      <Box className="mb-7">
        {/* การสร้างเอกสาร */}
        <DashboardSection
          title="การสร้างเอกสาร"
          totalCount={142}
          items={[
            {
              icon: <DocumentIcon />,
              label: "สร้างเอกสาร",
              count: 28,
              color: colors.dashboardSection.createDoc,
            },
            {
              icon: <CheckIcon />,
              label: "ขอความเห็นชอบแบบ",
              count: 95,
              color: colors.dashboardSection.reqConstructionApproval,
            },
            {
              icon: <InfoIcon />,
              label: "เห็นชอบแบบ",
              count: 15,
              color: colors.dashboardSection.reqConstructionApproved,
            },
            {
              icon: <AssignmentIcon />,
              label: "แก้ไขแบบ",
              count: 4,
              color: colors.dashboardSection.reqConstructionRejected,
              highlighted: true,
            },
          ]}
        />
      </Box>

      <Box className="mb-7">
        {/* ดำเนินการ */}
        <DashboardSection
          title="ดำเนินการ"
          totalCount={89}
          items={[
            {
              icon: <DepartmentIcon />,
              label: "ดำเนินการต่อเติม",
              count: 24,
              color: colors.dashboardSection.addInProgress,
            },
            {
              icon: <BusinessIcon />,
              label: "ตั้งเรื่องคืนเงิน",
              count: 18,
              color: colors.dashboardSection.docSetPayback,
            },
            {
              icon: <PeopleIcon />,
              label: "ตรวจสอบความเสียหาย",
              count: 12,
              color: colors.dashboardSection.damageCheck,
            },
            {
              icon: <TrendingIcon />,
              label: "รอ ผจก. ก่อสร้างอนุมัติ",
              count: 16,
              color: colors.dashboardSection.reqConstMgrApproval,
            },
            {
              icon: <AnalyticsIcon />,
              label: "ผจก. ก่อสร้างส่งกลับแก้ไข",
              count: 19,
              color: colors.dashboardSection.reqConstMgrRejected,
              highlighted: true,
            },
          ]}
        />
      </Box>

      <Box>
        {/* ฝ่ายการเงินและบัญชี */}
        <DashboardSection
          title="ฝ่ายการเงินและบัญชี"
          totalCount={67}
          items={[
            {
              icon: <ReportIcon />,
              label: "รอ บช. ฝ่ายรับ อนุมัติ",
              count: 12,
              color: colors.dashboardSection.reqAccReceiveApproval,
            },
            {
              icon: <ChartIcon />,
              label: "บช. ฝ่ายรับ ส่งกลับแก้ไข",
              count: 28,
              color: colors.dashboardSection.reqAccReceiveRejected,
              highlighted: true,
            },
            {
              icon: <PieIcon />,
              label: "รอ บช. ฝ่ายจ่ายปรับสถานะ",
              count: 15,
              color: colors.dashboardSection.accPayChangeStatus,
            },
            {
              icon: <AnalyticsIcon />,
              label: "รอ การเงินปรับสถานะ",
              count: 12,
              color: colors.dashboardSection.finChangeStatus,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
