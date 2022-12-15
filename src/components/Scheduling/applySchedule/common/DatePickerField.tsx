import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePickerFieldProps } from '../types';

import ApplyScheduleFormRow from './ApplyScheduleFormRow';

const DatePickerField = ({ label, value, onChange, errorMessage, ...otherProps }: DatePickerFieldProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const theme = useTheme();

  const onDateDatePickerOpen = () => {
    setDatePickerOpen(true);
  };

  const onDateDatePickerClose = () => {
    setDatePickerOpen(false);
  };
  const onDateUpdate = (date: Date | null) => {
    if (date) {
      onChange(date);
    }
  };

  return (
    <ApplyScheduleFormRow title={label}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          open={datePickerOpen}
          onOpen={onDateDatePickerOpen}
          onClose={onDateDatePickerClose}
          disableMaskedInput
          label={label}
          inputFormat="MMM dd, yyyy"
          value={value}
          renderInput={(params: TextFieldProps) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                svg: { color: theme.palette.primary.main }
              }}
              onClick={() => setDatePickerOpen(true)}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              error={!!errorMessage}
              helperText={errorMessage}
            />
          )}
          onChange={(date: Date | null) => onDateUpdate(date)}
          {...otherProps}
        />
      </LocalizationProvider>
    </ApplyScheduleFormRow>
  );
};

export default DatePickerField;
