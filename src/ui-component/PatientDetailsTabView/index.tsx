import React, { useEffect, useRef, useState } from 'react';
import { Main } from '@components/Appointments/AppointmentsContent';
import { Link } from '@components/index';
import { Tab, Tabs, useTheme } from '@mui/material';
import { patientListTabLinks } from 'helpers/constants';
import { useRouter } from 'next/router';

import Encounters from '@ui-component/encounters/Encounters';

const allyProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
});

const PatientDetailsTabView = () => {
  const theme = useTheme();
  const router = useRouter();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(2);
  const hashRef = useRef(false);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, currentIndex: number) => {
    setCurrentTabIndex(currentIndex);
  };

  useEffect(() => {
    const currentUrl = router.asPath;

    if (!hashRef.current) {
      const currentHash = patientListTabLinks.find((_, tabIndex) => tabIndex === currentTabIndex)?.href;

      router.replace(`${currentUrl}${currentHash}`);
    }

    return () => {
      hashRef.current = true;
    };
  }, [router, currentTabIndex]);

  return (
    <>
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
            href={link.href}
            label={link.linkName}
            {...allyProps(linkIndex)}
          />
        ))}
      </Tabs>
      <Main sx={{ marginTop: 0 }}>
        <Encounters />
      </Main>
    </>
  );
};

export default PatientDetailsTabView;
