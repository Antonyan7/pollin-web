import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MedicalFormInformationField from '@components/MedicalBackground/components/common/MedicalFormInformationField';
import { Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const NumberOfPregnancies = () => {
  const [t] = useTranslation();
  const femalePregnancyInformation = useAppSelector(patientsSelector.femalePregnancyInformation);

  const pregnancies = useWatch({
    name: 'previousPregnancies.pregnancies'
  });

  const { setValue } = useFormContext();

  useEffect(() => {
    if (typeof pregnancies?.length === 'number') {
      setValue('numberOfPregnancies', pregnancies?.length);
    }
  }, [pregnancies, setValue]);

  return (
    <MedicalFormInformationField
      title={t(
        Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_FEMALE_PREGNANCY_INFORMATION_TOTAL_NUMBER_OF_PREGNANCIES
      )}
    >
      <Typography>{pregnancies?.length ?? femalePregnancyInformation?.numberOfPregnancies}</Typography>
    </MedicalFormInformationField>
  );
};

export default NumberOfPregnancies;
