import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { Translation } from 'constants/translations';
import { TestResultsStats } from 'types/results';

import TestResultCard from '@ui-component/cards/TestResultCard';

const PendingTestResultsStatisticsView = () => {
  const theme = useTheme();
  const [t] = useTranslation();
  const pendingTestStats = useAppSelector(resultsSelector.pendingTestStats);

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingTestStats());
  }, []);

  return (
    <Grid item container direction="row" justifyContent="center" alignItems="center" xs={12} spacing={2}>
      <Grid item xs={4}>
        <TestResultCard
          primary={t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_GREATER_30)}
          secondary={pendingTestStats.find((stat) => stat.type === TestResultsStats.GreaterThan30Days)?.count}
          color={theme.palette.orange.dark}
          backgroundColor={theme.palette.orange.light}
        />
      </Grid>
      <Grid item xs={4}>
        <TestResultCard
          primary={t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_GREATER_15)}
          secondary={pendingTestStats.find((stat) => stat.type === TestResultsStats.GreaterThan15Days)?.count}
          color={theme.palette.warning.dark}
          backgroundColor={theme.palette.warning.light}
        />
      </Grid>
      <Grid item xs={4}>
        <TestResultCard
          primary={t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_LESS_15)}
          secondary={pendingTestStats.find((stat) => stat.type === TestResultsStats.LessThanOrEqual15Days)?.count}
          color={theme.palette.success.dark}
          backgroundColor={theme.palette.success.light}
        />
      </Grid>
    </Grid>
  );
};

export default PendingTestResultsStatisticsView;
