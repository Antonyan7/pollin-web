import React, { useEffect, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, TextFieldProps, Theme } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { CalendarOrClockPickerView } from '@mui/x-date-pickers/internals/models';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { UTCTimezone } from 'helpers/constants';
import { toRoundupTime } from 'helpers/time';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import { DatePickerActionBar } from '@ui-component/appointments/DatePickerActionBar';
import {
  changeTimezone,
  customizeDatePickerDefaultValue,
  dateInputValue,
  futureDate180DaysAfter
} from '@utils/dateUtils';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const dateTimeViewOptions: CalendarOrClockPickerView[] = ['day', 'hours', 'minutes'];

type DateAndStartTimeType = Date | null;
type ErrorMessageType = string | null;

const DateField = ({ fieldName }: IFieldRowProps) => {
  const clinicConfigs = useAppSelector(coreSelector.clinicConfigs);
  const {
    workingHours: { start }
  } = clinicConfigs;
  const { control, formState, getValues, clearErrors } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;
  const [t] = useTranslation();
  const [mobileDateTimePickerOpen, setMobileDateTimePickerOpen] = useState<boolean>(false);
  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const startDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_START_DATE_ERROR);
  const endDateErrorMessage = t(Translation.PAGE_SCHEDULING_BLOCK_TEMPLATES_END_DATE_ERROR);
  const startBeforeEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_BEFORE_END_ERROR);
  const startAfterEndMessage = t(Translation.PAGE_SCHEDULING_BLOCK_DATE_START_AFTER_END_ERROR);
  const startTime = new Date(getValues('startDate') as Date).getTime();
  const endTime = new Date(getValues('endDate') as Date).getTime();
  const showDateError = (message: string) => {
    setErrorMessage(message);
    setShowErrorMessage(true);
  };
  const clearDateError = () => {
    setErrorMessage(null);
    setShowErrorMessage(false);
  };

  useEffect(() => {
    switch (errors[fieldName]?.type) {
      case 'required':
        if (fieldName === 'startDate') {
          showDateError(startDateErrorMessage);
        } else {
          showDateError(endDateErrorMessage);
        }

        break;
      case 'max':
        showDateError(startBeforeEndMessage);

        if (startTime < endTime) {
          clearDateError();
        }

        break;
      case 'min':
        showDateError(startAfterEndMessage);

        if (endTime > startTime) {
          clearDateError();
        }

        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, endTime, startTime, errors.startDate, errors.endDate, fieldName, t, errors, getValues]);

  const mobileDateTimeChange = (date: DateAndStartTimeType) => toRoundupTime(date);
  const initialValue: DateAndStartTimeType = toRoundupTime(value);
  const [initialDate, setInitialDate] = useState<DateAndStartTimeType | null>(initialValue);
  const { outWorkingHours, customizeToTimeZone } = useMemo(
    () => customizeDatePickerDefaultValue(initialDate as Date, start),
    [initialDate, start]
  );

  useEffect(
    () => {
      if (outWorkingHours === 0) {
        onChange(mobileDateTimeChange(customizeToTimeZone));
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
    <Grid item xs={12}>
      <MobileDateTimePicker
        components={{ ActionBar: DatePickerActionBar }}
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
        onChange={(newDate: DateAndStartTimeType) => {
          onChange(mobileDateTimeChange(newDate));
          setInitialDate(mobileDateTimeChange(newDate));
        }}
        minutesStep={10}
        DialogProps={{
          sx: {
            '& .MuiTypography-overline': { textTransform: 'capitalize' },
            '& .MuiPickersToolbar-penIconButton': { display: 'none' },
            '& .MuiClock-clock': {
              '& .MuiClockNumber-root': { color: (theme: Theme) => theme.palette.common.black },
              '& .Mui-disabled': { color: (theme: Theme) => theme.palette.grey[500] }
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
              sx={{ '& input, svg': { cursor: 'pointer' } }}
              onClick={() => setMobileDateTimePickerOpen(true)}
              helperText={errors[fieldName]?.message && errorMessage}
              error={Boolean(errors[fieldName]?.message) && showErrorMessage}
              InputProps={{ endAdornment: <CalendarIcon /> }}
            />
          );
        }}
      />
    </Grid>
  );
};

export default DateField;
