import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DialogContent, Divider, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { ITransportListFolderProps } from 'types/reduxTypes/resultsStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

import Body from './form/Body';

export interface HandoffConfirmationModalProps {
  row: ITransportListFolderProps;
}

const HandoffConfirmation = ({ row }: HandoffConfirmationModalProps) => {
  const isPatientContactInformationLoading = useSelector(patientsSelector.isPatientContactInformationLoading);
  const [t] = useTranslation();
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.HandoffConfirmation));

  return (
    <BaseModal
      isLoading={isPatientContactInformationLoading}
      title={t(Translation.MODAL_HANDOFF_CONFIRMATION_TITLE)}
      onClose={onClose}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all12 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body row={row} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: margins.bottom16 }} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default HandoffConfirmation;
