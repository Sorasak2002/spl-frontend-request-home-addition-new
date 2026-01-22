"use client"

import { Box, Grid } from "@mui/material"
import UnitDetailForm from "../document-form-1/UnitDetailForm"
import ContractorInformationForm from "../document-form-1/ContractorInformationForm"
import DepositorInformationForm from "../document-form-1/DepositorInformationForm"
import DocumentAttachmentsForm from "./DocumentAttachmentsForm"
import DepositorSignature from "./DepositorSignature"
import ApprovalSection from "./ApprovalSection"

const DocumentForm3 = () => {
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

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* ลายมือชื่อผู้วางเงินประกัน */}
                    <DepositorSignature />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
                    {/* ส่วนการเห็นชอบ */}
                    <ApprovalSection />
                </Grid>
            </Grid>


        </Box>
    )
}

export default DocumentForm3