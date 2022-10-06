import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const DateField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { control, formState } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  return (
    <DesktopDatePicker
      label={fieldLabel}
      inputFormat="MM/dd/yyyy"
      value={value}
      onChange={(date: Date | null) => date && onChange(date)}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          id={fieldName}
          helperText={errors[fieldName]?.message ?? ''}
          error={Boolean(errors[fieldName]?.message)}
          {...fieldProps}
        />
      )}
    />
  );
};

export default DateField;
