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

import ReferringDoctorContent from './Content';
import Title from './Title';

const FieldOHIP = () => {
  const [t] = useTranslation();
  const label = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_REFERRING_PHYSICIAN_NAME
  );
  const { control } = useFormContext();
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const referringDoctor = patientBackgroundInformation?.referringDoctor;
  const { field } = useController({
    name: BackgroundInformationFormFields.ReferringDoctor,
    control
  });
  const { onChange, value: referringDoctorInfo } = field;
  const fieldName = BackgroundInformationFormFields.ReferringDoctor;
  const onReferringDoctorChange = (state: boolean) => {
    onChange({
      ...referringDoctorInfo,
      value: state
    });
  };
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!referringDoctor?.note);
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
        {referringDoctorInfo.isEditable ? (
          <>
            <Grid>
              <MedicalFormRadio fieldName={`${fieldName}.value`} onChangeState={onReferringDoctorChange} />
            </Grid>
            {referringDoctorInfo.value ? (
              <Grid>
                <Diagram titleComponent={<Title />}>
                  <ReferringDoctorContent />
                </Diagram>
              </Grid>
            ) : null}
          </>
        ) : null}
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={BackgroundInformationFormFields.ReferringDoctor}
        />
      </Grid>
    </Grid>
  );
};

export default FieldOHIP;
