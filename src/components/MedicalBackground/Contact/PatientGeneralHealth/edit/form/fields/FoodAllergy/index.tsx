import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FoodAllergyContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/FoodAllergyContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

import DrugAllergiesDetails from './Details';

const FoodAllergies = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.FoodAllergies}.items`
  });

  return (
    <FoodAllergyContext.Provider value={fields}>
      <DrugAllergiesDetails />
    </FoodAllergyContext.Provider>
  );
};

export default FoodAllergies;
