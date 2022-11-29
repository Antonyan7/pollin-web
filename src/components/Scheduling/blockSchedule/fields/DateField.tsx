import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, TextFieldProps, useTheme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { UTCTimezone } from 'helpers/constants';
import { toRoundupTime } from 'helpers/time';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import { changeTimezone, dateInputValue, futureDate180DaysAfter } from '@utils/dateUtils';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

type DateAndStartTimeType = Date | null;

const DateField = ({ fieldName }: IFieldRowProps) => {
  const { control, formState, getValues, clearErrors } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;
  const [t] = useTranslation();
  const theme = useTheme();
  const [mobileDateTimePickerOpen, setMobileDateTimePickerOpen] = useState<boolean>(false);
  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;
  const [errorMessage, setErrorMessage] = useState('');

  const startDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_START_DATE_ERROR);
  const endDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_END_DATE_ERROR);
  const startBeforeEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_BEFORE_END_ERROR);
  const startAfterEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_AFTER_END_ERROR);

  useEffect(() => {
    switch (errors[fieldName]?.type) {
      case 'required':
        if (fieldName === 'startDate') {
          setErrorMessage(startDateErrorMessage);
        } else {
          setErrorMessage(endDateErrorMessage);
        }

        break;
      case 'max':
        setErrorMessage(startBeforeEndMessage);
        break;
      case 'min':
        setErrorMessage(startAfterEndMessage);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, errors.startDate, errors.endDate, fieldName, t, errors, getValues]);

  const mobileDateTimeChange = (date: DateAndStartTimeType) => toRoundupTime(date);

  const initialDate: DateAndStartTimeType = toRoundupTime(value);

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
        label={
          fieldName === 'startDate'
            ? t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START)
            : t(Translation.PAGE_SCHEDULING_BLOCK_DATE_END)
        }
        value={initialDate}
        onChange={(newDate: DateAndStartTimeType) => onChange(mobileDateTimeChange(newDate))}
        minutesStep={10}
        DialogProps={{
          sx: {
            '& .MuiPickersToolbar-penIconButton': { display: 'none' },
            '& .MuiClock-clock': {
              '& .MuiClockNumber-root': {
                color: theme.palette.common.black
              },
              '& .Mui-disabled': {
                color: theme.palette.grey[500]
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
              helperText={errors[fieldName]?.message && errorMessage}
              error={Boolean(errors[fieldName])}
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

export default DateField;
