import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const LatexAllergy = () => {
  const fieldName = `${GeneralHealthFormFields.LatexAllergy}.value`;
  const [t] = useTranslation();

  return (
    <MedicalComponentWithRadio
      fieldName={fieldName}
      iconTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_LATEX_ALLERGY)}
    />
  );
};

export default LatexAllergy;
