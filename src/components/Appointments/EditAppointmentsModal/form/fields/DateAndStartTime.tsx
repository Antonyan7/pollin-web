import React from 'react';
import { useTranslation } from 'react-i18next';
import { roundUpTo } from '@constants';
import { Grid, TextField, TextFieldProps } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { FormikValues, useFormikContext } from 'formik';

import { PickerDateIcon } from '@ui-component/common/TimeDateIcons';

type DateAndStartTimeType = Date | null;

const DateAndStartTime: React.FC = () => {
  const { values, setFieldValue }: FormikValues = useFormikContext();
  const [t] = useTranslation();

  const initialDate: DateAndStartTimeType = values.date;
  const dateFieldName = 'date';

  const mobileDateTimeChange = (date: DateAndStartTimeType) => {
    const roundedTime = date ? new Date(Math.ceil(date.getTime() / roundUpTo) * roundUpTo) : undefined;

    setFieldValue(dateFieldName, roundedTime);
  };

  const dateAndStartTimeLabel = t(Translation.MODAL_APPOINTMENTS_EDIT_TIME_PICKER);

  return (
    <Grid item xs={12}>
      <MobileDateTimePicker
        label={dateAndStartTimeLabel}
        minTime={MIN_SELECTABLE_DATE_TIME}
        maxTime={MAX_SELECTABLE_DATE_TIME}
        value={initialDate}
        onChange={(date: Date | null) => mobileDateTimeChange(date)}
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
