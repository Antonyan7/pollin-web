import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const Pronouns = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.preferredPronouns;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_SEXUAL_PRONOUNS
  );
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const pronounsOptions = getDropdownByType(dropdownOptions, DropdownOptionType.Pronouns)?.options;
  const pronounsValue = useMemo(
    () => pronounsOptions?.find((option) => option.id === fieldValue?.value),
    [fieldValue?.value, pronounsOptions]
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={pronounsValue?.title} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default Pronouns;
