import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const DateOfBirth = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.dateOfBirth;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_RELATIONSHIP_DATE_OF_BIRTH
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={fieldValue?.value} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default DateOfBirth;
