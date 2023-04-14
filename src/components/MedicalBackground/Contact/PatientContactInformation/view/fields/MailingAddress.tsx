import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddressProps } from '@axios/patientEmr/managerPatientEmrTypes';
import { RenderSingleValueAndNote } from '@components/MedicalBackground/components/common';
import FieldWrapper from '@components/MedicalBackground/components/common/FieldWrapper';
import { GeneralHealthComponentsProps } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

const MailingAddress = ({ componentIndex }: GeneralHealthComponentsProps) => {
  const [t] = useTranslation();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const fieldValue = contactInformation?.mailingAddress as AddressProps;
  const fieldName = t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_CONTACT_INFORMATION_PATIENT_MAILING_ADDRESS);

  return (
    <FieldWrapper fieldName={fieldName} componentIndex={componentIndex} hasNote={!!fieldValue?.note}>
      <RenderSingleValueAndNote value={fieldValue?.streetAddress} note={fieldValue?.note} />
    </FieldWrapper>
  );
};

export default MailingAddress;
