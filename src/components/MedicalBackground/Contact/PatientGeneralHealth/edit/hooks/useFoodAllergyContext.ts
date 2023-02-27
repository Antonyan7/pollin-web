import { useContext } from 'react';
import { FoodAllergyContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/FoodAllergyContext';

const useFoodAllergyContext = () => {
  const foodAllergyMethods = useContext(FoodAllergyContext);

  return foodAllergyMethods;
};

export default useFoodAllergyContext;
