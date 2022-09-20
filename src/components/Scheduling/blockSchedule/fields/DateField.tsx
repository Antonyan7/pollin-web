import React from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useFormikContext } from 'formik';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { initialValues } from '../form/initialValues';

const DateField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { values, setFieldValue, handleBlur, touched, errors } = useFormikContext<typeof initialValues>();

  return (
    <DesktopDatePicker
      label={fieldLabel}
      inputFormat="MM/dd/yyyy"
      value={values[fieldName]}
      onChange={(date: Date | null) => date && setFieldValue(fieldName, date)}
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

export default DateField;
