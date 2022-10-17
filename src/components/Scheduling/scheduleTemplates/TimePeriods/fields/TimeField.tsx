import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { useTheme } from '@mui/system';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { isValid } from 'date-fns';
import { ITemplateGroup } from 'types/create-schedule';

import { convertToLocale, toESTIsoString } from '@utils/dateUtils';

interface ITimeFieldProps {
  index: number;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
}

const TimeField = ({ index, fieldLabel, fieldName }: ITimeFieldProps) => {
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const { control } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, value, ...fieldProps } = field;
  const theme = useTheme();
  const onTimeFieldChange = (newTime: Date | null) => {
    if (newTime && isValid(newTime)) {
      onChange(toESTIsoString(newTime));
    }
  };

  const initialValue = convertToLocale(value);

  return (
    <div className="schedule-inputs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          open={openTimePicker}
          onOpen={() => setOpenTimePicker(true)}
          onClose={() => setOpenTimePicker(false)}
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
          DialogProps={{
            sx: {
              '& .MuiPickersToolbar-penIconButton': { display: 'none' }
            }
          }}
          value={initialValue}
          onChange={onTimeFieldChange}
          renderInput={(params: MuiTextFieldPropsType) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                svg: { color: theme.palette.primary.main }
              }}
              {...fieldProps}
              onKeyDown={(e) => e.preventDefault()}
              onClick={() => setOpenTimePicker(true)}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeField;
