import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getFullAddress } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const PrimaryAddress = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const fieldValue = contactInformation?.primaryAddress;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PRIMARY_ADDRESS);
  const fullAddress = getFullAddress(fieldValue);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={fullAddress} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default PrimaryAddress;
