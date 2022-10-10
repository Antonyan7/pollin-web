import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { ITemplateGroup } from 'types/create-schedule';

interface ITimeFieldProps {
  index: number;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
}

const TimeField = ({ index, fieldLabel, fieldName }: ITimeFieldProps) => {
  const { control } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, value, ...fieldProps } = field;

  const onTimeFieldChange = (newTime: Date | null) => {
    if (newTime && !Number.isNaN(newTime.getTime())) {
      onChange(newTime.toISOString());
    }
  };

  return (
    <div className="schedule-inputs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
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
          label={fieldLabel}
          minTime={MIN_SELECTABLE_DATE_TIME}
          maxTime={MAX_SELECTABLE_DATE_TIME}
          value={value}
          onChange={onTimeFieldChange}
          renderInput={(params: MuiTextFieldPropsType) => <TextField {...params} fullWidth {...fieldProps} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeField;
