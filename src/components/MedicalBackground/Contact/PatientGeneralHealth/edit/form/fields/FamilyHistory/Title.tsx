import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useFamilyHistoryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFamilyHistoryContext';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const FamilyHistoryTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { remove } = useFamilyHistoryContext();
  const onMinusClick = (selectedIndex: number) => {
    remove(selectedIndex);
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM_TITLE)}
      titleIndex={titleIndex}
    />
  );
};

export default FamilyHistoryTitle;
