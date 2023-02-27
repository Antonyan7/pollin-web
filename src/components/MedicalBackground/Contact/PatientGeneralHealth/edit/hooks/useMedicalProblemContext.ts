import { useContext } from 'react';
import { MedicalProblemContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/MedicalProblemContext';

const useMedicalProblemContext = () => {
  const medicalProblemMethods = useContext(MedicalProblemContext);

  return medicalProblemMethods;
};

export default useMedicalProblemContext;
