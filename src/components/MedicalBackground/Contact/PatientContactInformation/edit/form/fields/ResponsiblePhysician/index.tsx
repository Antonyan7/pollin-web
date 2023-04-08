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

const FieldResponsiblePhysician = () => {
  const [t] = useTranslation();
  const fieldLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_MOST_RESPONSIBLE_PHYSICIAN
  );
  const { control } = useFormContext();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const { field } = useController({
    name: `${ContactInformationFormFields.ResponsiblePhysician}.value`,
    control
  });
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!contactInformation?.responsiblePhysician.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} container item direction="row">
      <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={1}>
        <ConsultationTitleWithIcon description={fieldLabel} onClick={onNoteClick} />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2} paddingTop={paddings.top12}>
        <Typography>{field.value}</Typography>
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={ContactInformationFormFields.ResponsiblePhysician}
        />
      </Grid>
    </Grid>
  );
};

export default FieldResponsiblePhysician;
