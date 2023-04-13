import React, { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationTitleWithIcon } from '@components/MedicalBackground/components/common';
import MedicalBackgroundNote from '@components/MedicalBackground/components/common/MedicalBackgroundNote';
import MedicalFormRadio from '@components/MedicalBackground/components/common/MedicalFormRadio';
import { GenitourinaryFields } from '@components/MedicalBackground/MedicalHistory/MaleGenitourinaryHistory/editView/types';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

const PastSemenAnalysis = () => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const fieldName = `${GenitourinaryFields.PastSemenAnalysis}.value`;
  const patientInformation = useAppSelector(patientsSelector.malePatientGenitourinaryHistory);
  const hadSemenAnalysis = patientInformation?.hadSemenAnalysis;

  const { field } = useController({
    name: fieldName,
    control
  });
  const PastSemenAnalysisLabel = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_PAST_SEMEN_ANALYSIS
  );
  const { onChange } = field;

  const onConceptionChange = (HadPastSemenAnalysis: boolean) => {
    onChange(HadPastSemenAnalysis);
  };
  const [showAdditionalNote, setShowAdditionalNote] = useState(!!hadSemenAnalysis?.note);
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
        <ConsultationTitleWithIcon onClick={onNoteClick} description={PastSemenAnalysisLabel} />
      </Grid>
      <Grid item container xs={7}>
        <MedicalFormRadio fieldName={fieldName} onChangeState={onConceptionChange} />
        <MedicalBackgroundNote
          onClick={onNoteClick}
          visible={showAdditionalNote}
          fieldName={GenitourinaryFields.PastSemenAnalysis}
        />
      </Grid>
    </Grid>
  );
};

export default PastSemenAnalysis;
