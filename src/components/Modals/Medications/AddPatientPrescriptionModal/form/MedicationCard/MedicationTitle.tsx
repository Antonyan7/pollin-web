import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DiagramTitle from '@components/MedicalBackground/components/common/DiagramTitle';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';

import useMedicationsContext from '../hooks/useMedicationsContext';
import { getMedicationInitialState } from '../initialValues';

const MedicationTitle = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();
  const { fields: medications, remove } = useMedicationsContext();
  const { setValue } = useFormContext();
  const onMinusClick = (selectedIndex: number) => {
    if (medications.length === 1) {
      setValue('medications', [getMedicationInitialState()]);
      dispatch(patientsMiddleware.setPatientPrescriptionsItems());

      return;
    }

    remove(selectedIndex);

    dispatch(patientsMiddleware.removePatientPrescriptionItem(titleIndex));
  };

  return (
    <DiagramTitle
      onClick={onMinusClick}
      label={t(Translation.MODAL_PRESCRIPTIONS_MEDICATION)}
      titleIndex={titleIndex}
    />
  );
};

export default MedicationTitle;
