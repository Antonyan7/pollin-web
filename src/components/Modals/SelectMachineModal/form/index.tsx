import React from 'react';

import FormBody from './FormBody';
import FormHeader from './FormHeader';

interface SelectMachineModalFormProps {
  specimenIds: string[];
}

const SelectMachineModalForm = ({ specimenIds }: SelectMachineModalFormProps) => (
  <form>
    <FormHeader />
    <FormBody specimenIds={specimenIds} />
  </form>
);

export default SelectMachineModalForm;
