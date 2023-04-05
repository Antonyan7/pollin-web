import React, { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

export interface FormInputProps {
  fieldName: string;
  label: string;
  index?: number;
}

export const FormInput: FC<FormInputProps> = ({ fieldName, label, index }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });

  const additionalInfo = typeof index === 'number' ? index + 1 : '';

  const errorHelperText = generateErrorMessage(`${label} ${additionalInfo}`);

  return (
    <TextField
      color="primary"
      fullWidth
      label={label}
      helperText={fieldState?.error && errorHelperText}
      error={Boolean(fieldState?.error)}
      {...field}
      value={field.value}
      ref={field.ref}
    />
  );
};

export default FormInput;
