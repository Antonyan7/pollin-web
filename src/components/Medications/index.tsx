import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '@components/Medications/layout/Medications/MedicationsTabPanel';
import { Box, Tab, Tabs } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import useReplaceCurrentURLMedications from '@hooks/useReplaceCurrentURLMedications';

import Medications from './layout/Medications';
import Prescriptions from './layout/Prescriptions';

const MedicationsTabs = () => {
  const [t] = useTranslation();
  const [activePageValue, setActivePageValue] = useState<number>(0);

  useReplaceCurrentURLMedications(activePageValue);

  const isMedicationFieldsDirty = useAppSelector(patientsSelector.isMedicationFieldsDirty);

  const showActivePage = (index: number) => ({
    id: `medications-tab-${index}`,
    'aria-controls': `medications-tabpanel-${index}`
  });
  const handleActivePageChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (isMedicationFieldsDirty) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ConfirmCancellationModal,
          props: {
            action: () => {
              setActivePageValue(newValue);
              dispatch(patientsMiddleware.isMedicationFieldsDirty(false));
              dispatch(patientsMiddleware.updateCardToEditMode(-1, []));
            }
          }
        })
      );
    } else {setActivePageValue(newValue);}
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
        <Prescriptions />
      </TabPanel>
      <TabPanel value={activePageValue} index={1}>
        <Medications />
      </TabPanel>
    </Box>
  );
};

export default MedicationsTabs;
