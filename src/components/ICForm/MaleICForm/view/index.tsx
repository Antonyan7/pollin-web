import React from 'react';
import { Stack } from '@mui/material';

import ViewGeneralHealth from './GeneralHealth';
import ViewGenitourinaryHistory from './GenitourinaryHistory';
import ViewMedication from './Medication';
import ViewPatientBackgroundInformation from './PatientBackgroundInformation';
import ViewPatientContribution from './PatientContribution';

const ViewMaleICForm = () => (
  <Stack>
    <ViewPatientContribution />
    <ViewPatientBackgroundInformation />
    <ViewGenitourinaryHistory />
    <ViewMedication />
    <ViewGeneralHealth />
  </Stack>
);

export default ViewMaleICForm;
