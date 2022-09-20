import React from 'react';
import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { initialValues } from '../form/initialValues';

const TextInputField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { values, handleChange, handleBlur, touched, errors } = useFormikContext<typeof initialValues>();

  return (
    <TextField
      id={fieldName}
      name={fieldName}
      fullWidth
      onBlur={handleBlur(fieldName)}
      helperText={touched[fieldName] ? errors[fieldName] : ''}
      error={Boolean(errors[fieldName]) && touched[fieldName]}
      label={fieldLabel}
      value={values[fieldName]}
      onChange={handleChange}
    />
  );
};

export default TextInputField;
