import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

export interface FlexibleDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: React.SetStateAction<string | Date | null>) => void;
  isError?: boolean;
  errorHelperText?: string;
}

const MedicalDatePicker = ({
  label,
  value,
  onChange,
  errorHelperText,
  isError,
  ...otherProps
}: FlexibleDatePickerProps) => {
  const onDateUpdate = (date: Date | null) => {
    if (date) {
      onChange(DateUtil.convertToDateOnly(date));
    }
  };

  return (
    <PollinDatePicker
      type={PollinDatePickerType.Date}
      pickerConfigs={{
        ...otherProps,
        label,
        onChange: onDateUpdate,
        value,
        isLimitedByWorkingHours: false,
        maxDate: DateUtil.representInClinicDate(new Date()),
        isError,
        errorMessage: errorHelperText
      }}
    />
  );
};

export const ControlledDatePicker = ({ fieldName, label, ...otherProps }: { fieldName: string; label: string }) => {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const errorMessage = generateErrorMessage(label);
  const errorHelperText = fieldState?.error && errorMessage;

  return (
    <MedicalDatePicker
      label={label}
      isError={Boolean(fieldState?.error)}
      errorHelperText={errorHelperText}
      {...field}
      {...otherProps}
    />
  );
};

export default MedicalDatePicker;
