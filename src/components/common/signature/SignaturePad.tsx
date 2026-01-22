/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import { Box, Typography, Paper, useTheme, alpha, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface SignaturePadProps {
    onChange?: (signatureData: string | null) => void;
    label?: string;
    description?: string;
    width?: number | string;
    height?: number;
    disabled?: boolean;
    initialData?: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
}

export interface SignaturePadRef {
    clear: () => void;
    isEmpty: () => boolean;
    getTrimmedCanvas: () => HTMLCanvasElement;
    toDataURL: () => string;
}

const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(({
    onChange,
    label = "ลงลายมือชื่อ",
    description,
    height = 200,
    disabled = false,
    initialData,
    required = false,
    error = false,
    helperText
}, ref) => {
    const theme = useTheme();
    const sigPadRef = useRef<ReactSignatureCanvas>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [canvasWidth, setCanvasWidth] = useState<number>(0);

    // Handle resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setCanvasWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', updateWidth);
        updateWidth();

        // Small delay to ensure container is rendered
        setTimeout(updateWidth, 100);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Set initial data
    useEffect(() => {
        if (initialData && sigPadRef.current) {
            sigPadRef.current.fromDataURL(initialData);
            setIsEmpty(false);
        }
    }, [initialData]);

    const handleClear = () => {
        if (sigPadRef.current) {
            sigPadRef.current.clear();
            setIsEmpty(true);
            onChange?.(null);
        }
    };

    useImperativeHandle(ref, () => ({
        clear: handleClear,
        isEmpty: () => sigPadRef.current?.isEmpty() ?? true,
        getTrimmedCanvas: () => {
            if (sigPadRef.current) {
                return sigPadRef.current.getTrimmedCanvas();
            }
            throw new Error("Canvas reference is not available");
        },
        toDataURL: () => {
            if (sigPadRef.current) {
                return sigPadRef.current.toDataURL();
            }
            return "";
        }
    }));

    const handleEnd = () => {
        if (sigPadRef.current) {
            const empty = sigPadRef.current.isEmpty();
            setIsEmpty(empty);
            if (!empty) {
                const data = sigPadRef.current.toDataURL();
                onChange?.(data);
            } else {
                onChange?.(null);
            }
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {(label || description) && (
                <Box sx={{ mb: 0.5 }}>
                    {label && (
                        <Typography variant="subtitle1" fontWeight={600} color={error ? 'error' : 'text.primary'}>
                            {label} {required && <span style={{ color: theme.palette.error.main }}>*</span>}
                        </Typography>
                    )}
                    {description && (
                        <Typography variant="caption" color="text.secondary">
                            {description}
                        </Typography>
                    )}
                </Box>
            )}

            {/* ช่องกรอกรายเซ็น */}
            <Paper
                ref={containerRef}
                elevation={0}
                sx={{
                    position: 'relative',
                    border: `1px solid ${error ? theme.palette.error.main : theme.palette.divider}`,
                    borderRadius: 1.1,
                    overflow: 'hidden',
                    backgroundColor: disabled ? alpha(theme.palette.action.disabledBackground, 0.5) : '#fff',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        borderColor: !disabled && !error ? theme.palette.primary.main : undefined,
                        boxShadow: !disabled && !error ? `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}` : undefined
                    },
                    height: height
                }}
            >
                {canvasWidth > 0 && (
                    <ReactSignatureCanvas
                        ref={sigPadRef}
                        canvasProps={{
                            width: canvasWidth,
                            height: height,
                            className: 'signature-canvas',
                            style: { width: '100%', height: '100%' }
                        }}
                        backgroundColor="transparent"
                        onEnd={handleEnd}
                        clearOnResize={false}
                    />
                )}

                {!disabled && !isEmpty && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1
                        }}
                    >
                        <Tooltip title="ล้างลายเซ็น">
                            <IconButton
                                size="small"
                                onClick={handleClear}
                                sx={{
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                    color: 'error.main',
                                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}

                {isEmpty && !disabled && (
                    <Typography
                        variant="body2"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'text.disabled',
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }}
                    >
                        เซ็นชื่อที่นี่
                    </Typography>
                )}
            </Paper>

            {helperText && (
                <Typography variant="caption" color={error ? 'error' : 'text.secondary'} sx={{ ml: 1 }}>
                    {helperText}
                </Typography>
            )}

            {!isEmpty && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="caption" color="text.secondary">
                        เซ็นชื่อเรียบร้อย
                    </Typography>
                </Box>
            )}
        </Box>
    );
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
