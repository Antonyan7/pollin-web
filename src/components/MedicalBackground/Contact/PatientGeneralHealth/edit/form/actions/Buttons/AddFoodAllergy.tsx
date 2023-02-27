import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import useFoodAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFoodAllergyContext';
import { Translation } from 'constants/translations';

const AddFoodAllergy = () => {
  const [t] = useTranslation();
  const { append, fields } = useFoodAllergyContext();

  const onAddFoodAllergyClick = () => {
    append({ title: '' });
  };

  return (
    <MedicalFormAddDiagram
      fields={fields}
      onClick={onAddFoodAllergyClick}
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FOOD_ALLERGY_ADD)}
    />
  );
};

export default AddFoodAllergy;
