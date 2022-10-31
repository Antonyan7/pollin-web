import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { formatDate, toRoundupTime } from 'helpers/time';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { futureDate180DaysAfter } from '@utils/dateUtils';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { control, formState, getValues } = useFormContext<ICreatedAppointmentBody>();
  const { errors } = formState;
  const [t] = useTranslation();
  const actualDate = getValues('date');
  const [mobileDateTimePickerOpen, setMobileDateTimePickerOpen] = useState<boolean>(false);
  const initialDate: DateAndStartTimeType = toRoundupTime(actualDate);
  const dateFieldName = 'date';

  const { field } = useController({
    name: dateFieldName,
    control
  });
  const { onChange, onBlur, ...fieldProps } = field;

  const mobileDateTimeChange = (date: DateAndStartTimeType) => toRoundupTime(date);

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        components={{
          ActionBar: DatePickerActionBar
        }}
        views={dateTimeViewOptions}
        toolbarFormat="yyyy, MMM dd"
        disablePast
        open={mobileDateTimePickerOpen}
        onOpen={() => setMobileDateTimePickerOpen(true)}
        onClose={() => setMobileDateTimePickerOpen(false)}
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
        label={t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER)}
        value={initialDate}
        onChange={(newDate: DateAndStartTimeType) => onChange(mobileDateTimeChange(newDate))}
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
        renderInput={(params: TextFieldProps) => {
          const formattedDate = formatDate(initialDate as Date);

          const formattedParams = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value: formattedDate
            }
          };

          return (
            <TextField
              {...fieldProps}
              {...formattedParams}
              fullWidth
              sx={{
                '& input, svg': {
                  cursor: 'pointer'
                }
              }}
              onClick={() => setMobileDateTimePickerOpen(true)}
              helperText={errors?.date?.message}
              error={!!errors?.date?.message}
              InputProps={{
                endAdornment: <CalendarIcon />
              }}
            />
          );
        }}
      />
    </Grid>
  );
};

export default DateAndStartTime;
