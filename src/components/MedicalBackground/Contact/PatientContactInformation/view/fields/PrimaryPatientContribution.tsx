import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const PrimaryPatientContribution = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const fieldValue = contactInformation?.contribution;
  const primaryPatientOptions = getDropdownByType(
    dropdownOptions,
    DropdownOptionType.PrimaryPatientContribution
  )?.options;
  const primaryPatientOptionsValue = useMemo(
    () => primaryPatientOptions?.find((option) => option.id === fieldValue?.value),
    [fieldValue?.value, primaryPatientOptions]
  )?.title;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_PRIMARY_CONTRIBUTION
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={primaryPatientOptionsValue} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default PrimaryPatientContribution;
