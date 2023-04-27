import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const SexualOrientation = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.sexualOrientation;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_SEXUAL_ORIENTATION
  );
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const orientationOptions = getDropdownByType(dropdownOptions, DropdownOptionType.SexualOrientation)?.options;
  const sexualOrientationValue = useMemo(
    () => orientationOptions?.find((option) => option.id === fieldValue?.value),
    [fieldValue?.value, orientationOptions]
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={sexualOrientationValue?.title} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default SexualOrientation;
