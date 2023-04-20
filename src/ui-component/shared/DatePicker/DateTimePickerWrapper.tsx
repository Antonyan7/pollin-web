import React, { useCallback } from 'react';
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
  dataCyId,
  ...otherProps
}: DateTimePickerWrapperProps) => {
  const theme = useTheme();
  const { MIN_SELECTABLE_DATE_TIME, MAX_SELECTABLE_DATE_TIME, futureDate180DaysLimit, fitSelectedTimeToConfig } =
    useClinicConfig();

  const handleLimitationConfig = useCallback(
    (date: Date | null) => (isLimitedByWorkingHours && date ? (fitSelectedTimeToConfig(date) as Date) : date),
    [isLimitedByWorkingHours, fitSelectedTimeToConfig]
  );

  return (
    <MobileDateTimePicker
      views={dateTimeViewOptions}
      value={handleLimitationConfig(value)}
      onChange={(date) => onChange(handleLimitationConfig(date))}
      components={{ ActionBar: DatePickerActionBar }}
      ampm={false}
      label={label}
      minutesStep={10}
      minTime={isLimitedByWorkingHours ? MIN_SELECTABLE_DATE_TIME : undefined}
      maxTime={isLimitedByWorkingHours ? MAX_SELECTABLE_DATE_TIME : undefined}
      maxDate={futureDate180DaysLimit}
      DialogProps={{
        ...otherProps.DialogProps
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
          data-cy={dataCyId ?? CypressIds.COMMON_DATE_TIME_PICKER}
        />
      )}
      {...otherProps}
    />
  );
};

export default DateTimePickerWrapper;
