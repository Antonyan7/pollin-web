import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import MedicalComponentWithRadioView from '@components/MedicalBackground/components/common/MedWithRadioView';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { defineSingleFieldValue } from '@components/MedicalBackground/helpers';
import { Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const ProblemWithAnesthetics = () => {
  const [t] = useTranslation();
  const fieldName = `${GeneralHealthFormFields.ProblemWithAnesthetics}.value`;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const problemWithAnesthetics = generalHealth?.problemWithAnesthetics;
  const field = defineSingleFieldValue(problemWithAnesthetics?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PROBLEM_WITH_ANESTHETICS);

  return problemWithAnesthetics?.isEditable ? (
    <MedicalComponentWithRadio iconTitle={fieldTitle} fieldName={fieldName} />
  ) : (
    <MedicalComponentWithRadioView iconTitle={fieldTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );
};

export default ProblemWithAnesthetics;
