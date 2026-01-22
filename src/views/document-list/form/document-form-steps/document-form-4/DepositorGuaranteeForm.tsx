"use client";

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    useTheme,
    InputAdornment,
    SelectChangeEvent
} from '@mui/material';
import { colors } from '@/configs/colorConfig';
import CustomButton from '@/components/mui/CustomButton';
import CustomNumberField from '@/components/mui/CustomNumberField';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import useDarkMode from '@/hooks/useDarkMode';

interface DepositorGuaranteeFormData {
    plotNumber?: string;
    receiptDate?: string;
    guaranteeAmount?: number;
    guarantorName?: string;
    paymentMethod?: string;
    email?: string;
    phone?: string;
    accountNumber?: string;
    secondAccountNumber?: string;
}

interface DepositorGuaranteeFormProps {
    initialData?: DepositorGuaranteeFormData;
    onSave?: (data: DepositorGuaranteeFormData) => void;
    plotOptions?: Array<{ value: string; label: string }>;
}

const DepositorGuaranteeForm: React.FC<DepositorGuaranteeFormProps> = ({
    initialData,
    onSave,
    plotOptions = [
        { value: '001', label: 'X-XXXX-XXXXXXX' },
        { value: '002', label: 'X-XXXX-XXXXXXX-2' },
        { value: '003', label: 'X-XXXX-XXXXXXX-3' }
    ]
}) => {
    const isDarkMode = useDarkMode();
    const [formData, setFormData] = useState<DepositorGuaranteeFormData>(
        initialData || {
            plotNumber: '',
            receiptDate: '',
            guaranteeAmount: 15000,
            guarantorName: '',
            paymentMethod: '',
            email: '',
            phone: '',
            accountNumber: '',
            secondAccountNumber: ''
        }
    );

    const handleChange = (field: keyof DepositorGuaranteeFormData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleNumberChange = (field: keyof DepositorGuaranteeFormData) => (value: number | null) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSave = () => {
        onSave?.(formData);
    };

    return (
        <Grid container spacing={3}>
            {/* Row 1: เลขที่แปลง, วันที่ออกใบเสร็จ, เงินวางประกัน */}
            <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                    <InputLabel>เลขที่แปลง</InputLabel>
                    <Select
                        value={formData.plotNumber}
                        onChange={handleChange('plotNumber')}
                        label="เลขที่แปลง"
                        startAdornment={
                            <InputAdornment position="start">
                                <ReceiptIcon sx={{ color: 'action.active', ml: 1 }} />
                            </InputAdornment>
                        }
                    >
                        {plotOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                    fullWidth
                    label="วันที่ออกใบเสร็จ"
                    type="date"
                    value={formData.receiptDate}
                    onChange={handleChange('receiptDate')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className='text-white'
                />
            </Grid>

            <Grid className="w-full " size={{ xs: 12, md: 4 }}>
                <CustomNumberField
                    fullWidth
                    label="เงินวางประกัน"
                    value={formData.guaranteeAmount}
                    onValueChange={handleNumberChange('guaranteeAmount')}
                />
            </Grid>

            {/* Row 2: ชื่อผู้ค้ำประกัน, วิธีการชำระ */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="ชื่อบุคคลผู้ค้ำประกัน"
                    value={formData.guarantorName}
                    onChange={handleChange('guarantorName')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                    <InputLabel>วิธีการชำระ</InputLabel>
                    <Select
                        value={formData.paymentMethod}
                        onChange={handleChange('paymentMethod')}
                        label="วิธีการชำระ"
                    >
                        <MenuItem value="transfer">โอนเงิน</MenuItem>
                        <MenuItem value="cash">เงินสด</MenuItem>
                        <MenuItem value="check">เช็ค</MenuItem>
                        <MenuItem value="credit">บัตรเครดิต</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            {/* Row 3: Email, เบอร์โทรศัพท์ */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="เบอร์โทรศัพท์"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {/* Row 4: เลขที่บัญชีบันทึก (2 fields) */}
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="เลขที่บัญชีบันทึก"
                    value={formData.accountNumber}
                    onChange={handleChange('accountNumber')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBalanceIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    label="เลขที่บัญชีบันทึก (สำรอง)"
                    value={formData.secondAccountNumber}
                    onChange={handleChange('secondAccountNumber')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountBalanceIcon sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            {/* Row 5: Submit Button */}
            {/* <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <CustomButton
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            minWidth: 120,
                            bgcolor: '#E0A64E',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#C89440',
                            }
                        }}
                    >
                        บันทึก
                    </CustomButton>
                </Box>
            </Grid> */}
        </Grid>
    );
};

export default DepositorGuaranteeForm;
