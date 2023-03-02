import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useFoodAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFoodAllergyContext';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const FoodAllergyTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: foodAllergies, remove } = useFoodAllergyContext();
  const { getValues, setValue } = useFormContext();
  const foodAllergyField = getValues(GeneralHealthFormFields.FoodAllergies);
  const onMinusClick = (selectedIndex: number) => {
    if (foodAllergies.length === 1) {
      setValue(GeneralHealthFormFields.FoodAllergies, {
        ...foodAllergyField,
        items: [
          {
            title: ''
          }
        ]
      });
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
