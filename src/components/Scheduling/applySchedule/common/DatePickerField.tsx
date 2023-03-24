import ApplyScheduleFormRow from './ApplyScheduleFormRow';
import { DatePickerFieldProps } from '../types';
import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { PollinDatePickerType } from 'types/datePicker';
import React from 'react';

const DatePickerField = ({ label, value, onChange, errorMessage, ...otherProps }: DatePickerFieldProps) => (
  <ApplyScheduleFormRow title={label}>
    <PollinDatePicker
      type={PollinDatePickerType.Date}
      pickerConfigs={{
        disablePast: true,
        label,
        onChange,
        value,
        isError: !!errorMessage,
        errorMessage,
        ...otherProps
      }}
    />
  </ApplyScheduleFormRow>
);

export default DatePickerField;
