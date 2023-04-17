import React from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '@components/MedicalBackground/components/common/TextFieldInput';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { Translation } from 'constants/translations';

const LastName = () => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_LASTNAME);

  return <InputField label={label} fieldName={`${ContactInformationFormFields.PatientName}.lastName`} />;
};

export default LastName;
