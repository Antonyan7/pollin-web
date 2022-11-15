import React, { useEffect } from 'react';
import { PatientListStyled } from '@components/Patients/PatientListStyled';
import { Box } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { resultsMiddleware, resultsSelector } from '@redux/slices/results';
import { margins } from 'themes/themeConstants';

import SpecimensStatsView from '@ui-component/profile/SpecimensStatsView';

const InHouseSpecimensList = () => {
  const pendingSpecimenStats = useAppSelector(resultsSelector.pendingSpecimenStats);

  useEffect(() => {
    dispatch(resultsMiddleware.getPendingSpecimenStats());
  }, []);

  return (
    <PatientListStyled>
      <Box sx={{ marginBottom: margins.bottom32 }}>
        <SpecimensStatsView stats={pendingSpecimenStats} />
      </Box>
    </PatientListStyled>
  );
};

export default InHouseSpecimensList;
