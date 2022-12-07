import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**
 * @param {*} props data to use in display
 * @returns a date selector which can be used to select a date
 */
export default function DateSelector(props) {
    // setSelectedDate is for parent component to know what the date is
    const {label, setSelectedDate} = props;
    const [date, setDate] = useState(null);

    return (
        <div style={{'margin': '1%'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        setSelectedDate(newDate);
                        console.log(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}