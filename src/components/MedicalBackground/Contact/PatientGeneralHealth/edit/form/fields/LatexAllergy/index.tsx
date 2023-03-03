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

const LatexAllergy = () => {
  const [t] = useTranslation();
  const fieldName = `${GeneralHealthFormFields.LatexAllergy}.value`;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const latexAllergy = generalHealth?.latexAllergy;
  const field = defineSingleFieldValue(latexAllergy?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_LATEX_ALLERGY);

  return latexAllergy?.isEditable ? (
    <MedicalComponentWithRadio fieldName={fieldName} iconTitle={fieldTitle} />
  ) : (
    <MedicalComponentWithRadioView iconTitle={fieldTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );
};

export default LatexAllergy;
