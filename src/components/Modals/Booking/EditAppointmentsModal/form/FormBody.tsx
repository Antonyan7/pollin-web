import React from 'react';
import { DialogContent, Divider, Grid } from '@mui/material';
import { margins } from 'themes/themeConstants';

import AppointmentDescription from './fields/AppointmentDescription';
import DateAndStartTime from './fields/DateAndStartTime';
import PatientId from './fields/PatientId';
import ServiceType from './fields/ServiceType';
import StatusAppointmentLabel from './fields/StatusAppointmentLabel';

const FormBody = () => (
  <DialogContent sx={{ p: 3 }}>
    <Grid container spacing={3}>
      <ServiceType />
      <PatientId />
      <AppointmentDescription />
      <DateAndStartTime />
      <StatusAppointmentLabel />
      <Divider sx={{ margin: `${margins.topBottom0} ${margins.leftRight24}` }} />
    </Grid>
  </DialogContent>
);

export default FormBody;
