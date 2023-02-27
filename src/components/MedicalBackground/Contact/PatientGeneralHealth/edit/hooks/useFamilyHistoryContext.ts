import { useContext } from 'react';
import { FamilyHistoryContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/FamilyHistoryContext';

const useFamilyHistoryContext = () => {
  const familyHistoryMethods = useContext(FamilyHistoryContext);

  return familyHistoryMethods;
};

export default useFamilyHistoryContext;
