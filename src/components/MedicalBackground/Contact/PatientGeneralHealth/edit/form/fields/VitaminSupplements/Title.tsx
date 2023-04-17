import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useVitaminSupplementsContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useVitaminSupplementsContext';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const VitaminSupplementsTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: vitaminSupplements, remove, replace } = useVitaminSupplementsContext();
  const onMinusClick = (selectedIndex: number) => {
    if (vitaminSupplements.length === 1) {
      replace([
        {
          title: '',
          dosage: ''
        }
      ]);
    } else {
      remove(selectedIndex);
    }
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      titleIndex={titleIndex}
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENT)}
    />
  );
};

export default VitaminSupplementsTitle;
