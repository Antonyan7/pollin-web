import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { FamilyHistoryContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/FamilyHistoryContext';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

import FamilyHistoryDetails from './Details';

const FamilyHistory = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.FamilyHistory}.items`
  });

  return (
    <FamilyHistoryContext.Provider value={fields}>
      <FamilyHistoryDetails />
    </FamilyHistoryContext.Provider>
  );
};

export default FamilyHistory;
