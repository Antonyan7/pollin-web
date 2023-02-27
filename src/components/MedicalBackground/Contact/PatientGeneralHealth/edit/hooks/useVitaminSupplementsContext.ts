import { useContext } from 'react';
import { VitaminSupplementsContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/VitaminSupplementsContext';

const useVitaminSupplementsContext = () => {
  const vitaminSupplementsMethods = useContext(VitaminSupplementsContext);

  return vitaminSupplementsMethods;
};

export default useVitaminSupplementsContext;
