import React from 'react';
import { useTranslation } from 'react-i18next';
import { ConsultationFormRadioGroup } from '@components/Plans/components/common';
import { ConsultationFormRadioProps, InitialConsultationFormRadioValues } from '@components/Plans/types';
import { FormControl, FormControlLabel, Radio } from '@mui/material';
import { Translation } from 'constants/translations';

const ConsultationFormRadio = ({ value, onChange, fieldName }: ConsultationFormRadioProps) => {
  const [t] = useTranslation();

  return (
    <FormControl>
      <ConsultationFormRadioGroup onChange={onChange} name={fieldName} aria-labelledby={fieldName} value={value}>
        <FormControlLabel
          value={InitialConsultationFormRadioValues.Yes}
          control={<Radio />}
          label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)}
        />
        <FormControlLabel
          value={InitialConsultationFormRadioValues.No}
          control={<Radio />}
          label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO)}
        />
      </ConsultationFormRadioGroup>
    </FormControl>
  );
};

export default ConsultationFormRadio;
