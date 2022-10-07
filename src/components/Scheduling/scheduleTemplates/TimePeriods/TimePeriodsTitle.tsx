import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { schedulingMiddleware, schedulingSelector } from '@redux/slices/scheduling';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

import { MinusIconButton } from '@ui-component/common/buttons';

interface ITimePeriodsTitleProps {
  timePeriodNumber: number;
}

const TimePeriodsTitle = ({ timePeriodNumber }: ITimePeriodsTitleProps) => {
  const overrides: number[] = useAppSelector(schedulingSelector.scheduleOverrides);
  const [t] = useTranslation();
  const { getValues, setValue } = useFormContext<ITemplateGroup>();
  const theme = useTheme();

  const onMinusClick = (timePeriodIndex: number) => {
    const timePeriods = getValues('timePeriods');

    setValue('timePeriods', [...timePeriods.slice(0, timePeriodIndex), ...timePeriods.slice(timePeriodIndex + 1)]);
  };

  useEffect(() => {
    dispatch(schedulingMiddleware.resetOverrides());
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" minWidth="150px">
        <h3
          className="sub-title"
          style={{
            color: overrides?.includes(timePeriodNumber) ? theme.palette.error.main : theme.palette.common.black
          }}
        >
          {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TIME_PERIOD)} {timePeriodNumber + 1}
        </h3>
        {overrides?.includes(timePeriodNumber) && <ErrorOutlineIcon color="error" />}
      </Box>
      {!!timePeriodNumber && <MinusIconButton onClick={() => onMinusClick(timePeriodNumber)} />}
    </Box>
  );
};

export default TimePeriodsTitle;
