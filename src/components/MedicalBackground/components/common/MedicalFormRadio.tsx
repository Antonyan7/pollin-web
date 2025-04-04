import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ConsultationFormRadioGroup } from '@components/common';
import { MedicalFormRadioProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { FormControlLabel, Radio, RadioGroupProps } from '@mui/material';
import { Translation } from 'constants/translations';

const MedicalFormRadio = ({ fieldName, onChangeState }: MedicalFormRadioProps) => {
  const [t] = useTranslation();
  const { control, watch } = useFormContext();
  const { field } = useController({ name: fieldName, control });
  const { onChange, ...fieldProps } = field;

  const onRadioFieldChange: RadioGroupProps['onChange'] = (radioEvent) => {
    if (radioEvent.target.value === 'true') {
      onChange(true);
      onChangeState?.(true);
    } else {
      onChange(false);
      onChangeState?.(false);
    }
  };

  const RadioValue = watch(fieldName);

  return (
    <ConsultationFormRadioGroup {...fieldProps} value={RadioValue} onChange={onRadioFieldChange} ref={field.ref}>
      <FormControlLabel
        value
        control={<Radio />}
        label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_YES)}
      />
      <FormControlLabel
        value={false}
        control={<Radio />}
        label={t(Translation.PAGE_PATIENT_PLANS_PATIENT_DETAILS_CONSULTATION_NO)}
      />
    </ConsultationFormRadioGroup>
  );
};

export default MedicalFormRadio;
