import React from 'react';
import { Divider, Grid, Stack } from '@mui/material';

import AppointmentsListHeader from '@ui-component/profile/AppointmentListHeader';
import AppointmentsListFilter from '@ui-component/profile/AppointmentsListFilter';
import AppointmentsListSearch from '@ui-component/profile/AppointmentsListSearch';
import AppointmentsListTable from '@ui-component/profile/AppointmentsListTable';

const AppointmentsList = () => (
  <Stack rowGap={1.5}>
    <AppointmentsListHeader />
    <Divider />
    <Grid container justifyContent="space-between" rowGap={1}>
      <AppointmentsListSearch />
      <AppointmentsListFilter />
    </Grid>
    <AppointmentsListTable />
  </Stack>
);

export default AppointmentsList;
