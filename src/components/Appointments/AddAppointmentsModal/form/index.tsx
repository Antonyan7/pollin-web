import React from 'react';
import { useFormikContext } from 'formik';

import FormActions from './FormActions';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const AddAppointmentsModalForm = () => {
  const { handleSubmit } = useFormikContext();

  return (
    <form onSubmit={handleSubmit}>
      <FormHeader />
      <FormBody />
      <FormActions />
    </form>
  );
};

export default AddAppointmentsModalForm;
