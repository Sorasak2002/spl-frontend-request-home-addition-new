/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Typography } from "@mui/material";
import DepositorGuaranteeForm from "./DepositorGuaranteeForm";
import { colors } from "@/configs/colorConfig";

const DocumentForm4 = () => {
    const handleSave = (data: any) => {
        console.log('Form data:', data);
        // Handle save logic here
    };

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
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
                    ผู้วางเงินประกัน
                </Typography>
            </Box>
            <DepositorGuaranteeForm onSave={handleSave} />
        </Box>
    )
}

export default DocumentForm4
