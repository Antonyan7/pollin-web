import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { paddings } from 'themes/themeConstants';

const CurrentOccupation = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_CURRENT_OCCUPATION
  );
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${BackgroundInformationFormFields.CurrentOccupation}.value`,
    control
  });
  const errorHelperText = generateErrorMessage(fieldLabel);
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="center" xs={12}>
        <Grid item container xs={5} direction="row" alignItems="center" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
        </Grid>
        <Grid item container direction="column" gap={2} justifyContent="space-between" xs={7}>
          <TextField
            helperText={fieldState?.error && errorHelperText}
            error={Boolean(fieldState?.error)}
            label={fieldLabel}
            color="primary"
            fullWidth
            {...field}
            value={field.value}
            ref={field.ref}
          />
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={BackgroundInformationFormFields.CurrentOccupation}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurrentOccupation;
