import React, { useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useTheme } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';

interface Props {
  label: string;
  value: string | Date | null;
  setDate: (value: React.SetStateAction<string | Date | null>) => void;
}

const DatePickerField = ({ label, value, setDate }: Props) => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const theme = useTheme();
  const onDateDatePickerOpen = () => {
    setDatePickerOpen(true);
  };

  const onDateDatePickerClose = () => {
    setDatePickerOpen(false);
  };
  const onDateUpdate = (date: Date | null) => {
    if (date && !Number.isNaN(date.getTime())) {
      setDate(format(date, 'yyyy-MM-dd'));
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
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
