import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MedicationsContext } from './context/MedicationsContext';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

export const FormContent = ({ setIsDirty }: { setIsDirty: (val: boolean) => void }) => {
  const fields = useFieldArray({
    name: `medications`
  });
  const {
    formState: { dirtyFields }
  } = useFormContext();

  useEffect(() => {
    setIsDirty(Object.values(dirtyFields).length > 0);
  }, [dirtyFields, setIsDirty]);

  return (
    <MedicationsContext.Provider value={fields}>
      <FormHeader />
      <FormBody />
    </MedicationsContext.Provider>
  );
};
