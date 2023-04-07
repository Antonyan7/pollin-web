import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

import DateField from './DateField';

const StartDate = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();

  return (
    <DateField
      fieldName={`medications.${titleIndex}.duration.start`}
      label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_START_DATE)}
    />
  );
};

export default StartDate;
