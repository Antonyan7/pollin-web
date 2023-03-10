import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

const FieldPreferredName = () => {
  const [t] = useTranslation();
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PREFERRED_NAME);
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const preferredName = contactInformation?.preferredName;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.PreferredName}.value`,
    control
  });
  const errorHelperText = generateErrorMessage(fieldLabel);

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="center" xs={12}>
        <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon description={fieldLabel} />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" xs={7}>
          {preferredName?.isEditable ? (
            <TextField
              color="primary"
              fullWidth
              helperText={fieldState?.error && errorHelperText}
              error={Boolean(fieldState?.error)}
              label={fieldLabel}
              {...field}
              value={field.value}
              ref={field.ref}
            />
          ) : (
            <Typography>{preferredName?.value}</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldPreferredName;
