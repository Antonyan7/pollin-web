import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PatientOrdersList from '@components/PatientOrders/PatientOrdersList';
import TabPanel from '@components/Specimens/TabPanel';
import { Box, Tab, Tabs } from '@mui/material';
import { Translation } from 'constants/translations';
import PatientEmrLayout from 'layout/PatientEmrLayout';

const OrdersResults = () => {
  const [t] = useTranslation();
  const [activePageValue, setActivePageValue] = useState<number>(0);
  const handleActivePageChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActivePageValue(newValue);
  };
  const showActivePage = (index: number) => ({
    id: `patient-orders-results-tab-${index}`,
    'aria-controls': `patient-orders-results-tab-tabpanel-${index}`
  });

  return (
    <Box>
      <Box>
        <Tabs
          value={activePageValue}
          onChange={handleActivePageChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label={t(Translation.PAGE_PATIENT_PROFILE_ORDERS)} {...showActivePage(0)} />
          <Tab label={t(Translation.PAGE_PATIENT_PROFILE_RESULTS)} {...showActivePage(1)} />
        </Tabs>
      </Box>
      <TabPanel value={activePageValue} index={0}>
        <PatientOrdersList />
      </TabPanel>
      <TabPanel value={activePageValue} index={1}>
        <div>Results</div>
      </TabPanel>
    </Box>
  );
};

OrdersResults.PageLayout = PatientEmrLayout;
export default OrdersResults;
