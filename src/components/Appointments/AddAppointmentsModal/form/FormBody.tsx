import React from 'react';
import { DialogContent, Grid } from '@mui/material';

import AppointmentDescription from '../fields/AppointmentDescription';
import DateAndStartTime from '../fields/DateAndStartTime';
import PatientId from '../fields/PatientId';
import ServiceType from '../fields/ServiceType';

const FormBody: React.FC = () => (
  <DialogContent sx={{ p: 3 }}>
    <Grid container spacing={3}>
      <ServiceType />
      <PatientId />
      <AppointmentDescription />
      <DateAndStartTime />
    </Grid>
  </DialogContent>
);

export default FormBody;
