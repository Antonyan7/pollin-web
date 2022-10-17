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
import { borders, margins } from 'themes/themeConstants';

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
      <Main sx={{ marginTop: margins.top0 }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="Patient Emr Tabs"
          variant="fullWidth"
          sx={{
            marginBottom: margins.bottom32,
            div: {
              borderBottom: `${borders.solid1px} transparent`
            },
            '& .MuiTabs-indicator': {
              height: 3,
              backgroundColor: theme.palette.primary.main
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
        {children}
      </Main>
    </>
  );
};

export default PatientEmrLayout;
