import { useContext } from 'react';
import { PastSurgeryContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/PastSurgeryContext';

const usePastSurgeryContext = () => {
  const pastSurgeryMethods = useContext(PastSurgeryContext);

  return pastSurgeryMethods;
};

export default usePastSurgeryContext;
