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

const ErrorModal = () => {
  const [modalLoading] = useState(false);
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_ERROR_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.ErrorModal));

  return (
    <BaseModal isLoading={modalLoading} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default ErrorModal;
