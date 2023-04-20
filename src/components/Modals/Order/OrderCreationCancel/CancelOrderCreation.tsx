import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

import Body from './Body';

const CancelOrderCreationModal = () => {
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_CONFIRM_ORDER_CREATE_CANCEL_TITLE);

  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.CancelOrderCreationModal)), []);

  return (
    <BaseModal
      dataCy={CypressIds.MODAL_ORDER_CREATE_ORDER_CANCEL_CHANGES_DIALOG}
      isLoading={false}
      title={modalTitle}
      onClose={onClose}
      closeIconDataCy={CypressIds.MODAL_ORDER_CREATE_ORDER_CANCEL_CHANGES_BUTTON_CLOSE}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default CancelOrderCreationModal;
