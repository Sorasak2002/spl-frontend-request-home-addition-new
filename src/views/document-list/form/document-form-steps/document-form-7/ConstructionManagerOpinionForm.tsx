"use client";

import { useState } from 'react';
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField,
} from '@mui/material';

import { colors } from '@/configs/colorConfig';
import FormPaper from '../FormPaper';

const ConstructionManagerOpinionForm = () => {
    const [status, setStatus] = useState('approve');

    return (
        <FormPaper>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    borderBottom: `3px solid ${colors.primary.main}`,
                    display: "inline-block",
                }}
            >
                ความเห็นของผู้จัดการฝ่ายก่อสร้าง
            </Typography>

            <Box className="flex flex-col md:flex-row gap-4 md:items-start">
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ gap: 2 }}
                    >
                        <FormControlLabel
                            value="approve"
                            control={<Radio />}
                            label={<Typography sx={{ fontWeight: 500 }}>อนุมัติ</Typography>}
                        />
                        <FormControlLabel
                            value="disapprove"
                            control={<Radio />}
                            label={<Typography sx={{ fontWeight: 500 }}>ไม่อนุมัติ</Typography>}
                        />
                    </RadioGroup>
                </FormControl>

                <Box className="flex-1">
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        label="รายละเอียด"
                        multiline
                    />
                </Box>
            </Box>
        </FormPaper>
    );
};

export default ConstructionManagerOpinionForm;
