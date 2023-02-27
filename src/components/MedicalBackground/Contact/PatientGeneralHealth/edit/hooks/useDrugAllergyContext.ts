import { useContext } from 'react';
import { DrugAllergyContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/DrugAllergyContext';

const useDrugAllergyContext = () => {
  const drugAllergyMethods = useContext(DrugAllergyContext);

  return drugAllergyMethods;
};

export default useDrugAllergyContext;
