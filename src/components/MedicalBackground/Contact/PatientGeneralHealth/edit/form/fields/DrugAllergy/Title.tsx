import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useDrugAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useDrugAllergyContext';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const DrugAllergyTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { remove } = useDrugAllergyContext();
  const onMinusClick = (selectedIndex: number) => {
    remove(selectedIndex);
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
