import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MedicalBackgroundHeader from '@components/MedicalBackground/components/Header';
import MedicalBackgroundTabPanel from '@components/MedicalBackground/components/MedicalBackgroundTabPanel';
import ContactPage from '@components/MedicalBackground/Contact';
import { Box, Tab, Tabs } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsMiddleware } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';

import useReplaceCurrentUrl from '@hooks/useReplaceCurrentUrl';
import SubCardStyled from '@ui-component/cards/SubCardStyled';

import MedicalHistory from './MedicalHistory';

const MedicalBackgroundTabs = () => {
  const [t] = useTranslation();
  const [activePageValue, setActivePageValue] = useState<number>(0);

  useEffect(() => {
    dispatch(patientsMiddleware.getPatientMedicalBackgroundDropdownOptions());
  }, []);

  useReplaceCurrentUrl(activePageValue);

  const showActivePage = (index: number) => ({
    id: `medical-background-tab-${index}`,
    'aria-controls': `medical-background-tabpanel-${index}`
  });
  const handleActivePageChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActivePageValue(newValue);
  };

  return (
    <SubCardStyled
      content
      sx={{
        mt: margins.top20
      }}
      title={<MedicalBackgroundHeader />}
    >
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activePageValue}
            onChange={handleActivePageChange}
            aria-label="medical background tabs"
            variant="fullWidth"
          >
            <Tab
              label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_BACKGROUND_MEDICAL_HISTORY)}
              {...showActivePage(0)}
            />
            <Tab label={t(Translation.PAGE_PATIENT_PROFILE_MEDICAL_CONTACT)} {...showActivePage(1)} />
          </Tabs>
        </Box>
        <MedicalBackgroundTabPanel value={activePageValue} index={0}>
          <MedicalHistory />
        </MedicalBackgroundTabPanel>
        <MedicalBackgroundTabPanel value={activePageValue} index={1}>
          <ContactPage />
        </MedicalBackgroundTabPanel>
      </Box>
    </SubCardStyled>
  );
};

export default MedicalBackgroundTabs;
