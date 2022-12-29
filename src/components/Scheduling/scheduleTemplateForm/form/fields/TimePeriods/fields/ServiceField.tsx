import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, RadioGroupProps, styled, useTheme } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { ITemplateGroup, PeriodType } from 'types/create-schedule';

const ServiceField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const { control } = useFormContext<ITemplateGroup>();

  const { field } = useController({ name: `timePeriods.${index}.periodType`, control });
  const { onChange, ...fieldProps } = field;
  const serviceTypesRadioButtonCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPE;
  const blockRadioButtonCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK;

  const onServiceFieldChange: RadioGroupProps['onChange'] = (e) => onChange(e.target.value);

  const StyledRadio = styled(Radio)(() => ({
    '&, &.Mui-checked': {
      color: theme.palette.primary.main
    }
  }));

  return (
    <RadioGroup
      {...fieldProps}
      className="schedule-inputs"
      value={field.value}
      row
      onChange={onServiceFieldChange}
      ref={field.ref}
    >
      <FormControlLabel
        data-cy={serviceTypesRadioButtonCyId}
        value={PeriodType.ServiceType}
        control={<StyledRadio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_SERVICE_TYPE)}
      />
      <FormControlLabel
        data-cy={blockRadioButtonCyId}
        value={PeriodType.Block}
        control={<StyledRadio />}
        label={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_BLOCK)}
      />
    </RadioGroup>
  );
};

export default ServiceField;
