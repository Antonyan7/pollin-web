import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { CypressIds } from 'constants/cypressIds';
import { borderRadius } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface Props {
  submitButtonText: string;
  isAllowedToApplySchedule: boolean;
}

const ActionsField = ({ submitButtonText, isAllowedToApplySchedule }: Props) => {
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);
  const applyButtonCyId = CypressIds.PAGE_SCHEDULING_APPLY_BUTTON_APPLY;

  return (
    <Grid container alignItems="center">
      <Grid item xs />
      <Grid item xs />
      <Grid item container xs={4} lg={2} justifyContent="flex-end">
        <ButtonWithLoading
          data-cy={applyButtonCyId}
          isLoading={isScheduleLoading}
          disabled={!isAllowedToApplySchedule}
          type="submit"
          color="primary"
          variant="contained"
          style={{
            borderRadius: borderRadius.radius8,
            lineHeight: 1.5
          }}
        >
          {submitButtonText}
        </ButtonWithLoading>
      </Grid>
    </Grid>
  );
};

export default ActionsField;
