import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useFoodAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFoodAllergyContext';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const FoodAllergyTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: foodAllergies, remove, replace } = useFoodAllergyContext();
  const onMinusClick = (selectedIndex: number) => {
    if (foodAllergies.length === 1) {
      replace([
        {
          title: ''
        }
      ]);
    } else {
      remove(selectedIndex);
    }
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FOOD_ALLERGY)}
      titleIndex={titleIndex}
    />
  );
};

export default FoodAllergyTitle;
