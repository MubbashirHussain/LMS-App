import * as React from 'react';
import TextField from '@mui/material/TextField';




type Props = {
    id?: string
    label: string,
    Name?: string,
    Value?: string | number | boolean,
    Error?: boolean,
    maxRows?: number,
    ClassName?: string,
    Readonly?: boolean,
    Required?: boolean,
    disabled?: boolean,
    fullWidth?: boolean,
    Multiline?: boolean,
    placeholder?: string,
    sx?: React.CSSProperties,
    Size?: "small" | "medium",
    Margin?: "normal" | 'dense',
    onChangeEvt?: CallableFunction,
    onkeyDownEvt?: CallableFunction,
    type?: React.HTMLInputTypeAttribute;
    Variant?: "filled" | "outlined" | "standard"
    PreColors?: "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

export default function BasicTextFields(props: Props) {
    const {
        id,
        sx,
        type,
        Name,
        Size,
        Value,
        Error,
        label,
        Margin,
        maxRows,
        Variant,
        Readonly,
        Required,
        disabled,
        ClassName,
        Multiline,
        fullWidth,
        PreColors,
        onChangeEvt,
        placeholder,
        onkeyDownEvt,
    } = props
    return (
        <TextField
            sx={sx}
            name={Name}
            type={type}
            value={Value}
            size={Size}
            error={Error}
            label={label}
            id={id && id}
            margin={Margin}
            variant={Variant}
            color={PreColors}
            disabled={disabled}
            required={Required}
            fullWidth={fullWidth}
            className={ClassName}
            multiline={Multiline}
            placeholder={placeholder}
            InputProps={{ readOnly: Readonly, }}
            maxRows={maxRows ?? undefined}
            onKeyDown={(e: any) => onkeyDownEvt && onkeyDownEvt(e)}
            onChange={(e: any) => onChangeEvt && onChangeEvt(e)}
        />
    );
}