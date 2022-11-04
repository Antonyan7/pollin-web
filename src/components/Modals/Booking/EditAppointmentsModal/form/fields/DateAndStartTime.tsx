import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { UTCTimezone } from 'helpers/constants';
import { toRoundupTime } from 'helpers/time';

import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';
import { changeTimezone, dateInputValue, futureDate180DaysAfter } from '@utils/dateUtils';

import { IFormValues } from '../types';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const dateFieldName = 'appointment.date';
  const details = useAppSelector(bookingSelector.appointmentDetails);

  const [t] = useTranslation();
  const { control } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({
    name: dateFieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  const getMobileDateTime = (date: DateAndStartTimeType) => toRoundupTime(date);

  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER);

  useEffect(() => {
    if (field.value && !(details?.appointment?.date === field.value)) {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(false));
    } else {
      dispatch(bookingMiddleware.setEditSaveButtonDisabled(true));
    }
  }, [details?.appointment?.date, field.value]);

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        components={{
          ActionBar: DatePickerActionBar
        }}
        label={dateAndStartTimeLabel}
        disablePast
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
        value={value}
        minutesStep={10}
        DialogProps={{
          sx: {
            '& .MuiPickersToolbar-penIconButton': { display: 'none' },
            '& .MuiClock-clock': {
              '& .Mui-disabled': {
                display: 'none'
              }
            }
          }
        }}
        onChange={(date: DateAndStartTimeType) => onChange(getMobileDateTime(date))}
        renderInput={(params: TextFieldProps) => {
          const formattedDate = dateInputValue(changeTimezone(value as string | Date, UTCTimezone));

          const formattedParams = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value: formattedDate
            }
          };

          return (
            <TextField
              {...formattedParams}
              fullWidth
              InputProps={{
                endAdornment: <PickerDateIcon />
              }}
              {...fieldProps}
            />
          );
        }}
      />
    </Grid>
  );
};

export default DateAndStartTime;
