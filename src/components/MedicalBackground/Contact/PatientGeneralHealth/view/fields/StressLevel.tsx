import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const StressLevel = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const generalHealth = useAppSelector(patientsSelector.generalHealth);
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const fieldValue = generalHealth?.currentStressLevel;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_STRESS_LEVEL);
  const stressLevelOptions = getDropdownByType(dropdownOptions, DropdownOptionType.StressLevel)?.options;
  const stressLevelValue = useMemo(() => stressLevelOptions?.find((option) => option.id === fieldValue?.value), [fieldValue?.value, stressLevelOptions])?.title;

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={stressLevelValue} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default StressLevel;
