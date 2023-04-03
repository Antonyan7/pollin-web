import { useContext } from 'react';
import { SamePrimaryAddressContext } from '@components/MedicalBackground/Contact/PatientContactInformation/edit/context/SamePrimaryAddressContext';

export const useSamePrimaryContext = () => {
  const sameAddressContext = useContext(SamePrimaryAddressContext);

  return sameAddressContext;
};
