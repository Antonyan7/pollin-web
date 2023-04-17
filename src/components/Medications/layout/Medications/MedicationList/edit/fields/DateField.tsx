import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import { PollinDatePickerType } from 'types/datePicker';

import useClinicConfig from '@hooks/clinicConfig/useClinicConfig';
import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

interface DateFieldProps {
  fieldName: string;
  label: string;
}

const DateField = ({ fieldName, label }: DateFieldProps) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;
  const { fitSelectedTimeToConfig } = useClinicConfig();
  const { field } = useController({
    name: fieldName,
    control
  });
  const { onChange, ...fieldProps } = field;
  const initialValue = fieldProps.value ? fitSelectedTimeToConfig(fieldProps.value) : fieldProps.value;

  return (
    <Grid item xs={5.5}>
      <PollinDatePicker
        type={PollinDatePickerType.Date}
        pickerConfigs={{
          renderInputProps: {
            ...fieldProps
          },
          disablePast: true,
          label,
          value: initialValue as Date,
          onChange,
          isLimitedByWorkingHours: true,
          errorMessage: errors?.startDate?.message as string,
          isError: !!errors?.startDate?.message
        }}
      />
    </Grid>
  );
};

export default DateField;
