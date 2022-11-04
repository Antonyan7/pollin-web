import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { borderRadius } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface Props {
  submitButtonText: string;
}

const ActionsField = ({ submitButtonText }: Props) => {
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

  return (
    <Grid container alignItems="center">
      <Grid item xs />
      <Grid item xs />
      <Grid item container xs={4} lg={2} justifyContent="flex-end">
        <ButtonWithLoading
          isLoading={isScheduleLoading}
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
