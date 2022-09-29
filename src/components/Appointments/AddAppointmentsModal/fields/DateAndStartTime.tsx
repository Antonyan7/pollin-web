import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ICreatedAppointmentBody } from '@axios/managerBooking';
import { roundUpTo } from '@constants';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { getValues, control } = useFormContext<ICreatedAppointmentBody>();
  const [t] = useTranslation();
  const actualDate = getValues('date');
  const [mobileDateTimePickerOpen, setMobileDateTimePickerOpen] = useState<boolean>(false);
  const initialDate: DateAndStartTimeType = actualDate
    ? new Date(Math.ceil(new Date(actualDate).getTime() / roundUpTo) * roundUpTo)
    : null;
  const dateFieldName = 'date';

  const {
    field: { onChange, ...fieldProps }
  } = useController({
    control,
    name: dateFieldName
  });

  const mobileDateTimeChange = (date: DateAndStartTimeType) =>
    date ? new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo) : null;

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        open={mobileDateTimePickerOpen}
        onOpen={() => setMobileDateTimePickerOpen(true)}
        onClose={() => setMobileDateTimePickerOpen(false)}
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        label={t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER)}
        value={initialDate}
        onChange={(newDate: DateAndStartTimeType) => onChange(mobileDateTimeChange(newDate))}
        minutesStep={10}
        DialogProps={{
          sx: {
            '& .MuiPickersToolbar-penIconButton': { display: 'none' },
            '& div': {
              '& .Mui-disabled': {
                display: 'none'
              }
            }
          }
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...fieldProps}
            {...params}
            fullWidth
            sx={{
              '& input, svg': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setMobileDateTimePickerOpen(true)}
            InputProps={{
              endAdornment: <CalendarIcon />
            }}
          />
        )}
      />
    </Grid>
  );
};

export default DateAndStartTime;
