import React, { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { witoutZero } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const Feet = () => {
  const [t] = useTranslation();
  const feetRef = useRef<HTMLInputElement>(null);
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FEET);
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.Height}.feet`,
    control
  });
  const errorHelperText = generateErrorMessage(label);
  const { onChange, ...fieldProps } = field;

  useScrollIntoView(feetRef, fieldState);

  return (
    <Grid item xs={6}>
      <TextField
        color="primary"
        fullWidth
        label={label}
        helperText={fieldState?.error && errorHelperText}
        error={Boolean(fieldState?.error)}
        {...fieldProps}
        onChange={(event) => {
          const currentFeetValue = event.target.value;

          if (witoutZero.test(currentFeetValue) || currentFeetValue.length === 0) {
            onChange(currentFeetValue)
          }
        }}
        inputRef={feetRef}
        value={fieldProps.value}
      />
    </Grid>
  );
};

export default Feet;
