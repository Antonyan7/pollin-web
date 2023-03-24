import React from 'react';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

import { DatePickerFieldProps } from '../types';

import ApplyScheduleFormRow from './ApplyScheduleFormRow';

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
