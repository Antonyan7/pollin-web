import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { DrugAllergyContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/DrugAllergyContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

import DrugAllergiesDetails from './Details';

const DrugAllergies = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.DrugAllergies}.items`
  });

  return (
    <DrugAllergyContext.Provider value={fields}>
      <DrugAllergiesDetails />
    </DrugAllergyContext.Provider>
  );
};

export default DrugAllergies;
