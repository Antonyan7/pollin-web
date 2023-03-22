import React from 'react';
import PatientBackgroundInformation from '@components/MedicalBackground/Contact/PatientBackgroundInformation';
import PatientContactInformation from '@components/MedicalBackground/Contact/PatientContactInformation';
import PatientGeneralHealth from '@components/MedicalBackground/Contact/PatientGeneralHealth';
import { Stack } from '@mui/material';

const ContactPage = () => (
  <Stack spacing={8} direction="column">
    <PatientContactInformation />
    <PatientBackgroundInformation />
    <PatientGeneralHealth />
  </Stack>
);

export default ContactPage;
