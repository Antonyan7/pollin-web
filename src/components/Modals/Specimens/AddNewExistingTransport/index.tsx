import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ExistingTransportFolder from '@components/Modals/Specimens/AddNewExistingTransport/ExistingTransportFolder';
import NewTransportFolder from '@components/Modals/Specimens/AddNewExistingTransport/NewTransportFolder';
import TabPanel from '@components/Specimens/TabPanel';
import TargetsList from '@components/TargetsList';
import { Box, DialogContent, Grid, styled, Tab, Tabs } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { IAddNewExistingTransportModalProps } from 'types/reduxTypes/resultsStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

const TransportModalTab = styled(Tab)(() => ({
  textTransform: 'none'
}));

const AddNewExistingTransportModal = (props: IAddNewExistingTransportModalProps) => {
  const { specimenIds, selectedIdentifiers } = props;
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

  const specimenIdLabel = t(Translation.COMMON_MODAL_SPECIMEN_ID_LABEL);

  return (
    <BaseModal
      isLoading={isPatientContactInformationLoading}
      title={addNewTransportFolderModalTitleLabel}
      onClose={onClose}
      closeIconDataCy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_CLOSE_BUTTON}
    >
      <Grid>
        <DialogContent sx={{ padding: 0 }}>
          <Grid pb={paddings.bottom24} pt={paddings.top12}>
            <TargetsList label={specimenIdLabel} values={selectedIdentifiers} />
          </Grid>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activePageValue}
                onChange={handleActivePageChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <TransportModalTab
                  label={t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_NEW_TRANSPORT_FOLDER_LABEL
                  )}
                  {...showActivePage(0)}
                  data-cy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_TAB_NEW}
                />
                <TransportModalTab
                  label={t(
                    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_EXISTING_TRANSPORT_FOLDER_MODAL_EXISTING_TRANSPORT_FOLDER_LABEL
                  )}
                  {...showActivePage(1)}
                  data-cy={CypressIds.MODAL_SPECIMEN_TRACKING_ADD_NEW_OR_EXISTING_TRANSPORT_TAB_EXISTING}
                />
              </Tabs>
            </Box>
            <TabPanel value={activePageValue} index={0}>
              <NewTransportFolder
                specimenIds={specimenIds}
                selectedIdentifiers={selectedIdentifiers}
                modalName={ModalName.AddNewExistingTransportModal}
              />
            </TabPanel>
            <TabPanel value={activePageValue} index={1}>
              <ExistingTransportFolder
                specimenIds={specimenIds}
                selectedIdentifiers={selectedIdentifiers}
                modalName={ModalName.AddNewExistingTransportModal}
              />
            </TabPanel>
          </Box>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default AddNewExistingTransportModal;
