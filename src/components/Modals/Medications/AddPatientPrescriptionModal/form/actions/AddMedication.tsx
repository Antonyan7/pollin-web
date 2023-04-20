import React from 'react';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import useMedicationsContext from '../hooks/useMedicationsContext';
import { getMedicationInitialState } from '../initialValues';

import MedicalFormAddDiagram from './AddDiagram';

const AddMedication = () => {
  const [t] = useTranslation();
  const { append, fields } = useMedicationsContext();

  const onAddMedicationClick = () => {
    append(getMedicationInitialState());
  };

  return (
    <MedicalFormAddDiagram
      fields={fields}
      onClick={onAddMedicationClick}
      subTitle={t(Translation.PAGE_MEDICATIONS_ADD_BUTTON)}
    />
  );
};

export default AddMedication;
