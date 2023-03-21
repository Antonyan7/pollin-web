import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const FormInput = ({ name, label, index }: { name: string; label: string; index?: number }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
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
