import React, { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { margins } from 'themes/themeConstants';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

const SpecimenStatistics = () => {
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingSpecimenStats());
  }, []);

  return (
    <Box sx={{ marginBottom: margins.bottom32 }}>
      <SpecimensStatsView stats={pendingSpecimenStats} />
    </Box>
  );
};

export default memo(SpecimenStatistics);
