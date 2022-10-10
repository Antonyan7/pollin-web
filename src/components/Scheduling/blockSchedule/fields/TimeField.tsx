import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { TextField, useTheme } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const TimeField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const { control, formState } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;
  const theme = useTheme();

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  return (
    <TimePicker
      label={fieldLabel}
      value={value}
      onChange={(date: Date | null) => date && onChange(date)}
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
      components={{
        OpenPickerIcon: WatchLaterIcon
      }}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          id={fieldName}
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

export default TimeField;
