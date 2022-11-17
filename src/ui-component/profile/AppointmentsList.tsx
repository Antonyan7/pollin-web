import React from 'react';
import { Divider, Grid, Stack } from '@mui/material';

import AppointmentsListHeader from '@ui-component/profile/AppointmentListHeader';
import AppointmentsListFilter from '@ui-component/profile/AppointmentsListFilter';
import AppointmentsListTable from '@ui-component/profile/AppointmentsListTable';

const AppointmentsList = () => (
  <Stack rowGap={1.5}>
    <AppointmentsListHeader />
    <Divider />
    <Grid container xs={12}>
      <AppointmentsListFilter />
    </Grid>
    <AppointmentsListTable />
  </Stack>
);

export default AppointmentsList;
