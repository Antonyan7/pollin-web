import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalComponentWithRadio from '@components/MedicalBackground/components/common/MedWithRadio';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const AlcoholUse = () => {
  const fieldName = `${GeneralHealthFormFields.DrinkAlcohol}.value`;
  const [t] = useTranslation();

  return (
    <MedicalComponentWithRadio
      iconTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_USE_ALCOHOL)}
      fieldName={fieldName}
    />
  );
};

export default AlcoholUse;
