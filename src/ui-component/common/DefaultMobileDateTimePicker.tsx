import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventIcon from '@mui/icons-material/Event';
import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { MobileDateTimePicker, MobileDateTimePickerProps } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { UTCTimezone } from 'helpers/constants';
import { toRoundupTime } from 'helpers/time';

import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import {
  changeTimezone,
  customizeDatePickerDefaultValue,
  dateInputValue,
  futureDate180DaysAfter
} from '@utils/dateUtils';

interface DefaultMobileDateTimePickerProps<TInputDate, TDate>
  extends Omit<MobileDateTimePickerProps<TInputDate, TDate>, 'renderInput'> {
  renderInputProps?: TextFieldProps;
  isLimited?: boolean;
}
export type DateAndStartTimeType = Date | null;

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

const DefaultMobileDateTimePicker = <TInputDate, TDate>({
  renderInputProps,
  value,
  onChange,
  label,
  isLimited = true,
  ...otherProps
}: DefaultMobileDateTimePickerProps<TInputDate, TDate>) => {
  const [t] = useTranslation();
  const clinicConfigs = useAppSelector(coreSelector.clinicConfigs);
  const editModalLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER);
  const {
    workingHours: { start }
  } = clinicConfigs;
  const theme = useTheme();
  const mobileDateTimeChange = (date: DateAndStartTimeType) => toRoundupTime(date);
  const initialValue: DateAndStartTimeType | TInputDate =
    label === editModalLabel ? value : toRoundupTime(value as string);
  const [initialDate, setInitialDate] = useState<DateAndStartTimeType | TInputDate | null>(initialValue);
  const { outWorkingHours, customizeToTimeZone } = useMemo(
    () => customizeDatePickerDefaultValue(initialDate as Date, start),
    [initialDate, start]
  );
  const formattedDate = dateInputValue(changeTimezone(initialDate as string | Date, UTCTimezone));

  const formattedParams = {
    inputProps: {
      value: formattedDate
    }
  };

  const limitParams = {
    ...(isLimited
      ? {
          minTime: MIN_SELECTABLE_DATE_TIME as TDate,
          maxTime: MAX_SELECTABLE_DATE_TIME as TDate,
          maxDate: futureDate180DaysAfter as TDate,
          disablePast: true
        }
      : {})
  };

  useEffect(
    () => {
      if (initialValue) {
        setInitialDate(initialValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );

  useEffect(
    () => {
      if (outWorkingHours === 0) {
        onChange(mobileDateTimeChange(customizeToTimeZone) as TDate);
        setInitialDate(mobileDateTimeChange(customizeToTimeZone));
      }

      if (!value) {
        setInitialDate(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [outWorkingHours, initialDate, customizeToTimeZone, value]
  );

  return (
    <MobileDateTimePicker
      {...otherProps}
      views={dateTimeViewOptions}
      value={value}
      onChange={onChange}
      components={{ ActionBar: DatePickerActionBar }}
      ampm={false}
      label={label}
      {...limitParams} // Don't allow to select days for future more than 180 days
      minutesStep={10}
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
          {...formattedParams}
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
    />
  );
};

export default DefaultMobileDateTimePicker;
