import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const FieldBmi = () => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const bmi = generalHealth?.bmi;
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BMI);
  const { control } = useFormContext();
  const { field } = useController({
    name: `${GeneralHealthFormFields.Bmi}.value`,
    control
  });
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!bmi?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight32} py={paddings.topBottom12} xs={12} container item direction="row">
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={1}>
        <ConsultationTitleWithIcon description={fieldLabel} onClick={onNoteClick} />
      </Grid>
      <Grid item container direction="row" gap={2} xs={7} pt={paddings.top12}>
        <Typography>{field.value}</Typography>
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={GeneralHealthFormFields.Bmi}
        />
      </Grid>
    </Grid>
  );
};

export default FieldBmi;
