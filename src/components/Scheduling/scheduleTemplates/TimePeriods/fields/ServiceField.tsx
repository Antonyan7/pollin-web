import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup, PeriodType } from 'types/create-schedule';

const ServiceField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();
  const { control } = useFormContext<ITemplateGroup>();
  const {
    field: { onChange, ...fieldProps }
  } = useController({ name: `timePeriods.${index}.periodType`, control });

  const onServiceFieldChange: RadioGroupProps['onChange'] = (e) => onChange(e.target.value);

  return (
    <RadioGroup {...fieldProps} className="schedule-inputs" row onChange={onServiceFieldChange}>
      <FormControlLabel
        value={PeriodType.ServiceType}
        control={<Radio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPE)}
      />
      <FormControlLabel
        value={PeriodType.Block}
        control={<Radio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)}
      />
    </RadioGroup>
  );
};

export default ServiceField;
