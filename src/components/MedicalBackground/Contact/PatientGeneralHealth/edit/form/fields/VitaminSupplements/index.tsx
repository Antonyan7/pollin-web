import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { VitaminSupplementsContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/VitaminSupplementsContext';
import VitaminSupplementDetails from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/VitaminSupplements/Details';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

const VitaminSupplements = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.VitaminSupplements}.items`
  });

  return (
    <VitaminSupplementsContext.Provider value={fields}>
      <VitaminSupplementDetails />
    </VitaminSupplementsContext.Provider>
  );
};

export default VitaminSupplements;
