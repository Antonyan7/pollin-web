import React from 'react';
import { Stack } from '@mui/material';

import FemaleGynecologicalHistory from './FemaleGynecologicalHistory';
import FemalePatientMenstrualCycleHistory from './FemalePatientMenstrualCycleHistory';
import FemalePregnancyInformation from './FemalePregnancyInformation';
import FertilityHistory from './FertilityHistory';

const MedicalHistory = () => (
  <Stack spacing={8} direction="column">
    <FertilityHistory />
    <FemalePregnancyInformation />
    <FemalePatientMenstrualCycleHistory />
    <FemaleGynecologicalHistory />
  </Stack>
);

export default MedicalHistory;
