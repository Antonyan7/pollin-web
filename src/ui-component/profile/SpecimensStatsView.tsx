import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useTheme } from '@mui/material';
import { Translation } from 'constants/translations';
import { IPendingTestStats } from 'types/reduxTypes/resultsStateTypes';
import { TestResultsStats } from 'types/results';

import TestResultCard from '@ui-component/cards/TestResultCard';

interface SpecimensStatsViewProps {
  stats: IPendingTestStats[];
}

const SpecimensStatsView: React.FC<SpecimensStatsViewProps> = ({ stats }) => {
  const theme = useTheme();
  const [t] = useTranslation();

  const statsGreaterThan30 = t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_GREATER_30);
  const statsGreaterThan15 = t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_GREATER_15);
  const statsLessThan15 = t(Translation.PAGE_PATIENT_PENDING_TEST_RESULTS_LESS_15);

  return (
    <Grid item container direction="row" justifyContent="center" alignItems="center" xs={12} spacing={2}>
      <Grid item xs={4}>
        <TestResultCard
          primary={statsGreaterThan30}
          secondary={stats.find((stat) => stat.type === TestResultsStats.GreaterThan30Days)?.count}
          color={theme.palette.orange.dark}
          backgroundColor={theme.palette.orange.light}
        />
      </Grid>
      <Grid item xs={4}>
        <TestResultCard
          primary={statsGreaterThan15}
          secondary={stats.find((stat) => stat.type === TestResultsStats.GreaterThan15Days)?.count}
          color={theme.palette.warning.dark}
          backgroundColor={theme.palette.warning.light}
        />
      </Grid>
      <Grid item xs={4}>
        <TestResultCard
          primary={statsLessThan15}
          secondary={stats.find((stat) => stat.type === TestResultsStats.LessThanOrEqual15Days)?.count}
          color={theme.palette.success.dark}
          backgroundColor={theme.palette.success.light}
        />
      </Grid>
    </Grid>
  );
};

export default SpecimensStatsView;
