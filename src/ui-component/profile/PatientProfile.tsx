import React, { useEffect } from 'react';
import { PatientAppointmentsSortField } from '@axios/booking/managerBookingTypes';
import Overview from '@components/PatientProfile/Overview';
import PartnerProfileOverview from '@components/PatientProfile/PartnerProfileOverview';
import TestResults from '@components/PatientProfile/TestResults';
import { Box, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { usePatientProfileNavigatorContext } from 'context/PatientProfileNavigatorContext';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { SortOrder } from 'types/patient';
import { AppointmentType } from 'types/patientProfile';

import LatestTestResults from '@ui-component/profile/LatestTestResult';

import AppointmentsCard from './appointmentCard';

const PatientProfile = () => {
  const router = useRouter();
  const patientId = router.query.id as string;
  const { profilePageName, page } = usePatientProfileNavigatorContext();

  const patientAppointments = useAppSelector(bookingSelector.patientProfileAppointmentsGroup);
  const shouldUpdateAppointments = useAppSelector(bookingSelector.shouldUpdateBookingCalendarAppointments);

  useEffect(() => {
    dispatch(bookingMiddleware.getPatientAppointmentsGroup(patientId));
  }, [patientId]);

  useEffect(() => {
    if (shouldUpdateAppointments) {
      dispatch(bookingMiddleware.getPatientAppointmentsGroup(patientId));
      dispatch(bookingMiddleware.setShouldUpdateBookingCalendarAppointments(false));
    }
  }, [shouldUpdateAppointments, patientId]);

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
                sortByField={patientAppointments?.upcoming.sortByField ?? PatientAppointmentsSortField.Date}
                sortOrder={patientAppointments?.upcoming.sortOrder ?? SortOrder.Asc}
              />
              <AppointmentsCard
                appointmentType={AppointmentType.Past}
                appointmentsList={patientAppointments?.past.appointments ?? null}
                filterId={patientAppointments?.past.filter ?? ''}
                sortByField={patientAppointments?.past.sortByField ?? PatientAppointmentsSortField.Date}
                sortOrder={patientAppointments?.past.sortOrder ?? SortOrder.Desc}
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
