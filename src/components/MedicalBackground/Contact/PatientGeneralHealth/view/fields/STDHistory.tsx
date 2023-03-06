import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { defineSingleFieldValue, GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const STDHistory = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const fieldValue = generalHealth?.stdHistory;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STD_HISTORY);
  const field = defineSingleFieldValue(fieldValue?.value);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex}>
      <RenderSingleValueAndNote value={field} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default STDHistory;
