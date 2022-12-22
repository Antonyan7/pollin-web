import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import bookingManager from '@axios/booking/bookingManager';
import { IGetPatientAppointments } from '@axios/booking/managerBookingTypes';
import Overview from '@components/PatientProfile/Overview';
import PartnerProfileOverview from '@components/PatientProfile/PartnerProfileOverview';
import TestResults from '@components/PatientProfile/TestResults';
import { Box, Grid, Stack } from '@mui/material';
import { patientsSelector } from '@redux/slices/patients';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { paddings } from 'themes/themeConstants';
import { AppointmentType } from 'types/patientProfile';

import useAppointmentStatusState from '@hooks/useAppointmentStatusState';
import AppointmentsCard from '@ui-component/profile/AppointmentsCard';
import LatestTestResults from '@ui-component/profile/LatestTestResult';

const PatientProfile = () => {
  const patientId = useSelector(patientsSelector.currentPatientId);
  const { profilePageName, page } = usePatientProfileNavigatorContext();
  const [patientAppointments, setPatientAppointments] = useState<IGetPatientAppointments | null>(null);

  useEffect(() => {
    if (patientAppointments === null && patientId) {
      bookingManager.getPatientAppointments(patientId).then(({ data }) => {
        setPatientAppointments(data);
      });
    }
  }, [patientAppointments, patientId]);

  useAppointmentStatusState();

  return (
    <Box width="100%" overflow="hidden">
      <Grid
        sx={{
          transition: 'all 0.35s ease-out',
          transform: `translateX(${profilePageName === null ? '0%' : '-50%'})`
        }}
        width="200%"
        height="100%"
        container
      >
        <Grid
          item
          container
          flexGrow={1}
          flexBasis={0}
          columnGap={3}
          pt={paddings.top20}
          sx={{
            '& > *': {
              ...(profilePageName === null ? {} : { display: 'none' })
            }
          }}
        >
          <Grid item flexGrow={6} flexBasis={0}>
            <Stack rowGap={3}>
              <Overview />
              <TestResults />
              <LatestTestResults />
            </Stack>
          </Grid>
          <Grid item flexGrow={4} flexBasis={0}>
            <Stack rowGap={3}>
              <PartnerProfileOverview />
              <AppointmentsCard
                appointmentType={AppointmentType.Upcoming}
                appointmentsList={patientAppointments?.upcoming.appointments ?? null}
                filterId={patientAppointments?.upcoming.filter ?? ''}
              />
              <AppointmentsCard
                appointmentType={AppointmentType.Past}
                appointmentsList={patientAppointments?.past.appointments ?? null}
                filterId={patientAppointments?.past.filter ?? ''}
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid item flexGrow={1} flexBasis={0}>
          {profilePageName !== null && page}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientProfile;
