import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
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
import OHIPViewMode from './ViewMode';

const FieldOHIP = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_FAMILY_PHYSICIAN);
  const { control } = useFormContext();
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const familyDoctor = patientBackgroundInformation?.familyDoctor;
  const { field } = useController({
    name: BackgroundInformationFormFields.FamilyDoctor,
    control
  });
  const { onChange, value: familyDoctorInfo } = field;
  const fieldName = BackgroundInformationFormFields.FamilyDoctor;
  const onFamilyDoctorChange = (state: boolean) => {
    onChange({
      ...familyDoctorInfo,
      value: state
    });
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
        {familyDoctorInfo.isEditable ? (
          <>
            <Grid>
              <MedicalFormRadio fieldName={`${fieldName}.value`} onChangeState={onFamilyDoctorChange} />
            </Grid>
            {familyDoctorInfo.value ? (
              <Grid>
                <Diagram titleComponent={<Title />}>
                  <FamilyDoctorContent />
                </Diagram>
              </Grid>
            ) : null}
          </>
        ) : (
          <OHIPViewMode />
        )}
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.FamilyDoctor}
        />
      </Grid>
    </Grid>
  );
};

export default FieldOHIP;
