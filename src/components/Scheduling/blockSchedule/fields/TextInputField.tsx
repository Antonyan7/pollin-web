import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const TextInputField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { control, formState } = useFormContext<IBlockScheduleForm>();

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { touchedFields, errors } = formState;

  return (
    <TextField
      id={fieldName}
      fullWidth
      helperText={(touchedFields[fieldName] ? errors[fieldName]?.message : '') ?? ''}
      error={Boolean(errors[fieldName]?.message) && touchedFields[fieldName]}
      label={fieldLabel}
      {...field}
    />
  );
};

export default TextInputField;
