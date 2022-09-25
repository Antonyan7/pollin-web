import React from 'react';
import { TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { useFormikContext } from 'formik';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { initialValues } from '../form/initialValues';

const TimeField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { values, setFieldValue, handleBlur, touched, errors } = useFormikContext<typeof initialValues>();

  return (
    <TimePicker
      label={fieldLabel}
      value={values[fieldName]}
      onChange={(date: Date | null) => date && setFieldValue(fieldName, date)}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      minutesStep={10}
      PopperProps={{
        sx: {
          '& > div > div > div > div > div + div > div': {
            '& .Mui-disabled': {
              display: 'none'
            }
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          name={fieldName}
          id={fieldName}
          onBlur={handleBlur(fieldName)}
          helperText={touched[fieldName] ? errors[fieldName] : ''}
          error={Boolean(errors[fieldName]) && touched[fieldName]}
        />
      )}
    />
  );
};

export default TimeField;
