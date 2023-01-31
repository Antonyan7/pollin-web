import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import { ApplyScheduleButtonProps } from '../types';

const ApplyScheduleButton = ({ isAllowedToApplySchedule, handleApplySchedule }: ApplyScheduleButtonProps) => {
  const [t] = useTranslation();
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);
  const isApplyingSchedule = useAppSelector(schedulingSelector.isApplyingSchedule);
  const isLoading = isScheduleLoading || isApplyingSchedule;

  const applyButtonCyId = CypressIds.PAGE_SCHEDULING_APPLY_BUTTON_APPLY;
  const applyButtonLabel = t(Translation.PAGE_SCHEDULING_APPLY_BUTTON_APPLY);

  return (
    <Grid container display="flex" justifyContent="flex-end" pt={paddings.top24}>
      <ButtonWithLoading
        data-cy={applyButtonCyId}
        isLoading={isLoading}
        disabled={!isAllowedToApplySchedule}
        color="primary"
        variant="contained"
        style={{
          lineHeight: 1.5
        }}
        onClick={handleApplySchedule}
      >
        {applyButtonLabel}
      </ButtonWithLoading>
    </Grid>
  );
};

export default ApplyScheduleButton;
