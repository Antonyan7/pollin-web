import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import AppointmentsList from '@ui-component/profile/AppointmentsList';

const PatientProfile = () => {
  const [showUpcomingAppointments, setShowUpcomingAppointments] = useState(false);

  return (
    <Box width="100%" overflow="hidden">
      <Grid
        sx={{
          transition: 'all 0.35s ease-out',
          transform: `translateX(${showUpcomingAppointments ? '-50%' : '0%'})`
        }}
        width="200%"
        height="100%"
        container
      >
        <Grid item flexGrow={1} flexBasis={0}>
          {/* TODO: Patient Profile Page Layout */}
          <button type="button" onClick={() => setShowUpcomingAppointments(!showUpcomingAppointments)}>
            Slide to Appointments Section
          </button>
          {/*  Patient Profile Page Layout End */}
        </Grid>
        <Grid item flexGrow={1} flexBasis={0}>
          <AppointmentsList onBack={() => setShowUpcomingAppointments(!showUpcomingAppointments)} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientProfile;
