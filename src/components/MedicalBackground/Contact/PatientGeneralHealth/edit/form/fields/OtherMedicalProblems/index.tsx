import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { MedicalProblemContext } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/context/MedicalProblemContext';
import OtherMedicalProblemsDetails from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/form/fields/OtherMedicalProblems/Details';
import { GeneralHealthFormFields } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';

const OtherMedicalProblems = () => {
  const fields = useFieldArray({
    name: `${GeneralHealthFormFields.MedicalProblems}.items`
  });

  return (
    <MedicalProblemContext.Provider value={fields}>
      <OtherMedicalProblemsDetails />
    </MedicalProblemContext.Provider>
  );
};

export default OtherMedicalProblems;
