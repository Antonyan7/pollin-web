import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import Diagram from '@components/MedicalBackground/components/common/Diagram';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import FamilyDoctorContent from './Content';
import Title from './Title';

const FieldFamilyPhysician = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_FAMILY_PHYSICIAN);
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const familyDoctor = patientBackgroundInformation?.familyDoctor;
  const [isDoctorNameVisible, setIsDoctorNameVisible] = useState(Boolean(familyDoctor?.value));
  const fieldName = BackgroundInformationFormFields.FamilyDoctor;
  const onFamilyDoctorChange = (state: boolean) => {
    setIsDoctorNameVisible(state);
  };
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!familyDoctor?.note);
  const onNoteClick = () => {
    setShowAdditionalNote(!showAdditionalNote);
  };

  return (
    <Grid container item px={paddings.leftRight24} py={paddings.topBottom16} direction="row" xs={12}>
      <Grid
        item
        container
        direction="row"
        xs={5}
        alignItems="flex-start"
        flexWrap="nowrap"
        gap={1}
        sx={{
          marginTop: margins.top10
        }}
      >
        <ConsultationTitleWithIcon onClick={onNoteClick} description={label} />
      </Grid>
      <Grid item container direction="column" xs={7} gap={2}>
        <Grid>
          <MedicalFormRadio fieldName={`${fieldName}.value`} onChangeState={onFamilyDoctorChange} />
        </Grid>
        {isDoctorNameVisible ? (
          <Grid>
            <Diagram titleComponent={<Title />}>
              <FamilyDoctorContent />
            </Diagram>
          </Grid>
        ) : null}
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.FamilyDoctor}
        />
      </Grid>
    </Grid>
  );
};

export default FieldFamilyPhysician;
