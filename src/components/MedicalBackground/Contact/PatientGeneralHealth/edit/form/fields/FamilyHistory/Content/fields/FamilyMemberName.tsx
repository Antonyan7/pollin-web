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

const FamilyMemberName = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const familyMemberRef = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM_FAMILY_MEMBER);
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.FamilyHistory}.items.${titleIndex}.familyMemberName`,
    control
  });
  const errorHelperText = generateErrorMessage(`${label} ${titleIndex + 1}`);

  useScrollIntoView(familyMemberRef, fieldState);

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
        inputRef={familyMemberRef}
      />
    </Grid>
  );
};

export default FamilyMemberName;
