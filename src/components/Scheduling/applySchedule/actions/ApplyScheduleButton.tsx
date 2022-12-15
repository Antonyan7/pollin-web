import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { borderRadius, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

import { ApplyScheduleButtonProps } from '../types';

const ApplyScheduleButton = ({
  isScheduleLoading,
  isAllowedToApplySchedule,
  handleApplySchedule
}: ApplyScheduleButtonProps) => {
  const [t] = useTranslation();

  const applyButtonCyId = CypressIds.PAGE_SCHEDULING_APPLY_BUTTON_APPLY;
  const applyButtonLabel = t(Translation.PAGE_SCHEDULING_APPLY_BUTTON_APPLY);

  return (
    <Grid container display="flex" justifyContent="flex-end" pt={paddings.top24}>
      <ButtonWithLoading
        data-cy={applyButtonCyId}
        isLoading={isScheduleLoading}
        disabled={!isAllowedToApplySchedule}
        color="primary"
        variant="contained"
        style={{
          borderRadius: borderRadius.radius8,
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
