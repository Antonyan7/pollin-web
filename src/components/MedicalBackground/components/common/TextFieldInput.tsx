import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

interface InputFieldProps {
  label: string;
  fieldName: string;
  index?: number;
}

const InputField = ({ label, fieldName, index }: InputFieldProps) => {
  const { control, register } = useFormContext();
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const errorHelperText =
    index || index === 0 ? generateErrorMessage(`${label} ${index + 1}`) : generateErrorMessage(label);

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...field}
        {...register(fieldName)}
        value={field.value}
      />
    </Grid>
  );
};

export default InputField;
