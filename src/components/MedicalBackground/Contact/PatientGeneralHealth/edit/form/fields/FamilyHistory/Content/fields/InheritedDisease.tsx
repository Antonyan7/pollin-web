import React from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '@components/MedicalBackground/components/common/TextFieldInput';
import {
  DiagramTitleProps,
  GeneralHealthFormFields
} from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

const InheritedDisease = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const label = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_FAMILY_HISTORY_PROBLEM_DISEASE);

  return (
    <InputField
      label={label}
      fieldName={`${GeneralHealthFormFields.FamilyHistory}.items.${titleIndex}.title`}
      index={titleIndex}
    />
  );
};

export default InheritedDisease;
