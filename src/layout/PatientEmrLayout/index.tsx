import React, { PropsWithChildren, useState } from 'react';
import { Main } from '@components/Appointments/AppointmentsContent';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import { Link } from '@components/index';
import PatientAlertView from '@components/Patients/PatientAlertView';
import PatientHighlightsView from '@components/Patients/PatientHighlightsView';
import { Tab, Tabs, useTheme } from '@mui/material';
import { patientListTabLinks } from 'helpers/constants';
import { useAppSelector } from 'redux/hooks';
import { patientsSelector } from 'redux/slices/patients';
import { margins } from 'themes/themeConstants';

const allyProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
});
const PatientEmrLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const currentPatientId = useAppSelector(patientsSelector.currentPatientId);
  const patientProfile = useAppSelector(patientsSelector.patientProfile);

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(2);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, currentIndex: number) => {
    setCurrentTabIndex(currentIndex);
  };

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
        {patientListTabLinks.map((link, linkIndex) => (
          <Tab
            disabled={link.linkName !== 'Encounters'}
            key={link.linkName}
            component={Link}
            href={`/patient-emr/details/${currentPatientId}/${link.href}`}
            label={link.linkName}
            {...allyProps(linkIndex)}
          />
        ))}
      </Tabs>
      <Main sx={{ marginTop: margins.top0 }}>{children}</Main>
    </>
  );
};

export default PatientEmrLayout;
