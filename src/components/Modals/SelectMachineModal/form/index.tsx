import React from 'react';

import FormBody from './FormBody';
import FormHeader from './FormHeader';

interface SelectMachineModalFormProps {
  specimenIds: string[];
  actionType: string;
}

const SelectMachineModalForm = ({ specimenIds, actionType }: SelectMachineModalFormProps) => (
  <form>
    <FormHeader actionType={actionType} />
    <FormBody specimenIds={specimenIds} actionType={actionType} />
  </form>
);

export default SelectMachineModalForm;
