import React from 'react';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import useMedicalProblemContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useMedicalProblemContext';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const OtherMedicalProblemTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: medicalProblems, remove, replace } = useMedicalProblemContext();
  const onMinusClick = (selectedIndex: number) => {
    if (medicalProblems.length === 1) {
      replace([
        {
          id: ''
        }
      ]);
    } else {
      remove(selectedIndex);
    }
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_MEDICAL_PROBLEM)}
      titleIndex={titleIndex}
    />
  );
};

export default OtherMedicalProblemTitle;
