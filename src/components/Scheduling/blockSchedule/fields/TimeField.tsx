import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { TextField, useTheme } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const TimeField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const [openTimePicker, setOpenTimePicker] = useState(false);
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
      open={openTimePicker}
      onOpen={() => setOpenTimePicker(true)}
      onClose={() => setOpenTimePicker(false)}
      label={fieldLabel}
      value={value}
      onChange={(date: Date | null) => date && onChange(date)}
      minTime={MIN_SELECTABLE_DATE_TIME}
      maxTime={MAX_SELECTABLE_DATE_TIME}
      minutesStep={10}
      ampm={false}
      rifmFormatter={(date) => (date ? `${date} [EST]` : '')}
      DialogProps={{
        sx: {
          '& .MuiPickersToolbar-penIconButton': { display: 'none' }
        }
      }}
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
            svg: { color: theme.palette.primary.main }
          }}
          helperText={errors[fieldName]?.message ?? ''}
          error={Boolean(errors[fieldName]?.message)}
          {...fieldProps}
          focused={openTimePicker}
          onKeyDown={(e) => e.preventDefault()}
          onClick={() => setOpenTimePicker(true)}
        />
      )}
    />
  );
};

export default TimeField;
