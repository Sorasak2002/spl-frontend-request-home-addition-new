"use client";

import { Box } from "@mui/material";

import UnitDetailForm from "./UnitDetailForm";
import ContractorInformationForm from "./ContractorInformationForm";
import DepositorInformationForm from "./DepositorInformationForm";

const DocumentForm1 = () => {
  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* FIXME: รายละเอียดแปลง */}
      <UnitDetailForm />

      {/* FIXME: ข้อมูลผู้รับเหมา */}
      <ContractorInformationForm />

      {/* FIXME: ข้อมูลผู้วางประกัน */}
      <DepositorInformationForm />
    </Box>
  );
};

export default DocumentForm1;
