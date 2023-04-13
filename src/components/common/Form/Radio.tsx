import React, { useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps, styled } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

export const StyledRadioGroup = styled(RadioGroup)(() => ({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: margins.top10,
  alignItems: 'flex-start',
  gap: 3
}));

const FormRadio = ({ fieldName }: { fieldName: string }) => {
  const [t] = useTranslation();
  const { control } = useFormContext();
  const { field } = useController({ name: fieldName, control });
  const { onChange, ...fieldProps } = field;

  const onRadioFieldChange: RadioGroupProps['onChange'] = (radioEvent) => {
    if (radioEvent.target.value === 'true') {
      onChange(true);
    } else {
      onChange(false);
    }
  };

  const radioValue = useWatch({ name: fieldName });

  useEffect(
    () => {
      if (field.value === null) {
        onChange(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.value]
  );

  return (
    <StyledRadioGroup {...fieldProps} value={!!radioValue} onChange={onRadioFieldChange} ref={field.ref}>
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
    </StyledRadioGroup>
  );
};

export default FormRadio;
