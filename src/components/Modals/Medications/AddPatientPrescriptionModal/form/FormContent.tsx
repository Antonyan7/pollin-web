import React from 'react';
import { useFieldArray } from 'react-hook-form';

import { MedicationsContext } from './context/MedicationsContext';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

export const FormContent = () => {
  const fields = useFieldArray({
    name: `medications`
  });

  return (
    <MedicationsContext.Provider value={fields}>
      <FormHeader />
      <FormBody />
    </MedicationsContext.Provider>
  );
};
