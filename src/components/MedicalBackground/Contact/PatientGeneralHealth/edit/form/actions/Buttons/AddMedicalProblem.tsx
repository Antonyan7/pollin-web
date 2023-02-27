import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import useMedicalProblemContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useMedicalProblemContext';
import { Translation } from 'constants/translations';

const AddMedicalProblem = () => {
  const [t] = useTranslation();
  const { append, fields } = useMedicalProblemContext();

  const onAddMedicalProblemClick = () => {
    append({ id: '' });
  };

  return (
    <MedicalFormAddDiagram
      fields={fields}
      onClick={onAddMedicalProblemClick}
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_OTHER_ADD_MEDICAL_PROBLEM)}
    />
  );
};

export default AddMedicalProblem;
