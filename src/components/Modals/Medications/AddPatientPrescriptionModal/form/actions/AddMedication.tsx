import React from 'react';
import { useTranslation } from 'react-i18next';
import MedicalFormAddDiagram from '@components/MedicalBackground/components/common/MedicalFormAddDiagram';
import { Translation } from 'constants/translations';

import useMedicationsContext from '../hooks/useMedicationsContext';
import { getMedicationInitialState } from '../initialValues';

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
