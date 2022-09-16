import React from 'react';
import { useTranslation } from 'react-i18next';
import { roundUpTo } from '@constants';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { values, setFieldValue }: FormikValues = useFormikContext();
  const [t] = useTranslation();

  const initialDate: DateAndStartTimeType = new Date(Math.ceil(values.date.getTime() / roundUpTo) * roundUpTo);
  const dateFieldName = 'date';

  const mobileDateTimeChange = (date: DateAndStartTimeType) => {
    const roundedTime = date ? new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo) : undefined;

    setFieldValue(dateFieldName, roundedTime);
  };

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        label={t(Translation.MODAL_APPOINTMENTS_ADD_TIME_PICKER)}
        value={initialDate}
        onChange={(newDate: DateAndStartTimeType) => mobileDateTimeChange(newDate)}
        minutesStep={10}
        DialogProps={{
          sx: {
            '& div': {
              '& .Mui-disabled': {
                display: 'none'
              }
            }
          }
        }}
        renderInput={(params: TextFieldProps) => (
          <TextField
            {...params}
            fullWidth
            InputProps={{
              endAdornment: <PickerDateIcon />
            }}
          />
        )}
      />
    </Grid>
  );
};

export default DateAndStartTime;
