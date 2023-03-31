import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

import { PollinDatePickerType } from '../../../../../types/datePicker';

type DateAndStartTimeType = Date | null;

const DueDateField = ({ disabled }: { disabled?: boolean }) => {
  const fieldName = 'dueDate';
  const { control, register } = useFormContext();
  const [t] = useTranslation();
  const { field } = useController({
    name: fieldName,
    control
  });
  const { onChange, value } = field;
  const initialValue: DateAndStartTimeType = value;

  return (
    <Grid item xs={12}>
      <PollinDatePicker
        type={PollinDatePickerType.DateTime}
        pickerConfigs={{
          ...register('dueDate'),
          label: t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_DUE_DATE_PLACEHOLDER),
          value: initialValue,
          onChange,
          disabled,
          isLimitedByWorkingHours: false
        }}
      />
    </Grid>
  );
};

export default DueDateField;
