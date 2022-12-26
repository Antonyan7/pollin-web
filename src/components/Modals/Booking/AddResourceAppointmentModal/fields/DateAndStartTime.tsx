import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreateAppointmentBody } from '@axios/booking/managerBookingTypes';
import { Grid, TextField, TextFieldProps, useTheme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { CypressIds } from 'constants/cypressIds';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { UTCTimezone } from 'helpers/constants';
import { toRoundupTime } from 'helpers/time';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { changeTimezone, dateInputValue, futureDate180DaysAfter } from '@utils/dateUtils';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { control, formState, getValues } = useFormContext<ICreateAppointmentBody>();
  const { errors } = formState;
  const [t] = useTranslation();
  const actualDate = getValues('date');
  const [mobileDateTimePickerOpen, setMobileDateTimePickerOpen] = useState<boolean>(false);
  const initialDate: DateAndStartTimeType = toRoundupTime(actualDate);
  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER);
  const dateAndStartTimeCyId = CypressIds.MODAL_APPOINTMENTS_ADD_DATE_AND_START_TIME;
  const dateAndStartTimeDialogCyId = CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG;
  const dateAndStartTimeDialogComponentCyId = CypressIds.COMMON_TIME_PICKER_MODAL_DIALOG_COMPONENT;
  const theme = useTheme();
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
        ampm={false}
        views={dateTimeViewOptions}
        toolbarFormat="yyyy, MMM dd"
        disablePast
        open={mobileDateTimePickerOpen}
        onOpen={() => setMobileDateTimePickerOpen(true)}
        onClose={() => setMobileDateTimePickerOpen(false)}
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
        label={dateAndStartTimeLabel}
        value={initialDate}
        onChange={(newDate: DateAndStartTimeType) => onChange(mobileDateTimeChange(newDate))}
        minutesStep={10}
        DialogProps={{
          PaperProps: {
            'data-cy': dateAndStartTimeDialogComponentCyId
          },
          'data-cy': dateAndStartTimeDialogCyId,
          sx: {
            '& .MuiPickersToolbar-penIconButton': { display: 'none' },
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
        renderInput={(params: TextFieldProps) => {
          const formattedDate = dateInputValue(changeTimezone(initialDate as string | Date, UTCTimezone));

          const formattedParams = {
            ...params,
            inputProps: {
              ...params.inputProps,
              value: formattedDate,
              'data-cy': dateAndStartTimeCyId
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
