import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderFieldWithAdditionalValues } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const Gender = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.gender;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_GENDER);
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const genderOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Gender)?.options;
  const genderValue = useMemo(
    () => genderOptions?.find((option) => option.id === fieldValue?.value),
    [fieldValue?.value, genderOptions]
  );
  const otherGenderValue = useMemo(() => [fieldValue?.other ?? ''], [fieldValue?.other]);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderFieldWithAdditionalValues
        value={genderValue?.title}
        additionalValues={otherGenderValue}
        note={fieldValue?.note}
      />
    </FieldWrapper>
  );
};

export default Gender;
