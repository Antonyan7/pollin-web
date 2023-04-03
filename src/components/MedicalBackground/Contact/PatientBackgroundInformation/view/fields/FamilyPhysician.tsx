import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { getYesNo } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/helper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const FamilyPhysician = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.familyDoctor;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_FAMILY_PHYSICIAN
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={getYesNo(fieldValue?.value)} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default FamilyPhysician;
