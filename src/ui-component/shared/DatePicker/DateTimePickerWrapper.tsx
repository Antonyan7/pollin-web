import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { DateTimePickerWrapperProps } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { dateTimeDisplayFormat } from '@utils/date/DateUtil';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

const DateTimePickerWrapper = ({
  renderInputProps,
  value,
  onChange,
  label,
  ...otherProps
}: DateTimePickerWrapperProps) => {
  const theme = useTheme();
  const { MIN_SELECTABLE_DATE_TIME, MAX_SELECTABLE_DATE_TIME, futureDate180DaysLimit, fitSelectedTimeToConfig } =
    useClinicConfig();
  const { isLimitedByWorkingHours } = otherProps;

  return (
    <MobileDateTimePicker
      views={dateTimeViewOptions}
      value={value}
      onChange={(date) => (isLimitedByWorkingHours ? onChange(fitSelectedTimeToConfig(date) as Date) : onChange(date))}
      components={{ ActionBar: DatePickerActionBar }}
      ampm={false}
      label={label}
      minutesStep={10}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      maxDate={futureDate180DaysLimit}
      inputFormat={dateTimeDisplayFormat}
      DialogProps={{
        ...otherProps.DialogProps,
        sx: {
          '& .MuiPickersToolbar-penIconButton': { display: 'none' },
          '& .MuiTypography-overline': { textTransform: 'capitalize' },
          '& .MuiClock-clock': {
            '& .MuiClockNumber-root': {
              color: theme.palette.primary[800]
            },
            '& .Mui-disabled': {
              color: theme.palette.primary[200]
            },
            '& .Mui-selected': {
              color: theme.palette.secondary.light
            }
          }
        }
      }}
      renderInput={(params: TextFieldProps) => (
        <TextField
          {...params}
          sx={{
            svg: { color: theme.palette.primary.main }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: <EventIcon />
          }}
          fullWidth
          {...renderInputProps}
        />
      )}
      {...otherProps}
    />
  );
};

export default DateTimePickerWrapper;
