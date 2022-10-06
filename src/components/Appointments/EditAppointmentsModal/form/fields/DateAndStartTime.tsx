import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { roundUpTo } from '@constants';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

import { IFormValues } from '../types';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const dateFieldName = 'appointment.date';

  const [t] = useTranslation();
  const { control } = useFormContext<IFormValues>();
  const { field } = useController<IFormValues>({
    name: dateFieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  const getMobileDateTime = (date: DateAndStartTimeType) =>
    date ? new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo) : null;

  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER);

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        label={dateAndStartTimeLabel}
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        value={value}
        onChange={(date: Date | null) => onChange(getMobileDateTime(date))}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            fullWidth
            InputProps={{
              endAdornment: <PickerDateIcon />
            }}
            {...fieldProps}
          />
        )}
      />
    </Grid>
  );
};

export default DateAndStartTime;
