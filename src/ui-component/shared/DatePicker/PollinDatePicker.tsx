import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePickerWrapperProps,
  DateTimePickerWrapperProps,
  IPollinDatePickerProps,
  PollinDatePickerType,
  TimePickerWrapperProps
} from 'types/datePicker';

import DatePickerWrapper from '@ui-component/shared/DatePicker/DatePickerWrapper';
import DateTimePickerWrapper from '@ui-component/shared/DatePicker/DateTimePickerWrapper';
import TimePickerWrapper from '@ui-component/shared/DatePicker/TimePickerWrapper';

const PollinDatePicker = (props: IPollinDatePickerProps) => {
  const { type } = props;
  const renderDatePicker = () => {
    switch (type) {
      case PollinDatePickerType.Date:
        return <DatePickerWrapper {...(props?.pickerConfigs as DatePickerWrapperProps)} />;
      case PollinDatePickerType.Time:
        return <TimePickerWrapper {...(props?.pickerConfigs as TimePickerWrapperProps)} />;
      case PollinDatePickerType.DateTime:
        return <DateTimePickerWrapper {...(props?.pickerConfigs as DateTimePickerWrapperProps)} />;
      default:
        return null;
    }
  };

  return <LocalizationProvider dateAdapter={AdapterDateFns}>{renderDatePicker()}</LocalizationProvider>;
};

export default PollinDatePicker;
