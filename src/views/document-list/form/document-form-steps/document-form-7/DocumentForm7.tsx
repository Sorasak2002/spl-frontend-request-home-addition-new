import { Box } from "@mui/material"
import UnitDetailForm from "../document-form-1/UnitDetailForm"
import ContractorInformationForm from "../document-form-1/ContractorInformationForm"
import DepositorInformationForm from "../document-form-1/DepositorInformationForm"
import DocumentAttachmentsForm from "../document-form-3/DocumentAttachmentsForm"
import DepositorSignature from "../document-form-3/DepositorSignature"
import DepositRefundInformationForm from "./DepositRefundInformationForm"
import DamageInspectionSummaryForm from "./DamageInspectionSummaryForm"
import ConstructionManagerOpinionForm from "./ConstructionManagerOpinionForm"

const DocumentForm7 = () => {
    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
            {/* รายละเอียดแปลง */}
            <UnitDetailForm isDetail />

            {/* ข้อมูลผู้รับเหมา */}
            <ContractorInformationForm isDetail />

            {/* ข้อมูลผู้วางประกัน */}
            <DepositorInformationForm isDetail />

            {/* ไฟล์สำเนา */}
            <DocumentAttachmentsForm />

            {/* ลายมือชื่อผู้วางเงินประกัน */}
            <DepositorSignature />

            {/* ผู้วางเงินประกัน */}
            <DepositRefundInformationForm />

            {/* ตรวจความเสียหาย */}
            <DamageInspectionSummaryForm />

            {/* ความเห็นของผู้จัดการฝ่ายก่อสร้าง */}
            <ConstructionManagerOpinionForm />
        </Box>
    )
}

export default DocumentForm7