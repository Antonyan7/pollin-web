import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

export interface ConfirmAlertDeleteModalProps {
  alertId: string;
}

const ConfirmAlertDeleteModal = ({ alertId }: ConfirmAlertDeleteModalProps) => {
  const [modalLoading] = useState(false);
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_DELETE_ALERT_TITLE);
  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.ConfirmAlertDeleteModal));

  return (
    <BaseModal isLoading={modalLoading} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body />
            </Grid>
            <Grid item xs={12}>
              <Actions alertId={alertId} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default ConfirmAlertDeleteModal;
