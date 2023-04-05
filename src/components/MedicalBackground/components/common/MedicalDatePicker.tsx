import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

const MedicalDatePicker = ({ label, value, onChange, ...otherProps }: MedicalDatePickerFieldProps) => {
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
        maxDate: DateUtil.representInClinicDate(new Date())
      }}
    />
  );
};

export const ControlledDatePicker = ({ fieldName, label, ...otherProps }: { fieldName: string; label: string }) => {
  const { control } = useFormContext();

  const { field } = useController({
    name: fieldName,
    control
  });

  return <MedicalDatePicker label={label} {...field} {...otherProps} />;
};

export default MedicalDatePicker;
