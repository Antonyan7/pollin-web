import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import useVitaminSupplementsContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useVitaminSupplementsContext';
import { Translation } from 'constants/translations';

const AddVitamin = () => {
  const [t] = useTranslation();

  const { append, fields } = useVitaminSupplementsContext();

  const onVitaminClick = () => {
    append({ title: '', dosage: '' });
  };

  return (
    <MedicalFormAddDiagram
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_SUPPLEMENT_ADD)}
      onClick={onVitaminClick}
      fields={fields}
    />
  );
};

export default AddVitamin;
