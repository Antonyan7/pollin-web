import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressProps } from '@axios/patientEmr/managerPatientEmrTypes';
import GoogleAutocomplete from '@components/GoogleAutocomplete';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const StreetAddress = () => {
  const { setValue } = useFormContext();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const primaryAddress = contactInformation?.primaryAddress;
  const fieldName = `${ContactInformationFormFields.PrimaryAddress}.streetAddress`;
  const manuallyAddress = useAppSelector(patientsSelector.manuallyAddressForPrimary);

  useEffect(() => {
    if (manuallyAddress && manuallyAddress.streetAddress) {
      const fullAddress = getFullAddress(manuallyAddress as AddressProps);
      const { unitNumber, postalCode, province, city, country } = manuallyAddress;

      setValue(ContactInformationFormFields.PrimaryAddress, {
        ...primaryAddress,
        unitNumber,
        postalCode,
        province,
        city,
        country,
        streetAddress: fullAddress
      });
    }
  }, [manuallyAddress, primaryAddress, setValue]);

  return <GoogleAutocomplete fieldName={fieldName} />;
};

export default StreetAddress;
