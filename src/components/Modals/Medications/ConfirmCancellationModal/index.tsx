import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Body from './Body';

export interface ConfirmCancellationModalProps {
  action: () => void;
}

const ConfirmCancellationModal = ({ action }: ConfirmCancellationModalProps) => {
  const [t] = useTranslation();

  const modalTitle = t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_TITLE);

  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.ConfirmCancellationModal)), []);

  return (
    <BaseModal isLoading={false} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body action={action} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default ConfirmCancellationModal;
