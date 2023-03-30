import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '@components/MedicalBackground/components/MedicalBackgroundTabPanel';
import { Box, Tab, Tabs } from '@mui/material';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

import useReplaceCurrentURLMedications from '@hooks/useReplaceCurrentURLMedications';

const MedicationsTabs = () => {
  const [t] = useTranslation();
  const [activePageValue, setActivePageValue] = useState<number>(0);

  useReplaceCurrentURLMedications(activePageValue);

  const showActivePage = (index: number) => ({
    id: `medical-background-tab-${index}`,
    'aria-controls': `medical-background-tabpanel-${index}`
  });
  const handleActivePageChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActivePageValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: margins.top20 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activePageValue}
          onChange={handleActivePageChange}
          aria-label="medications tabs"
          variant="fullWidth"
        >
          <Tab label={t(Translation.PAGE_PATIENT_PRESCRIPTIONS_TITLE)} {...showActivePage(0)} />
          <Tab label={t(Translation.PAGE_PATIENT_MEDICATIONS_TITLE)} {...showActivePage(1)} />
        </Tabs>
      </Box>
      <TabPanel value={activePageValue} index={0}>
        {/* TODO Prescriptions */}
      </TabPanel>
      <TabPanel value={activePageValue} index={1}>
        {/* TODO Medications  */}
      </TabPanel>
    </Box>
  );
};

export default MedicationsTabs;
