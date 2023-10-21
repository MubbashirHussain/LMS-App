import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type Props = {
    label: string,
    SelectedDate?: CallableFunction,
    sx?: {}
    ClassName?: string
}
export default function BasicDatePicker(props: Props) {
    const { label,
        sx,
        ClassName,
        SelectedDate,
    } = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className={ClassName}
                label={label}
                sx={sx}
                onChange={(e: any) => { SelectedDate && SelectedDate(e) }} />
        </LocalizationProvider>
    );
}