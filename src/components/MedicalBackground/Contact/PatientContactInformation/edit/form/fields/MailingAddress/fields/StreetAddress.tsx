import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { AddressProps } from '@axios/patientEmr/managerPatientEmrTypes';
import GoogleAutocomplete from '@components/GoogleAutocomplete';
import { useSamePrimaryContext } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/hooks/useSamePrimaryContext';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const StreetAddress = () => {
  const { control, setValue } = useFormContext();
  const { isSameAddressChecked } = useSamePrimaryContext();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const mailingAddress = contactInformation?.mailingAddress;
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.MailingAddress}.streetAddress`,
    control
  });
  const { field: primaryAddressField } = useController({
    name: `${ContactInformationFormFields.PrimaryAddress}.streetAddress`,
    control
  });
  const manuallyAddress = useAppSelector(patientsSelector.manuallyAddressForMailing);

  useEffect(() => {
    if (manuallyAddress && manuallyAddress.streetAddress) {
      const fullAddress = getFullAddress(manuallyAddress as AddressProps);

      setValue(ContactInformationFormFields.MailingAddress, {
        ...mailingAddress,
        streetAddress: fullAddress
      });
    }
  }, [manuallyAddress, mailingAddress, setValue]);

  useEffect(() => {
    if (isSameAddressChecked) {
      setValue(ContactInformationFormFields.MailingAddress, {
        ...mailingAddress,
        streetAddress: primaryAddressField.value
      });
    }
  }, [isSameAddressChecked, mailingAddress, primaryAddressField.value, setValue]);

  return <GoogleAutocomplete field={field} fieldState={fieldState} />;
};

export default StreetAddress;
