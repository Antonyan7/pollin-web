import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import FirstName from './fields/FirstName';
import LastName from './fields/LastName';
import MiddleName from './fields/MiddleName';

const FieldPatientName = () => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const patientName = contactInformation?.patientName;
  const [showAdditionalNote, setShowAdditionalNote] = useState(false);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid px={paddings.leftRight24} py={paddings.topBottom12} xs={12} gap={4} container item direction="column">
      <Grid
        item
        container
        direction="row"
        alignItems="flex-start"
        sx={{
          marginTop: margins.top10
        }}
        xs={12}
      >
        <Grid item container xs={5} direction="row" alignItems="flex-start" flexWrap="nowrap" gap={2}>
          <ConsultationTitleWithIcon
            onClick={onNoteClick}
            description={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_NAME)}
          />
        </Grid>
        <Grid item container direction="column" gap={2} xs={7}>
          {patientName?.isEditable ? (
            <>
              <FirstName />
              <MiddleName />
              <LastName />
            </>
          ) : (
            <Typography>{`${patientName?.firstName} ${patientName?.middleName ?? ''} ${
              patientName?.lastName
            }`}</Typography>
          )}
          <MedicalBackgroundNote
            onClick={onNoteClick}
            visible={showAdditionalNote}
            fieldName={ContactInformationFormFields.PatientName}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FieldPatientName;
