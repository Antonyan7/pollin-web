import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';

import { PollinDatePickerType } from '../../../../../types/datePicker';
import { IMeasurementListField } from '../../types';

const DateReceivedField = ({ name }: IMeasurementListField) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control
  });

  const [t] = useTranslation();
  const { value } = field;

  const onDateChange = (date: Date | null) => {
    if (date) {
      field.onChange(date);
    }
  };

  return (
    <PollinDatePicker
      type={PollinDatePickerType.Date}
      pickerConfigs={{
        label: t(Translation.PAGE_INPUT_RESULTS_TEST_MEASUREMENT_LIST_FIELD_NAME_DATE_RECEIVED),
        onChange: onDateChange,
        value,
        disableMaskedInput: true
      }}
    />
  );
};

export default DateReceivedField;
