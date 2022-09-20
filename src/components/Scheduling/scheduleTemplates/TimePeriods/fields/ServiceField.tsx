import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { Translation } from 'constants/translations';
import { ISingleTemplate } from 'types/create-schedule';

import { ServiceTypeOrBlock } from '../../../../../types/create-schedule';

import { TimePeriodsFieldProps } from './TimePeriodsFieldProps';

interface IServiceFieldProps extends TimePeriodsFieldProps {
  singleTemplate: ISingleTemplate;
}

const ServiceField = ({ index, singleTemplate, updateInputValue }: IServiceFieldProps) => {
  const [t] = useTranslation();

  const onServiceFieldChange: RadioGroupProps['onChange'] = (e) =>
    updateInputValue('periodType', e.target.value, index);

  return (
    <RadioGroup
      className="schedule-inputs"
      row
      name="row-radio-buttons-group"
      value={singleTemplate.periodType}
      onChange={onServiceFieldChange}
    >
      <FormControlLabel
        value={ServiceTypeOrBlock.ServiceType}
        control={<Radio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPE)}
      />
      <FormControlLabel
        value={ServiceTypeOrBlock.Block}
        control={<Radio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)}
      />
    </RadioGroup>
  );
};

export default ServiceField;
