import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { AddressProps } from '@axios/patientEmr/managerPatientEmrTypes';
import GoogleAutocomplete from '@components/GoogleAutocomplete';
import { ContactInformationFormFields } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/types';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const StreetAddress = () => {
  const { control, setValue } = useFormContext();
  const contactInformation = useAppSelector(patientsSelector.contactInformation);
  const primaryAddress = contactInformation?.primaryAddress;
  const { field, fieldState } = useController({
    name: `${ContactInformationFormFields.PrimaryAddress}.streetAddress`,
    control
  });
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

  return <GoogleAutocomplete field={field} fieldState={fieldState} />;
};

export default StreetAddress;
