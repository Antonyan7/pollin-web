import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { TextField, useTheme } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MAX_SELECTABLE_DATE_TIME, MIN_SELECTABLE_DATE_TIME } from 'constants/time';
import { Translation } from 'constants/translations';

import { IFieldRowProps } from '../form/IFieldRowProps';
import { IBlockScheduleForm } from '../form/initialValues';

const TimeField = ({ fieldLabel, fieldName }: IFieldRowProps) => {
  const [t] = useTranslation();
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const { control, formState, clearErrors, watch, getValues } = useFormContext<IBlockScheduleForm>();
  const { errors } = formState;
  const theme = useTheme();

  const { field } = useController<IBlockScheduleForm>({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    switch (errors[fieldName]?.type) {
      case 'required': {
        if (fieldName === 'startTime') {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_START_ERROR));
        } else {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_END_ERROR));
        }

        break;
      }

      default:
        break;
    }
  }, [clearErrors, errors.startTime, errors.endTime, fieldName, t, errors]);

  useEffect(() => {
    watch(() => {
      const getStartTimeValue = new Date(getValues().startTime ?? '');
      const getEndTimeValue = new Date(getValues().endTime ?? '');
      const isStartTimeBeforeEndTime = getStartTimeValue && getEndTimeValue && getStartTimeValue < getEndTimeValue;
      const isStartTimeAfterEndTime =
        getStartTimeValue && getEndTimeValue && getStartTimeValue.getTime() >= getEndTimeValue.getTime();

      if (isStartTimeAfterEndTime) {
        if (fieldName === 'startTime') {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_TIME_START_AFTER_END_ERROR));
        } else {
          setErrorMessage(t(Translation.PAGE_SCHEDULING_BLOCK_TIME_END_AFTER_END_ERROR));
        }
      } else {
        setErrorMessage('');
      }

      if (isStartTimeBeforeEndTime) {
        clearErrors('startTime');
        clearErrors('endTime');
      }
    });
  }, [clearErrors, watch, fieldName, getValues, t]);

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
          helperText={errorMessage}
          error={Boolean(errorMessage)}
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
