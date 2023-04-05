import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { getYesNoDash } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/helper';
import { Grid, Typography } from '@mui/material';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const CancerPatient = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_CANCER_PATIENT
  );
  const { control } = useFormContext();
  const { field } = useController({
    name: `${BackgroundInformationFormFields.CancerPatient}.value`,
    control
  });
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
          <Typography>{getYesNoDash(field?.value)}</Typography>
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={BackgroundInformationFormFields.CancerPatient}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CancerPatient;
