import React, { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  allowedChars,
  replaceOhipNumberFormat
} from '@components/MedicalBackground/Contact/PatientContactInformation/edit/helpers';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const OhipNumber = () => {
  const [t] = useTranslation();
  const ohipRef = useRef<HTMLInputElement>(null);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_OHIP_NUMBER);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.OHIP}.number`,
    control
  });
  const errorHelperText = generateErrorMessage(label);
  const { onChange, onBlur, ...fieldProps } = field;
  const [errorMessage, setErrorMessage] = useState(errorHelperText);
  const incorrectFormatLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OHIP_NUMBER_INCORRECT);

  useScrollIntoView(ohipRef, fieldState);

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
        {...fieldProps}
        onKeyPress={(e) => {
          if (!allowedChars.includes(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          if (e.target.value.length <= 12) {
            const ohipNumber = replaceOhipNumberFormat(e.target.value);

            onChange(ohipNumber);
          }
        }}
        value={fieldProps.value}
        inputRef={ohipRef}
      />
    </Grid>
  );
};

export default OhipNumber;
