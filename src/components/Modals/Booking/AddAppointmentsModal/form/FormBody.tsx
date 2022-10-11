import React from 'react';
import { DialogContent, Grid } from '@mui/material';

import AppointmentDescription from '../fields/AppointmentDescription';
import DateAndStartTime from '../fields/DateAndStartTime';
import PatientId from '../fields/PatientId';
import ServiceType from '../fields/ServiceType';

const FormBody = () => (
  <DialogContent sx={{ p: 4, marginTop: '15px' }}>
    <Grid container spacing={3}>
      <ServiceType />
      <PatientId />
      <AppointmentDescription />
      <DateAndStartTime />
    </Grid>
  </DialogContent>
);

export default FormBody;
