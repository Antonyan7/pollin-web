import React, { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { margins, paddings } from 'themes/themeConstants';

const Diet = () => {
  const [t] = useTranslation();
  const dietRef = useRef<HTMLInputElement>(null);
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DIET);
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const diet = generalHealth?.diet;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.Diet}.value`,
    control
  });
  const errorHelperText = generateErrorMessage(fieldLabel);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!diet?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useScrollIntoView(dietRef, fieldState);

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="flex-start" xs={12}>
        <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2} sx={{
          marginTop: margins.top12
        }}>
          <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
        </Grid>
        <Grid item container direction="row" gap={2} xs={7}>
          {diet?.isEditable ? (
            <TextField
              color="primary"
              fullWidth
              helperText={fieldState?.error && errorHelperText}
              error={Boolean(fieldState?.error)}
              label={fieldLabel}
              {...field}
              value={field.value}
              inputRef={dietRef}
            />
          ) : (
            <Typography>{diet?.value}</Typography>
          )}
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={GeneralHealthFormFields.Diet}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Diet;
