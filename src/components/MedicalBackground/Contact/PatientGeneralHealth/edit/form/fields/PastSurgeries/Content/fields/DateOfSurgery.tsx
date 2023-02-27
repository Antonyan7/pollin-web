import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MedicalDatePicker from '@components/MedicalBackground/components/common/MedicalDatePicker';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid } from '@mui/material';
import { Translation } from 'constants/translations';

const DateOfSurgery = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.PastSurgeries}.items.${titleIndex}.dateOfSurgery`,
    control
  });

  return (
    <Grid item xs={6}>
      <MedicalDatePicker
        label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY_DATE)}
        value={field.value}
        onChange={field.onChange}
      />
    </Grid>
  );
};

export default DateOfSurgery;
