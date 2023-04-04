import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSamePrimaryContext } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/hooks/useSamePrimaryContext';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const UnitNumber = () => {
  const [t] = useTranslation();
  const { isSameAddressChecked } = useSamePrimaryContext();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MANUALLY_MODAL_UNIT_NUMBER);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.MailingAddress}.unitNumber`,
    control
  });
  const errorHelperText = generateErrorMessage(label);

  return (
    <Grid item xs={6} sx={{
      display: isSameAddressChecked ? 'none' : 'block'
    }}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...field}
        value={field.value}
        ref={field.ref}
      />
    </Grid>
  );
};

export default UnitNumber;
