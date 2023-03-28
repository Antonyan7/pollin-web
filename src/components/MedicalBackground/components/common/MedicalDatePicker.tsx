import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import { Grid, styled, TextField, TextFieldProps, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { paddings } from 'themes/themeConstants';

import { DateUtil } from '@utils/date/DateUtil';

import { ConsultationTitleWithIcon } from '.';

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
      onChange(DateUtil.formatDateOnly(date));
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

const ControllerDatePicker = ({ name, label, ...otherProps }: { name: string; label: string }) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control
  });

  return <MedicalDatePicker label={label} {...field} {...otherProps} />;
};

export const DatePickerField = ({ label, name, ...otherProps }: { label: string; name: string }) => (
  <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
    <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
      <ConsultationTitleWithIcon description={label ?? ''} />
    </Grid>
    <Grid item xs={7}>
      <ControllerDatePicker label={label} name={name} {...otherProps} />
    </Grid>
  </Grid>
);

export default MedicalDatePicker;
