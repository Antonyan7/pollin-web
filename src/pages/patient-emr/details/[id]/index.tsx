import React, { PropsWithChildren, useEffect, useState } from 'react';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Main } from '@components/common/AppointmentsContent';
import { Link } from '@components/index';
import PatientAlertView from '@components/Patients/PatientAlertView';
import PatientHighlightsView from '@components/Patients/PatientHighlightsView';
import { Tab, TabProps, Tabs, useTheme } from '@mui/material';
import { patientListTabLinks } from 'helpers/constants';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { patientsMiddleware, patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';
import { AvailablePages } from 'types/patient';

const allyProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
});

// Refer to this example https://mui.com/material-ui/guides/composition/#with-typescript
const TabWithLink = (props: TabProps<typeof Link, { component: typeof Link }>) => <Tab {...props} />;

export default ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const theme = useTheme();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(2);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, currentIndex: number) => {
    setCurrentTabIndex(currentIndex);
  };

  useEffect(() => {
    const currentIndex = patientListTabLinks.findIndex((tabLink) => router.asPath.includes(tabLink.href));

    if (currentIndex !== -1) {
      setCurrentTabIndex(currentIndex);
    }
  }, [router]);

  useEffect(() => {
    if (!currentPatientId && router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [currentPatientId, router.query.id]);

  return (
    <>
      <MainBreadcrumb
        currentPage={patientProfile?.fullName as string}
        navigation={{
          basePath: '/',
          items: [
            { name: 'Patient List', path: '/patient-emr/list' },
            {
              name: patientProfile?.fullName,
              path: `/patient-emr/details/${currentPatientId}`
            }
          ]
        }}
      />
      <br />
      <PatientAlertView />
      <PatientHighlightsView />
      <br />
      <Main sx={{ marginTop: margins.top0 }}>
        <Tabs
          value={currentTabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="patient navigation tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: '2px'
            },
            '& .MuiTabs-flexContainer': {
              borderBottom: '2px solid',
              borderColor: theme.palette.primary.light
            }
          }}
        >
          {patientListTabLinks.map((link, linkIndex) => {
            const isLinkAvailable = Object.values(AvailablePages).includes(link.linkName as AvailablePages);

            return (
              currentPatientId && (
                <TabWithLink
                  disabled={!isLinkAvailable}
                  key={link.linkName}
                  component={Link}
                  href={`/patient-emr/details/${currentPatientId}/${link.href}`}
                  label={link.linkName}
                  {...allyProps(linkIndex)}
                  {...(link['data-cy'] && {
                    [`data-cy`]: link?.['data-cy']
                  })}
                />
              )
            );
          })}
        </Tabs>
        {children}
      </Main>
    </>
  );
};
