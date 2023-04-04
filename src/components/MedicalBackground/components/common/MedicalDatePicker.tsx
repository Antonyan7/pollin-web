import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

import { ConsultationTitleWithIcon } from '.';

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

const ControllerDatePicker = ({ name, label, ...otherProps }: { name: string; label: string }) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control
  });

  return <MedicalDatePicker label={label} {...field} {...otherProps} />;
};

export const DatePickerField = ({ label, name, ...otherProps }: { label: string; name: string }) => (
  <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
    <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
      <ConsultationTitleWithIcon description={label ?? ''} />
    </Grid>
    <Grid item xs={7}>
      <ControllerDatePicker label={label} name={name} {...otherProps} />
    </Grid>
  </Grid>
);

export default MedicalDatePicker;
