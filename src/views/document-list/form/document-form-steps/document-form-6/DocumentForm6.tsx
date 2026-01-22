"use client";
import { useState } from 'react';
import { Box } from "@mui/material";
import DamageInspectionForm from './DamageInspectionForm';
import DamageListForm from './DamageListForm';
import DamageImageForm from './DamageImageForm';

const DocumentForm6 = () => {
    const [actualCompletionDate, setActualCompletionDate] = useState<string>('');

    return (
        <Box sx={{ p: 3, display: "flex", flexDirection: "column" }}>
            <DamageInspectionForm
                actualCompletionDate={actualCompletionDate}
                onDateChange={setActualCompletionDate}
                // Mock data for display as per example
                startDate="01/01/2026"
                endDate="31/01/2026"
                totalDays={30}
                overdueDays={5}
            />

            <DamageListForm />

            <DamageImageForm />
        </Box>
    )
}

export default DocumentForm6