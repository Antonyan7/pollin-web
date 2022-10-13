import React from 'react';
import { DialogContent, Grid } from '@mui/material';
import { paddings } from 'themes/themeConstants';

import AppointmentDescription from '../fields/AppointmentDescription';
import DateAndStartTime from '../fields/DateAndStartTime';
import PatientId from '../fields/PatientId';
import ServiceType from '../fields/ServiceType';

const FormBody = () => (
  <DialogContent sx={{ padding: `${paddings.top32} ${paddings.right32} ${paddings.bottom24} ${paddings.left32}` }}>
    <Grid container spacing={3}>
      <ServiceType />
      <PatientId />
      <AppointmentDescription />
      <DateAndStartTime />
    </Grid>
  </DialogContent>
);

export default FormBody;
