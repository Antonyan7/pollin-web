import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const PharmacyPhoneNumber = () => {
  const [t] = useTranslation();
  const label = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_PHARMACY_FIELDS_PHONE_NUMBER
  );
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.Pharmacy}.address.phoneNumber`,
    control
  });
  const errorHelperText = generateErrorMessage(label);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  useScrollIntoView(phoneNumberRef, fieldState);

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
        ref={phoneNumberRef}
      />
    </Grid>
  );
};

export default PharmacyPhoneNumber;
