import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

import { MinusIconButton } from '@ui-component/common/buttons';

interface ITimePeriodsTitleProps {
  timePeriodNumber: number;
  setTemplateData: React.Dispatch<React.SetStateAction<ITemplateGroup>>;
}

const TimePeriodsTitle = ({ timePeriodNumber, setTemplateData }: ITimePeriodsTitleProps) => {
  const [t] = useTranslation();

  const onMinusClick = (timePeriodIndex: number) => {
    setTemplateData((templateData) => ({
      ...templateData,
      timePeriods: [
        ...templateData.timePeriods.slice(0, timePeriodIndex),
        ...templateData.timePeriods.slice(timePeriodIndex + 1)
      ]
    }));
  };

  return (
    <Box sx={timePeriodNumber ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } : {}}>
      <h3 className="sub-title">
        {t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_TIME_PERIOD)} {timePeriodNumber + 1}
      </h3>
      {!!timePeriodNumber && <MinusIconButton onClick={() => onMinusClick(timePeriodNumber)} />}
    </Box>
  );
};

export default TimePeriodsTitle;
