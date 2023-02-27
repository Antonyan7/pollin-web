import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';

const SurgeryType = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.PastSurgeries}.items.${titleIndex}.typeOfSurgery`,
    control
  });

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY_TYPE)}
        {...field}
        value={field.value}
        ref={field.ref}
      />
    </Grid>
  );
};

export default SurgeryType;
