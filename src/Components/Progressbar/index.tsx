import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import React from 'react';

type Props = {
    progressValue: number
    ClassName?: string,
    PreColor?: "error" | "info" | "inherit" | "primary" | "secondary" | "success" | "warning"
    Variant?: "determinate" | "indeterminate" | "buffer" | "query"
    sx?: React.CSSProperties
}

export default function LinearDeterminate(props: Props) {
    const { progressValue, ClassName, sx, PreColor, Variant } = props
    return (
        <Box className={ClassName} sx={{ ...sx, width: '100%' }}>
            <LinearProgress variant={Variant ?? "determinate"} color={PreColor} value={progressValue} />
        </Box>
    );
}