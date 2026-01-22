"use client";;
import React from 'react';
import { Box, Typography } from '@mui/material';
import SignaturePad from '@/components/common/signature/SignaturePad';
import { colors } from '@/configs/colorConfig';

interface DepositorSignatureProps {
    onSignatureChange?: (signature: string | null) => void;
    initialSignature?: string;
}

const DepositorSignature: React.FC<DepositorSignatureProps> = ({ onSignatureChange, initialSignature }) => {


    const handleSignatureChange = (newSignature: string | null) => {
        console.log("Signature changed:", newSignature);

        onSignatureChange?.(newSignature);
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
                ลายมือชื่อผู้วางเงินประกัน
            </Typography>
            <Box>
                {/* ส่วนกรอกลายเซ็น */}
                <SignaturePad
                    onChange={handleSignatureChange}
                    height={240}
                    label=""
                    initialData={initialSignature}
                />
            </Box>
            <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                    ชื่อผู้วางเงินประกัน
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    (ผู้วางเงินประกัน)
                </Typography>
            </Box>
        </Box >
    );
};

export default DepositorSignature;
