import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { MedicalDatePickerFieldProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { margins, paddings } from 'themes/themeConstants';
import { PollinDatePickerType } from 'types/datePicker';

import PollinDatePicker from '@ui-component/shared/DatePicker/PollinDatePicker';
import { DateUtil } from '@utils/date/DateUtil';

import MedicalBackgroundNote from './MedicalBackgroundNote';
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

export const DatePickerField = ({ label, name, ...otherProps }: { label: string; name: string }) => {
  const [shouldShowNote, setShouldShowNote] = useState(false);
  const onNoteClick = () => {
    setShouldShowNote((isShown) => !isShown);
  };

  return (
    <Grid container item px={paddings.leftRight32} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <ConsultationTitleWithIcon description={label ?? ''} onClick={onNoteClick} isShown={shouldShowNote} />
      </Grid>
      <Grid container direction="column" xs={7} gap={2}>
        <ControllerDatePicker label={label} name={name} {...otherProps} />
        <MedicalBackgroundNote onClick={onNoteClick} visible={shouldShowNote ?? false} fieldName={name} />
      </Grid>
    </Grid>
  );
};

export default MedicalDatePicker;
