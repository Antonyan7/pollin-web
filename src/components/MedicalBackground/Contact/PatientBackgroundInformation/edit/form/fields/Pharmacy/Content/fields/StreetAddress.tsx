import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressProps } from '@axios/patientEmr/managerPatientEmrTypes';
import GoogleAutocomplete from '@components/GoogleAutocomplete';
import { BackgroundInformationFormFields } from '@components/MedicalBackground/Contact/PatientBackgroundInformation/edit/types';
import { getFullAddress } from '@components/MedicalBackground/helpers';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';

const StreetAddress = () => {
  const { setValue } = useFormContext();
  const fieldName = `${BackgroundInformationFormFields.Pharmacy}.address.street`;
  const patientBackgroundInformation = useAppSelector(patientsSelector.patientBackgroundInformation);
  const pharmacy = patientBackgroundInformation?.pharmacy;
  const manualAddressInfo = useAppSelector(patientsSelector.manualAddressForPharmacy);

  useEffect(() => {
    if (manualAddressInfo) {
      const fullAddress = getFullAddress(manualAddressInfo as AddressProps);

      setValue(`${BackgroundInformationFormFields.Pharmacy}.address`, {
        ...pharmacy?.address,
        street: fullAddress,
        city: manualAddressInfo?.city,
        unit: manualAddressInfo?.unitNumber,
        country: manualAddressInfo?.country,
        postalCode: manualAddressInfo?.postalCode
      });
    }
  }, [manualAddressInfo, pharmacy?.address, setValue]);

  return (
    <Grid item xs={12}>
      <GoogleAutocomplete fieldName={fieldName} />
    </Grid>
  );
};

export default StreetAddress;
