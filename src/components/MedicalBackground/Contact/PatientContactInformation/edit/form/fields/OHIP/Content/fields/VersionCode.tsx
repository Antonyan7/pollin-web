import React, { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { lettersOnly } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/helpers';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const VersionCode = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_OHIP_VERSION_CODE);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.OHIP}.versionCode`,
    control
  });
  const { onChange, ...fieldProps } = field;
  const errorHelperText = generateErrorMessage(label);
  const [errorMessage, setErrorMessage] = useState(errorHelperText);
  const incorrectFormatLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OHIP_VERSION_CODE_INCORRECT
  );

  useEffect(
    () => {
      if (fieldState.error?.type === 'empty') {
        setErrorMessage(errorHelperText);
      } else {
        setErrorMessage(incorrectFormatLabel);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fieldState.error?.type]
  );

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorMessage}
        error={Boolean(fieldState?.error)}
        onChange={(event) => {
          const currentVersionCode = event.target.value;

          if (currentVersionCode.length <= 2) {
            if (lettersOnly.test(currentVersionCode) || currentVersionCode === '') {
              onChange(currentVersionCode);
            }
          }
        }}
        {...fieldProps}
        value={fieldProps.value}
      />
    </Grid>
  );
};

export default VersionCode;
