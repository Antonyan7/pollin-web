import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import { Grid, styled } from '@mui/material';
import { Translation } from 'constants/translations';
import { toRoundupTime } from 'helpers/time';

import DefaultMobileDateTimePicker from '@ui-component/common/DefaultMobileDateTimePicker';

type DateAndStartTimeType = Date | null;

const DueDateField = ({ disabled }: { disabled?: boolean }) => {
  const CalendarPopupIcon = styled(CalendarTodayTwoTone)(({ theme }) => ({
    color: theme.palette.primary.main
  }));
  const fieldName = 'dueDate';
  const { control, register } = useFormContext();
  const [t] = useTranslation();
  const { field } = useController({
    name: fieldName,
    control
  });
  const { onChange, value, ...fieldProps } = field;
  const initialValue: DateAndStartTimeType = toRoundupTime(value);

  return (
    <Grid item xs={12}>
      <DefaultMobileDateTimePicker
        {...register('dueDate')}
        label={t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_DUE_DATE_PLACEHOLDER)}
        value={initialValue}
        disabled={disabled}
        isLimited={false}
        onChange={onChange}
        renderInputProps={{
          ...fieldProps,
          InputProps: {
            endAdornment: <CalendarPopupIcon />
          }
        }}
      />
    </Grid>
  );
};

export default DueDateField;
