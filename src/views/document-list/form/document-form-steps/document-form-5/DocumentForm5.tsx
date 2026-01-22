/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Stack,
} from '@mui/material';
import CustomButton from '@/components/mui/CustomButton';
import SignaturePad, { SignaturePadRef } from '@/components/common/signature/SignaturePad';
import { colors } from '@/configs/colorConfig';

interface DocumentForm5Props {
    onSave?: (data: any) => void;
}

const DocumentForm5: React.FC<DocumentForm5Props> = ({ onSave }) => {
    const [formData, setFormData] = useState({
        paymentMethod: 'transfer', // default or empty
        smsOption: 'sms', // default or empty
        note: '',
        signature: null as string | null
    });

    const signatureRef = useRef<SignaturePadRef>(null);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSignatureChange = (signatureData: string | null) => {
        setFormData(prev => ({ ...prev, signature: signatureData }));
    };

    const handleSubmit = () => {
        if (onSave) {
            onSave(formData);
        }
        console.log("Form Submitted", formData);
    };

    const handleSaveNote = () => {
        console.log("Note Saved", formData.note);
    };

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
            {/* Header */}
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
                    แจ้งงานเสร็จและขอคืนเงินประกันฯ
                </Typography>
            </Box>

            <Box className="grid grid-cols-12 gap-6">
                <Box className="col-span-12 lg:col-span-5 space-y-4">
                    {/* Payment Method */}
                    <Box className="grid grid-cols-12 items-center">
                        <Box className="col-span-12 lg:col-span-3">
                            <Typography fontWeight="bold">ระบุการรับเงิน</Typography>
                        </Box>
                        <Box className="col-span-12 lg:col-span-9">
                            <RadioGroup
                                row
                                value={formData.paymentMethod}
                                onChange={handleChange('paymentMethod')}
                            >
                                <FormControlLabel
                                    value="transfer"
                                    control={<Radio />}
                                    label="โอน"
                                />
                                <FormControlLabel
                                    value="check"
                                    control={<Radio />}
                                    label="เช็ค"
                                />
                            </RadioGroup>
                        </Box>
                    </Box>

                    {/* SMS Option */}
                    <Box className="grid grid-cols-12 items-center">
                        <Box className="col-span-12 lg:col-span-3">
                            <Typography fontWeight="bold">ระบุการส่ง SMS</Typography>
                        </Box>
                        <Box className="col-span-12 lg:col-span-9">
                            <RadioGroup
                                row
                                value={formData.smsOption}
                                onChange={handleChange('smsOption')}
                            >
                                <FormControlLabel
                                    value="sms"
                                    control={<Radio />}
                                    label="ส่ง SMS"
                                />
                                <FormControlLabel
                                    value="no-sms"
                                    control={<Radio />}
                                    label="ไม่ส่ง SMS"
                                />
                            </RadioGroup>
                        </Box>
                    </Box>
                </Box>

                {/* Note and Save Button */}
                <Box className="col-span-12 lg:col-span-7">
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'flex-start' }}>
                        <TextField
                            fullWidth
                            label="หมายเหตุ"
                            value={formData.note}
                            onChange={handleChange('note')}
                            multiline
                            rows={1}
                            placeholder="ระบุหมายเหตุ..."
                            InputLabelProps={{ shrink: true }}
                        />
                        <CustomButton
                            variant="contained"
                            onClick={handleSaveNote}
                        >
                            บันทึก
                        </CustomButton>
                    </Stack>

                    <Box sx={{ mt: 2 }}>
                        <SignaturePad
                            ref={signatureRef}
                            label=" " // Empty label as we use custom text below
                            onChange={handleSignatureChange}
                            height={200}
                        />
                        <Typography align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
                            ชื่อผู้วางเงินประกัน
                        </Typography>
                        <Typography align="center" color="text.secondary">
                            (ผู้วางเงินประกัน)
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default DocumentForm5;