import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps, getDropdownByType } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const RelationshipStatus = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.relationship;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_RELATIONSHIP_STATUS
  );
  const dropdownOptions = useAppSelector(patientsSelector.dropdowns);
  const relationshipOptions = getDropdownByType(dropdownOptions, DropdownOptionType.RelationshipStatus)?.options;
  const relationshipValue = useMemo(
    () => relationshipOptions?.find((option) => option.id === fieldValue?.value),
    [fieldValue?.value, relationshipOptions]
  )?.title;

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={relationshipValue} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default RelationshipStatus;
