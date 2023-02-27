import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import useFamilyHistoryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useFamilyHistoryContext';
import { Translation } from 'constants/translations';

const AddFamilyHistory = () => {
  const [t] = useTranslation();
  const { append, fields } = useFamilyHistoryContext();

  const onAddFamilyHistoryClick = () => {
    append({ title: '', familyMemberName: '' });
  };

  return (
    <MedicalFormAddDiagram
      fields={fields}
      onClick={onAddFamilyHistoryClick}
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM_TITLE)}
    />
  );
};

export default AddFamilyHistory;
