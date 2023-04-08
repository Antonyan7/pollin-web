import React, { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

const FieldPreferredName = () => {
  const [t] = useTranslation();
  const preferredNameRef = useRef<HTMLInputElement>(null);
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PREFERRED_NAME);
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const preferredName = contactInformation?.preferredName;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.PreferredName}.value`,
    control
  });
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!preferredName?.note);
  const errorHelperText = generateErrorMessage(fieldLabel);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useScrollIntoView(preferredNameRef, fieldState);

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} container item direction="row">
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap">
        <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" xs={7} gap={2}>
        {preferredName?.isEditable ? (
          <TextField
            color="primary"
            fullWidth
            helperText={fieldState?.error && errorHelperText}
            error={Boolean(fieldState?.error)}
            label={fieldLabel}
            {...field}
            value={field.value}
            inputRef={preferredNameRef}
          />
        ) : (
          <Typography>{preferredName?.value}</Typography>
        )}
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={ContactInformationFormFields.PreferredName}
        />
      </Grid>
    </Grid>
  );
};

export default FieldPreferredName;
