import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import usePastSurgeryContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/usePastSurgeryContext';
import { Translation } from 'constants/translations';

const AddSurgery = () => {
  const [t] = useTranslation();

  const { append, fields } = usePastSurgeryContext();

  const onAddSurgeryClick = () => {
    append({ typeOfSurgery: '', dateOfSurgery: new Date() });
  };

  return (
    <MedicalFormAddDiagram
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_PAST_SURGERY_ADD)}
      onClick={onAddSurgeryClick}
      fields={fields}
    />
  );
};

export default AddSurgery;
