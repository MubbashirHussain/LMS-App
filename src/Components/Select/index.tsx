import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type Optionstype = {
    value: string | number | symbol | boolean,
    text: string,
}[]
type Props = {
    id?: string,
    label: string,
    Options: Optionstype,
    onChangeEvt?: CallableFunction,
    sx?: React.CSSProperties,
    disabled?: boolean,
    fullWidth?: boolean,
    Readonly?: boolean,
    ClassName?: string,
    Selected?: number | string | symbol | boolean,
    Name?: string,
    Size?: "small" | "medium",
    Margin?: 'dense' | "none",
    variant?: 'filled' | 'outlined' | 'standard'
    PreColors?: "primary" | "secondary" | "error" | "info" | "success" | "warning"
}
export default function SelectSmall(props: Props) {
    const { label, Options, onChangeEvt, sx, Selected, Name, variant, ClassName, Size, Margin, PreColors, id, disabled, fullWidth, Readonly } = props
    const [select, setselect] = React.useState<any>(Selected ?? '');

    return (
        <FormControl sx={sx} variant={variant} className={ClassName} color={PreColors} disabled={disabled} fullWidth={fullWidth} size={Size ? Size : "small"} >
            <InputLabel id="demo-select-meduim-label">{label}</InputLabel >
            <Select labelId="demo-select-meduim-label"
                margin={Margin}
                id={id}
                defaultValue={null}
                inputProps={{ readOnly: Readonly }}
                name={Name}
                value={select} label={label} onChange={(e) => {
                    setselect(e.target.value);
                    onChangeEvt && onChangeEvt(e)
                }}>
                {Options.map((x: any, i: number) => {
                    return (
                        <MenuItem key={i} selected={x.selected ?? false} value={x.value}>{x.text}</MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}