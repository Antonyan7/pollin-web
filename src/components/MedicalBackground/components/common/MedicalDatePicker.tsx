import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

const MedicalDatePicker = ({
  label,
  value,
  onChange,
  errorHelperText,
  isError,
  inputRef,
  ...otherProps
}: MedicalDatePickerFieldProps) => (
  <PollinDatePicker
    type={PollinDatePickerType.Date}
    pickerConfigs={{
      ...otherProps,
      inputRef,
      label,
      onChange,
      value,
      isLimitedByWorkingHours: false,
      maxDate: DateUtil.representInClinicDate(new Date()),
      isError,
      errorMessage: errorHelperText
    }}
  />
);

export const ControlledDatePicker = ({ fieldName, label, ...otherProps }: { fieldName: string; label: string }) => {
  const { control } = useFormContext();
  const ref = useRef(null);
  const { field, fieldState } = useController({
    name: fieldName,
    control
  });
  const errorMessage = generateErrorMessage(label);
  const errorHelperText = fieldState?.error && errorMessage;

  useScrollIntoView(ref, fieldState);

  return (
    <MedicalDatePicker
      label={label}
      isError={Boolean(fieldState?.error)}
      errorHelperText={errorHelperText}
      inputRef={ref}
      {...field}
      {...otherProps}
    />
  );
};

export default MedicalDatePicker;
