import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import useDrugAllergyContext from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/hooks/useDrugAllergyContext';
import { Translation } from 'constants/translations';

const AddDrugAllergy = () => {
  const [t] = useTranslation();
  const { append, fields } = useDrugAllergyContext();

  const onAddDrugAllergyClick = () => {
    append({ title: '' });
  };

  return (
    <MedicalFormAddDiagram
      fields={fields}
      onClick={onAddDrugAllergyClick}
      subTitle={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_DRUG_ALLERGY_ADD)}
    />
  );
};

export default AddDrugAllergy;
