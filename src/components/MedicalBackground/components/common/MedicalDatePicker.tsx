import React, { useState } from 'react';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import { styled, TextField, TextFieldProps, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

const CalendarPopupIcon = styled(CalendarTodayTwoTone)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const MedicalDatePicker = ({ label, value, onChange, ...otherProps }: MedicalDatePickerFieldProps) => {
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
      onChange(format(new Date(date), 'yyyy-MM-dd'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        open={datePickerOpen}
        onOpen={onDateDatePickerOpen}
        onClose={onDateDatePickerClose}
        disableMaskedInput
        label={label}
        inputFormat="MMM dd, yyyy"
        value={value}
        disableFuture
        components={{
          OpenPickerIcon: CalendarPopupIcon
        }}
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
          />
        )}
        onChange={(date: Date | null) => onDateUpdate(date)}
        {...otherProps}
      />
    </LocalizationProvider>
  );
};

export default MedicalDatePicker;
