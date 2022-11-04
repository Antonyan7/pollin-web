import React, { useMemo, useState } from 'react';
import Overview from '@components/PatientProfile/Overview';
import PartnerProfileOverview from '@components/PatientProfile/PartnerProfileOverview';
import TestResults from '@components/PatientProfile/TestResults';
import { Box, Grid, Stack } from '@mui/material';
import {
  PatientProfileNavigatorContext,
  PatientProfileNavigatorContextData,
  ProfilePageName
} from 'context/PatientProfileNavigatorContext';
import { paddings } from 'themes/themeConstants';
import { AppointmentType } from 'types/patientProfile';

import AppointmentsCard from '@ui-component/profile/AppointmentsCard';
import AppointmentsList from '@ui-component/profile/AppointmentsList';
import LatestTestResults from '@ui-component/profile/LatestTestResult';

const PatientProfile = () => {
  const [profilePageName, setProfilePageName] = useState<ProfilePageName>(ProfilePageName.None);

  const profilePage = useMemo(() => {
    switch (profilePageName) {
      case ProfilePageName.AppointmentsListPage:
        return <AppointmentsList />;
      default:
        return null;
    }
  }, [profilePageName]);

  const ctx: PatientProfileNavigatorContextData = useMemo(
    () => ({
      profilePageName,
      navigateTo: setProfilePageName,
      navigateBack: () => setProfilePageName(ProfilePageName.None)
    }),
    [profilePageName]
  );

  return (
    <PatientProfileNavigatorContext.Provider value={ctx}>
      <Box width="100%" overflow="hidden">
        <Grid
          sx={{
            transition: 'all 0.35s ease-out',
            transform: `translateX(${profilePageName === ProfilePageName.None ? '0%' : '-50%'})`
          }}
          width="200%"
          height="100%"
          container
        >
          <Grid item container flexGrow={1} flexBasis={0} columnGap={3} pt={paddings.top20}>
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
                <AppointmentsCard appointmentType={AppointmentType.Upcoming} />
                <AppointmentsCard appointmentType={AppointmentType.Past} />
              </Stack>
            </Grid>
          </Grid>
          <Grid item flexGrow={1} flexBasis={0}>
            {profilePage}
          </Grid>
        </Grid>
      </Box>
    </PatientProfileNavigatorContext.Provider>
  );
};

export default PatientProfile;
