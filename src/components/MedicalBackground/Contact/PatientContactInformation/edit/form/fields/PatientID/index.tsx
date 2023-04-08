import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

const FieldPatientID = () => {
  const [t] = useTranslation();
  const fieldLabel = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_IDENTIFIER);
  const { control } = useFormContext();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!contactInformation?.identifier.note);
  const { field } = useController({
    name: `${ContactInformationFormFields.Identifier}.value`,
    control
  });
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} container item direction="row">
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={1}>
        <ConsultationTitleWithIcon description={fieldLabel} onClick={onNoteClick} />
      </Grid>
      <Grid item container direction="row" paddingTop={paddings.top12} xs={7} gap={2}>
        <Typography>{field.value}</Typography>
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={ContactInformationFormFields.Identifier}
        />
      </Grid>
    </Grid>
  );
};

export default FieldPatientID;
