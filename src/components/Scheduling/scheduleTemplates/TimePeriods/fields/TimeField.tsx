import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { useTheme } from '@mui/system';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

import { convertToLocale, toLocalIsoString } from '@utils/dateUtils';

interface ITimeFieldProps {
  index: number;
  fieldLabel: string;
  fieldName: 'startTime' | 'endTime';
  dataCy?: string;
}

const TimeField = ({ index, fieldLabel, fieldName, dataCy }: ITimeFieldProps) => {
  const [t] = useTranslation();
  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const { control, getValues, clearErrors, watch } = useFormContext<ITemplateGroup>();
  const { field, fieldState } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, ...fieldProps } = field;
  const theme = useTheme();
  const { error } = fieldState;
  const [errorMessage, setErrorMessage] = useState<string>('');

  const startBeforeEndError = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_BEFORE_END_ERROR);
  const endBeforeStartError = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_AFTER_ERROR);

  useEffect(() => {
    watch(() => {
      const getStartTimeValue = convertToLocale(getValues().timePeriods?.[index]?.startTime ?? '');
      const getEndTimeValue = convertToLocale(getValues().timePeriods?.[index]?.endTime ?? '');
      const isStartTimeAfterEndTime = getStartTimeValue && getEndTimeValue && getStartTimeValue >= getEndTimeValue;
      const isEndTimeBeforeStartTime = getStartTimeValue && getEndTimeValue && getStartTimeValue < getEndTimeValue;

      if (isStartTimeAfterEndTime) {
        if (fieldName === 'startTime') {
          setErrorMessage(startBeforeEndError);
        } else {
          setErrorMessage(endBeforeStartError);
        }
      } else {
        setErrorMessage('');
      }

      if (isEndTimeBeforeStartTime) {
        clearErrors(`timePeriods.${index}.startTime`);
        clearErrors(`timePeriods.${index}.endTime`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, watch, fieldName, getValues, index, t]);

  const onTimeFieldChange = (newTime: Date | null) => {
    onChange(toLocalIsoString(newTime));
  };
  const timeFieldValue = getValues().timePeriods?.[index]?.[fieldName];
  const initialValue = convertToLocale(timeFieldValue ?? '');

  return (
    <div className="schedule-inputs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          open={openTimePicker}
          onOpen={() => setOpenTimePicker(true)}
          onClose={() => setOpenTimePicker(false)}
          minutesStep={10}
          ampm={false}
          rifmFormatter={(date) => (date ? `${date} [EST]` : '')}
          PopperProps={{
            sx: {
              '& > div > div > div > div > div + div > div': {
                '& .MuiClockNumber-root': {
                  color: theme.palette.primary[800]
                },
                '& .Mui-disabled': {
                  color: theme.palette.primary[200]
                },
                '& .Mui-selected': {
                  color: theme.palette.secondary.light
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
              data-cy={dataCy}
              {...params}
              fullWidth
              sx={{
                svg: { color: theme.palette.primary.main }
              }}
              {...fieldProps}
              helperText={error?.message ?? errorMessage}
              error={Boolean(error?.message) || Boolean(errorMessage)}
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
