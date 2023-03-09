import React from 'react';
import PatientContactInformation from '@components/MedicalBackground/Contact/PatientContactInformation';
import PatientGeneralHealth from '@components/MedicalBackground/Contact/PatientGeneralHealth';
import { Stack } from '@mui/material';

const ContactPage = () => (
  <Stack spacing={8} direction="column">
    <PatientGeneralHealth />
    <PatientContactInformation />
  </Stack>
);

export default ContactPage;
