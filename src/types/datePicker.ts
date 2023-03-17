import { TextFieldProps } from '@mui/material';
import { MobileDateTimePickerProps, TimePickerProps } from '@mui/x-date-pickers';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker/DatePicker';

export enum PollinDatePickerType {
  Date = 'date',
  Time = 'time',
  DateTime = 'datetime'
}

interface CustomTimePickerProps {
  isLimitedByWorkingHours?: boolean;
}

export interface TimePickerWrapperProps
  extends Omit<TimePickerProps<Date, Date>, 'renderInput'>,
    CustomTimePickerProps {}

export interface DateTimePickerWrapperProps
  extends Omit<MobileDateTimePickerProps<Date, Date>, 'renderInput'>,
    CustomTimePickerProps {
  renderInputProps?: TextFieldProps;
}

export interface DatePickerWrapperProps extends Omit<DatePickerProps<Date, Date>, 'renderInput'> {}

export interface IPollinDatePickerProps {
  type: PollinDatePickerType;
  pickerConfigs?: TimePickerWrapperProps | DateTimePickerWrapperProps | DatePickerWrapperProps;
}
