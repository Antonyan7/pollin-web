import React from 'react';
import { Stack } from '@mui/material';

import FemalePregnancyInformation from './FemalePregnancyInformation';
import FertilityHistory from './FertilityHistory';

const MedicalHistory = () => (
  <Stack spacing={8} direction="column">
    <FertilityHistory />
    <FemalePregnancyInformation />
  </Stack>
);

export default MedicalHistory;
