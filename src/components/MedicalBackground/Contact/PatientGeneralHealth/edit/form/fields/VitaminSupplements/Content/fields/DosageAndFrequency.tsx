import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const DosageAndFrequency = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const dosageRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_DOSAGE_AND_FREQUENCY);
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.VitaminSupplements}.items.${titleIndex}.dosage`,
    control
  });
  const errorHelperText = generateErrorMessage(`${label} ${titleIndex + 1}`);

  useScrollIntoView(dosageRef, fieldState);

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...field}
        value={field.value}
        inputRef={dosageRef}
      />
    </Grid>
  );
};

export default DosageAndFrequency;
