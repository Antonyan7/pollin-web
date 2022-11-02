import React from 'react';
import Resource from '@components/Patients/PatientModals/AddPatientAppointment/fields/Resource';
import { DialogContent, Grid } from '@mui/material';

import AppointmentDescription from '../fields/AppointmentDescription';
import AppointmentType from '../fields/AppointmentType';
import DateAndStartTime from '../fields/DateAndStartTime';
import PatientName from '../fields/PatientName';

const FormBody = () => (
  <DialogContent>
    <Grid container spacing={3}>
      <Resource />
      <AppointmentType />
      <PatientName />
      <AppointmentDescription />
      <DateAndStartTime />
    </Grid>
  </DialogContent>
);

export default FormBody;
