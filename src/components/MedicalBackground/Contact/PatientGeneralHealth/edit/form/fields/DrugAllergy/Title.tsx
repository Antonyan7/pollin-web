import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useDrugAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useDrugAllergyContext';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const DrugAllergyTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: drugAllergies, remove } = useDrugAllergyContext();
  const { getValues, setValue } = useFormContext();
  const drugAllergyField = getValues(GeneralHealthFormFields.DrugAllergies);
  const onMinusClick = (selectedIndex: number) => {
    if (drugAllergies.length === 1) {
      setValue(GeneralHealthFormFields.DrugAllergies, {
        ...drugAllergyField,
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
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY)}
      titleIndex={titleIndex}
    />
  );
};

export default DrugAllergyTitle;
