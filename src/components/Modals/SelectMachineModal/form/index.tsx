import React from 'react';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import FormBody from './FormBody';
import FormHeader from './FormHeader';

interface SelectMachineModalFormProps {
  specimens: ISpecimensListItem[];
  actionType: string;
}

const SelectMachineModalForm = ({ specimens, actionType }: SelectMachineModalFormProps) => (
  <form>
    <FormHeader actionType={actionType} />
    <FormBody specimens={specimens} actionType={actionType} />
  </form>
);

export default SelectMachineModalForm;
