/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";;
import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomNumberField from '@/components/mui/CustomNumberField';
import { colors } from '@/configs/colorConfig';
import FormPaper from '../FormPaper';
import CustomIconButton from '@/components/mui/CustomIconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface DamageItem {
    id: number;
    type: string;
    description: string;
    amount: number | null;
}

interface DamageListFormProps {
    onItemsChange?: (items: DamageItem[]) => void;
}

const DamageListForm: React.FC<DamageListFormProps> = ({ onItemsChange }) => {
    const [items, setItems] = useState<DamageItem[]>([
        { id: Date.now(), type: '', description: '', amount: null }
    ]);

    const updateItems = (newItems: DamageItem[]) => {
        setItems(newItems);
        if (onItemsChange) {
            onItemsChange(newItems);
        }
    };

    const handleAddItem = () => {
        updateItems([...items, { id: Date.now(), type: '', description: '', amount: null }]);
    };

    const handleRemoveItem = (id: number) => {
        if (items.length > 1) {
            updateItems(items.filter(item => item.id !== id));
        } else {
            // If it's the last item, just clear the fields
            updateItems([{ id: Date.now(), type: '', description: '', amount: null }]);
        }
    };

    const handleChange = (id: number, field: keyof DamageItem, value: any) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        );
        updateItems(newItems);
    };

    return (
        <Box className="flex flex-col w-full">
            <Box >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        borderBottom: `3px solid ${colors.primary.main}`,
                        display: "inline-block",
                    }}
                >
                    รายการความเสียหาย
                </Typography>
            </Box>
            <FormPaper>
                <Box className="flex flex-col gap-4">
                    {items.map((item, index) => (
                        <Box key={item.id} className="flex flex-col xl:flex-row gap-4 h-full items-start xl:items-center border border-dashed border-gray-400 rounded-lg p-4 xl:border-none xl:p-0">
                            {/* Type Selection */}
                            <Box className="w-full xl:basis-4/12">
                                <FormControl fullWidth>
                                    <InputLabel>ประเภทความเสียหาย</InputLabel>
                                    <Select
                                        sx={{
                                            bgcolor: "background.paper",
                                        }}
                                        value={item.type}
                                        label="ประเภทความเสียหาย"
                                        onChange={(e: SelectChangeEvent) => handleChange(item.id, 'type', e.target.value)}
                                    >
                                        <MenuItem value="sign">ค่าป้าย</MenuItem>
                                        <MenuItem value="clean">ค่าทำความสะอาด</MenuItem>
                                        <MenuItem value="repair">ค่าซ่อมแซม</MenuItem>
                                        <MenuItem value="other">อื่นๆ</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Description */}
                            <Box className="w-full xl:basis-6/12">
                                <TextField
                                    fullWidth
                                    label="ความเสียหาย"
                                    value={item.description}
                                    onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                                />
                            </Box>

                            {/* Amount */}
                            <Box className="w-full xl:basis-2/12">
                                <CustomNumberField
                                    fullWidth
                                    label="ค่าเสียหาย (บาท)"
                                    sx={{
                                        bgcolor: "background.paper",
                                    }}
                                    value={item.amount}
                                    onValueChange={(val) => handleChange(item.id, 'amount', val)}
                                />
                            </Box>

                            {/* Actions */}
                            <Box className="flex w-full xl:w-auto h-full justify-end xl:justify-center items-center">
                                {index === items.length - 1 &&
                                    <Box>
                                        <CustomIconButton
                                            onClick={handleAddItem}
                                            sx={{
                                                backgroundColor: "none",
                                                "&:hover": { backgroundColor: "action.selected" },
                                            }}
                                        >
                                            <AddCircleIcon color='success' sx={{ fontSize: 28 }} />
                                        </CustomIconButton>
                                    </Box>
                                }
                                {index >= 1 &&
                                    <CustomIconButton
                                        onClick={() => handleRemoveItem(item.id)}
                                        sx={{
                                            backgroundColor: "none",
                                            "&:hover": { backgroundColor: "action.selected" },
                                        }}
                                        color="error"
                                    >
                                        <DeleteIcon color='error' sx={{ fontSize: 28 }} />
                                    </CustomIconButton>}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </FormPaper>
        </Box>
    );
};

export default DamageListForm;
