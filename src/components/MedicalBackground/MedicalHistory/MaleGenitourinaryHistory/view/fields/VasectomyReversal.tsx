import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { getYesNoDash } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/helper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const VasectomyReversal = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const medicalInfo = useAppSelector(patientsSelector.malePatientGenitourinaryHistory);
  const fieldValue = medicalInfo?.vasectomyReversal;
  const fieldName = t(
    Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY_GENITOURINARY_HISTORY_FIELD_VASECTOMY_REVERSAL
  );

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={getYesNoDash(fieldValue?.value)} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default VasectomyReversal;
