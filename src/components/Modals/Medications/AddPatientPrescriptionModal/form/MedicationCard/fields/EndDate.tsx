import React from 'react';
import { useTranslation } from 'react-i18next';
import { DiagramTitleProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { Translation } from 'constants/translations';

import DateField from './DateField';

const EndDate = ({ titleIndex }: DiagramTitleProps) => {
  const [t] = useTranslation();

  return (
    <DateField
      fieldName={`medications.${titleIndex}.duration.end`}
      label={t(Translation.MODAL_ADD_PATIENT_MEDICATION_END_DATE)}
    />
  );
};

export default EndDate;
