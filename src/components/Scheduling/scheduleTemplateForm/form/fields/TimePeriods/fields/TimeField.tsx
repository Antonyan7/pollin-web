import React, { useEffect, useState } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, TextFieldProps as MuiTextFieldPropsType } from '@mui/material';
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
  const { control, clearErrors, setError, formState } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.${fieldName}`, control });
  const { onChange, ...fieldProps } = field;
  const theme = useTheme();

  const { errors } = formState;

  // Choose opposite time field for current time field;
  const watchedFieldName = fieldName === 'endTime' ? 'startTime' : 'endTime';

  const watchedTimeFieldValue = useWatch({
    name: `timePeriods.${index}.${watchedFieldName}`
  });

  const startBeforeEndErrorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_BEFORE_END_ERROR);
  const endBeforeStartErrorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_AFTER_ERROR);

  const startTimeFieldValue = fieldName === 'startTime' ? field.value : watchedTimeFieldValue;
  const endTimeFieldValue = fieldName === 'endTime' ? field.value : watchedTimeFieldValue;

  const getStartTimeValue = convertToLocale(startTimeFieldValue ?? '');
  const getEndTimeValue = convertToLocale(endTimeFieldValue ?? '');
  const isStartTimeAfterEndTime = getStartTimeValue && getEndTimeValue && getStartTimeValue >= getEndTimeValue;

  useEffect(() => {
    if (isStartTimeAfterEndTime) {
      if (fieldName === 'startTime' && !errors?.timePeriods?.[index]?.startTime?.message) {
        setError(`timePeriods.${index}.startTime`, {
          type: 'invalidTime',
          message: startBeforeEndErrorMessage
        });
      } else if (!errors?.timePeriods?.[index]?.endTime?.message) {
        setError(`timePeriods.${index}.endTime`, {
          type: 'invalidTime',
          message: endBeforeStartErrorMessage
        });
      }
    } else if (errors?.timePeriods?.[index]?.endTime?.message) {
      clearErrors(`timePeriods.${index}.endTime`);
    } else if (errors?.timePeriods?.[index]?.startTime?.message) {
      clearErrors(`timePeriods.${index}.startTime`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartTimeAfterEndTime, watchedTimeFieldValue]);

  const onTimeFieldChange = (newTime: Date | null) => {
    onChange(toLocalIsoString(newTime));
  };

  const initialValue = convertToLocale(field.value ?? '');

  return (
    <div className="schedule-inputs">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          inputRef={field.ref}
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
              helperText={errors?.timePeriods?.[index]?.[fieldName]?.message}
              error={Boolean(errors?.timePeriods?.[index]?.[fieldName]?.message)}
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
