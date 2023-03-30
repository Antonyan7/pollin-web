import React from 'react';
import MedicationsTabs from '@components/Medications';
import { Box } from '@mui/material';
import PatientEmrLayout from 'pages/patient-emr/details/[id]/index';

const Medications = () => (
    <Box>
      {' '}
      <MedicationsTabs />{' '}
    </Box>
  );

Medications.PageLayout = PatientEmrLayout;

export default Medications;
