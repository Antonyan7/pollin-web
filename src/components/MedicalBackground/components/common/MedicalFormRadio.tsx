import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MedicalFormRadioProps } from '@components/MedicalBackground/Contact/PatientGeneralHealth/edit/types';
import { ConsultationFormRadioGroup } from '@components/Plans/components/common';
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

  useEffect(
    () => {
      if (field.value === null) {
        onChange(false);
        onChangeState?.(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.value]
  );

  return (
    <ConsultationFormRadioGroup {...fieldProps} value={!!RadioValue} onChange={onRadioFieldChange} ref={field.ref}>
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
