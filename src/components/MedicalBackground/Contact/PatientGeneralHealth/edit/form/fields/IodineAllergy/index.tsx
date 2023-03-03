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

const IodineAllergy = () => {
  const [t] = useTranslation();
  const fieldName = `${GeneralHealthFormFields.IodineAllergy}.value`;
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const iodineAllergy = generalHealth?.iodineAllergy;
  const field = defineSingleFieldValue(iodineAllergy?.value);
  const fieldTitle = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_IODINE_ALLERGY);

  return iodineAllergy?.isEditable ? (
    <MedicalComponentWithRadio fieldName={fieldName} iconTitle={fieldTitle} />
  ) : (
    <MedicalComponentWithRadioView iconTitle={fieldTitle}>
      <Typography>{field}</Typography>
    </MedicalComponentWithRadioView>
  );
};

export default IodineAllergy;
