import React from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '@components/MedicalBackground/components/common/TextFieldInput';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const Inches = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INCHES);

  return <InputField label={label} fieldName={`${GeneralHealthFormFields.Height}.inches`} />;
};

export default Inches;
