import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { PastSurgeryContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/PastSurgeryContext';
import PastSurgeriesDetails from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/PastSurgeries/Details';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

const PastSurgeries = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.PastSurgeries}.items`
  });

  return (
    <PastSurgeryContext.Provider value={fields}>
      <PastSurgeriesDetails />
    </PastSurgeryContext.Provider>
  );
};

export default PastSurgeries;
