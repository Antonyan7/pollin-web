import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { CypressIds } from 'constants/cypressIds';
import { DateTimePickerWrapperProps } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { DateAcceptableType, DateUtil } from '@utils/date/DateUtil';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

const DateTimePickerWrapper = ({
  renderInputProps,
  value,
  onChange,
  label,
  isLimitedByWorkingHours,
  errorMessage,
  isError,
  ...otherProps
}: DateTimePickerWrapperProps) => {
  const theme = useTheme();
  const { MIN_SELECTABLE_DATE_TIME, MAX_SELECTABLE_DATE_TIME, futureDate180DaysLimit, fitSelectedTimeToConfig } =
    useClinicConfig();

  return (
    <MobileDateTimePicker
      views={dateTimeViewOptions}
      value={value}
      onChange={(date) => onChange(isLimitedByWorkingHours && date ? (fitSelectedTimeToConfig(date) as Date) : date)}
      components={{ ActionBar: DatePickerActionBar }}
      ampm={false}
      label={label}
      minutesStep={10}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      maxDate={futureDate180DaysLimit}
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
      renderInput={({ ...params }: TextFieldProps) => (
        <TextField
          {...params}
          sx={{
            svg: { color: theme.palette.primary.main }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: <EventIcon />
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            value: params.inputProps?.value
              ? DateUtil.formatFullDate(params.inputProps?.value as DateAcceptableType)
              : params.inputProps?.value
          }}
          fullWidth
          {...renderInputProps}
          error={isError}
          helperText={errorMessage ?? ''}
          data-cy={CypressIds.COMMON_DATE_TIME_PICKER}
        />
      )}
      {...otherProps}
    />
  );
};

export default DateTimePickerWrapper;
