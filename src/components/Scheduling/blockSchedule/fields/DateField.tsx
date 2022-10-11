import React, { useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField, useTheme } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const DateField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { control, formState } = useFormContext<IBlockScheduleForm>();
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const onDateDatePickerOpen = useCallback(() => {
    setDatePickerOpen(true);
  }, []);

  const onDateDatePickerClose = useCallback(() => {
    setDatePickerOpen(false);
  }, []);

  const { errors } = formState;
  const theme = useTheme();

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  return (
    <DesktopDatePicker
      open={datePickerOpen}
      onOpen={onDateDatePickerOpen}
      onClose={onDateDatePickerClose}
      label={fieldLabel}
      inputFormat="MMM dd, yyy"
      disableMaskedInput
      value={value}
      onChange={(date: Date | null) => date && onChange(date)}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          id={fieldName}
          onClick={() => setDatePickerOpen(true)}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
          sx={{
            svg: { color: theme.palette.secondary.main }
          }}
          helperText={errors[fieldName]?.message ?? ''}
          error={Boolean(errors[fieldName]?.message)}
          {...fieldProps}
        />
      )}
    />
  );
};

export default DateField;
