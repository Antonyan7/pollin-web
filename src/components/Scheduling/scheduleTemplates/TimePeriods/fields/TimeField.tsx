import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ISingleTemplate } from 'types/create-schedule';

import { PickerTimeIcon } from '@ui-component/common/TimeDateIcons';

import { TimePeriodsFieldProps } from './TimePeriodsFieldProps';

interface ITimeFieldProps extends TimePeriodsFieldProps {
  singleTemplate: ISingleTemplate;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
}

const TimeField = ({ index, singleTemplate, updateInputValue, fieldLabel, fieldName }: ITimeFieldProps) => {
  const onTimeFieldChange = (newTime: Date | null) => {
    if (newTime && !Number.isNaN(newTime.getTime())) {
      updateInputValue(fieldName, newTime.toISOString(), index);
    }
  };

  return (
    <div className="schedule-inputs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label={fieldLabel}
          ampm={false}
          value={singleTemplate[fieldName]}
          onChange={onTimeFieldChange}
          renderInput={(params: MuiTextFieldPropsType) => (
            <TextField fullWidth {...params} InputProps={{ endAdornment: <PickerTimeIcon /> }} />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeField;
