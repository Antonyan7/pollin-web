import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { useTheme } from '@mui/system';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { isValid } from 'date-fns';
import { ITemplateGroup } from 'types/create-schedule';

import { convertToLocale, toESTIsoString } from '@utils/dateUtils';

interface ITimeFieldProps {
  index: number;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
}

const TimeField = ({ index, fieldLabel, fieldName }: ITimeFieldProps) => {
  const [t] = useTranslation();
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const { control, formState } = useFormContext<ITemplateGroup>();
  const {
    errors: { timePeriods }
  } = formState;
  const { field } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, value, ...fieldProps } = field;
  const theme = useTheme();
  const timeFieldError = timePeriods?.[index]?.[fieldName];
  const errorMessage =
    fieldName === 'startTime'
      ? t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_ERROR)
      : t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_ERROR);
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
              helperText={timeFieldError?.message && errorMessage}
              error={Boolean(timeFieldError)}
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
