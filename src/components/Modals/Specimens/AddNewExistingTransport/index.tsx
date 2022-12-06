import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ExistingTransportFolder from '@components/Modals/Specimens/AddNewExistingTransport/ExistingTransportFolder';
import NewTransportFolder from '@components/Modals/Specimens/AddNewExistingTransport/NewTransportFolder';
import TabPanel from '@components/Specimens/TabPanel';
import { Box, DialogContent, Grid, Tab, Tabs } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

const AddNewExistingTransportModal = () => {
  const isPatientContactInformationLoading = useSelector(patientsSelector.isPatientContactInformationLoading);
  const [t] = useTranslation();
  const addNewTransportFolderModalTitleLabel = t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_TITLE
  );
  const [activePageValue, setActivePageValue] = useState<number>(0);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.AddNewExistingTransportModal));
  const handleActivePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setActivePageValue(newValue);
  };

  const showActivePage = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  });

  return (
    <BaseModal
      isLoading={isPatientContactInformationLoading}
      title={addNewTransportFolderModalTitleLabel}
      onClose={onClose}
    >
      <Grid>
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activePageValue}
                onChange={handleActivePageChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab
                  label={t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_NEW_TRANSPORT_FOLDER_LABEL
                  )}
                  {...showActivePage(0)}
                />
                <Tab
                  label={t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_EXISTING_TRANSPORT_FOLDER_LABEL
                  )}
                  {...showActivePage(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={activePageValue} index={0}>
              <NewTransportFolder />
            </TabPanel>
            <TabPanel value={activePageValue} index={1}>
              <ExistingTransportFolder />
            </TabPanel>
          </Box>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default AddNewExistingTransportModal;
