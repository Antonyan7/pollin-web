import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const VersionCode = () => {
  const [t] = useTranslation();
  const versionCodeRef = useRef<HTMLInputElement>(null);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_OHIP_VERSION_CODE);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.OHIP}.versionCode`,
    control
  });
  const { onChange, ...fieldProps } = field;
  const errorHelperText = generateErrorMessage(label);

  useScrollIntoView(versionCodeRef, fieldState);

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        onChange={(event) => {
          if (event.target.value.length <= 2) {
            onChange(event.target.value)
          }
        }}
        {...fieldProps}
        value={fieldProps.value}
        inputRef={versionCodeRef}
      />
    </Grid>
  );
};

export default VersionCode;
