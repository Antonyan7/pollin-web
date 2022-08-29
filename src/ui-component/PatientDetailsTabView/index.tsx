import React, { useState } from 'react';
import { Link } from '@components/index';
import { Tab, Tabs } from '@mui/material';

const allyProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`
});

export const patientListTabLinks = [
  { linkName: 'Patient Profile', href: '#' },
  { linkName: 'Plans', href: '#' },
  { linkName: 'Encounters', href: '#' },
  { linkName: 'Medications', href: '#' },
  { linkName: 'Orders', href: '#' },
  { linkName: 'Consents', href: '#' },
  { linkName: 'Referrals', href: '#' }
];

const PatientDetailsTabView = () => {
  const [value, setValue] = useState<number>(2);
  const handleChange = (_: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="simple tabs example"
      variant="fullWidth"
      sx={{
        '& .MuiTabs-indicator': {
          height: 3
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
  );
};

export default PatientDetailsTabView;
