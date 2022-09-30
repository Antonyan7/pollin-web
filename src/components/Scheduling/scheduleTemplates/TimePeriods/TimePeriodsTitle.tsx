import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

import { MinusIconButton } from '@ui-component/common/buttons';

interface ITimePeriodsTitleProps {
  timePeriodNumber: number;
}

const TimePeriodsTitle = ({ timePeriodNumber }: ITimePeriodsTitleProps) => {
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext<ITemplateGroup>();

  const onMinusClick = (timePeriodIndex: number) => {
    const timePeriods = getValues('timePeriods');

    setValue('timePeriods', [...timePeriods.slice(0, timePeriodIndex), ...timePeriods.slice(timePeriodIndex + 1)]);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 className="sub-title">
        {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TIME_PERIOD)} {timePeriodNumber + 1}
      </h3>
      {!!timePeriodNumber && <MinusIconButton onClick={() => onMinusClick(timePeriodNumber)} />}
    </Box>
  );
};

export default TimePeriodsTitle;
