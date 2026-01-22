"use client";

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField,
    useTheme,
    Typography
} from '@mui/material';
import { colors } from '@/configs/colorConfig';

interface ApprovalSectionProps {
    onApprovalChange?: (status: string) => void;
    onReasonChange?: (reason: string) => void;
    initialStatus?: string;
    initialReason?: string;
}

const ApprovalSection: React.FC<ApprovalSectionProps> = ({
    onApprovalChange,
    onReasonChange,
    initialStatus = 'approved',
    initialReason = ''
}) => {
    const theme = useTheme();
    const [approvalStatus, setApprovalStatus] = useState<string>(initialStatus);
    const [reason, setReason] = useState<string>(initialReason);

    const handleApprovalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setApprovalStatus(value);
        onApprovalChange?.(value);
    };

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setReason(value);
        onReasonChange?.(value);
    };

    return (
        <Box className="w-full " >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    borderBottom: `3px solid ${colors.primary.main}`,
                    display: "inline-block",
                }}
            >
                การเห็นชอบ
            </Typography>
            <Box
                className="flex flex-col gap-3 w-full"
            >
                <FormControl component="fieldset" >
                    <RadioGroup
                        row
                        aria-label="approval-status"
                        name="approval-status"
                        value={approvalStatus}
                        onChange={handleApprovalChange}
                    >
                        <FormControlLabel
                            value="approved"
                            control={
                                <Radio />
                            }
                            label="เห็นชอบ"
                            sx={{ mr: { xs: 2, md: 4 } }}
                        />
                        <FormControlLabel
                            value="disapproved"
                            control={
                                <Radio />
                            }
                            label="ไม่เห็นชอบ"
                        />
                    </RadioGroup>
                </FormControl>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="รายละเอียด"
                    value={reason}
                    onChange={handleReasonChange}
                    size="small"
                    multiline
                    minRows={8}
                    sx={{
                        flex: 1,
                        backgroundColor: '#fff',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: theme.palette.divider,
                            },
                            '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                            }
                        }
                    }}
                />
            </Box >
        </Box>
    );
};

export default ApprovalSection;
