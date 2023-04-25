import React from 'react';
import { useTranslation } from 'react-i18next';
import { RenderFieldWithAdditionalValues } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { getYesNoDash } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/view/helper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const Pharmacy = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const fieldValue = contactInformation?.pharmacy;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_BACKGROUND_INFORMATION_PHARMACY);
  const pharmacyAddress = fieldValue?.address;
  const pharmacyInfo = [
    fieldValue?.name ?? '',
    pharmacyAddress?.street ?? '',
    pharmacyAddress?.unit ?? '',
    pharmacyAddress?.phoneNumber ?? '',
    pharmacyAddress?.faxNumber ?? ''
  ];

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderFieldWithAdditionalValues
        value={getYesNoDash(fieldValue?.exists)}
        additionalValues={pharmacyInfo}
        note={fieldValue?.note}
      />
    </FieldWrapper>
  );
};

export default Pharmacy;
