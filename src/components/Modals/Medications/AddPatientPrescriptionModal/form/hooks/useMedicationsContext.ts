import { useContext } from 'react';

import { MedicationsContext } from '../context/MedicationsContext';

const useMedicationsContext = () => {
  const medicationsMethods = useContext(MedicationsContext);

  return medicationsMethods;
};

export default useMedicationsContext;
