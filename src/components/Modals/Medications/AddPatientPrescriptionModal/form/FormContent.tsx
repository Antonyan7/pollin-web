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
  const isDirty = Object.values(dirtyFields).length > 0;

  useEffect(() => {
    setIsDirty(isDirty);
  }, [isDirty, setIsDirty]);

  return (
    <MedicationsContext.Provider value={fields}>
      <FormHeader isDirty={isDirty} />
      <FormBody />
    </MedicationsContext.Provider>
  );
};
