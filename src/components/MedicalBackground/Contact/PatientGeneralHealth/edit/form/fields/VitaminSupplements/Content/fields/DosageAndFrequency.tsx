import React from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '@components/MedicalBackground/components/common/TextFieldInput';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const DosageAndFrequency = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_VITAMIN_DOSAGE_AND_FREQUENCY);

  return (
    <InputField
      label={label}
      fieldName={`${GeneralHealthFormFields.VitaminSupplements}.items.${titleIndex}.dosage`}
      index={titleIndex}
    />
  );
};

export default DosageAndFrequency;
