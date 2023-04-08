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
import { generateErrorMessage } from 'helpers/generateErrorMessage';

const DateOfSurgery = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.PastSurgeries}.items.${titleIndex}.dateOfSurgery`,
    control
  });
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY_DATE);
  const errorMessage = generateErrorMessage(`${label} ${titleIndex + 1}`);
  const errorHelperText = fieldState?.error && errorMessage;

  return (
    <Grid item xs={6}>
      <MedicalDatePicker
        label={label}
        value={field.value}
        onChange={field.onChange}
        isError={Boolean(fieldState?.error)}
        errorHelperText={errorHelperText}
      />
    </Grid>
  );
};

export default DateOfSurgery;
