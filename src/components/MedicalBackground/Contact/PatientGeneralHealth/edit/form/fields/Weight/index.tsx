import React, { useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { witoutZero } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/helpers';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import useScrollIntoView from '@components/MedicalBackground/hooks/useScrollIntoView';
import { Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { generateErrorMessage } from 'helpers/generateErrorMessage';
import { margins, paddings } from 'themes/themeConstants';

const FieldWeight = () => {
  const [t] = useTranslation();
  const weightRef = useRef<HTMLInputElement>(null);
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_WEIGHT);
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const weightInLbs = generalHealth?.weightInLbs;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: `${GeneralHealthFormFields.Weigth}.value`,
    control
  });
  const { onChange, ...fieldProps } = field;
  const errorHelperText = generateErrorMessage(fieldLabel);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!weightInLbs?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  useScrollIntoView(weightRef, fieldState);

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid item container direction="row" alignItems="flex-start" xs={12}>
        <Grid
          item
          container
          xs={5}
          direction="row"
          alignItems="flex-start"
          flexWrap="nowrap"
          gap={2}
          sx={{
            marginTop: margins.top12
          }}
        >
          <ConsultationTitleWithIcon onClick={onNoteClick} description={fieldLabel} />
        </Grid>
        <Grid item container direction="row" xs={7} gap={2}>
          {weightInLbs?.isEditable ? (
            <TextField
              color="primary"
              fullWidth
              label={fieldLabel}
              helperText={fieldState?.error && errorHelperText}
              error={Boolean(fieldState?.error)}
              {...fieldProps}
              onChange={(event) => {
                const currentWeightValue = event.target.value;

                if (witoutZero.test(currentWeightValue) || currentWeightValue.length === 0) {
                  onChange(currentWeightValue)
                }
              }}
              value={fieldProps.value}
              inputRef={weightRef}
            />
          ) : (
            <Typography>{weightInLbs?.value}</Typography>
          )}
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={GeneralHealthFormFields.Weigth}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldWeight;
