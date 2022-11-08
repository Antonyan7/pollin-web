import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Main } from '@components/Appointments/AppointmentsContent';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
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

const PatientEmrLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const theme = useTheme();
  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(2);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, currentIndex: number) => {
    setCurrentTabIndex(currentIndex);
  };

  useEffect(() => {
    const splitPaths = router.asPath.split('/');
    const currentPagePath = splitPaths[splitPaths.length - 1];

    const currentIndex = patientListTabLinks.findIndex((tabLink) => tabLink.href === currentPagePath);

    setCurrentTabIndex(currentIndex);
  }, [router]);

  useEffect(() => {
    if (!currentPatientId && router.query.id) {
      dispatch(patientsMiddleware.setCurrentPatient(router.query.id as string));
    }
  }, [currentPatientId, router.query.id]);

  return (
    <>
      <PatientAlertView />
      <MainBreadcrumb
        currentPage={patientProfile?.title as string}
        navigation={{
          basePath: '/',
          items: [
            { name: 'Patient List/EMR', path: '/patient-emr/list' },
            { name: patientProfile?.title, path: `/patient-emr/list/${currentPatientId}` }
          ]
        }}
      />
      <br />
      <PatientHighlightsView />
      <br />
      <Tabs
        value={currentTabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="simple tabs example"
        variant="fullWidth"
        sx={{
          '& .MuiTabs-indicator': {
            height: 3,
            backgroundColor: theme.palette.dark[200]
          }
        }}
      >
        {patientListTabLinks.map((link, linkIndex) => {
          const availableLinks =
            link.linkName !== AvailablePages.Encounters && link.linkName !== AvailablePages.Profile;

          return (
            currentPatientId && (
              <TabWithLink
                disabled={availableLinks}
                key={link.linkName}
                component={Link}
                href={`/patient-emr/details/${currentPatientId}/${link.href}`}
                label={link.linkName}
                {...allyProps(linkIndex)}
              />
            )
          );
        })}
      </Tabs>
      <Main sx={{ marginTop: margins.top0 }}>{children}</Main>
    </>
  );
};

export default PatientEmrLayout;
