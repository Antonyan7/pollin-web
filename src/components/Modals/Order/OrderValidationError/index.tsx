/* eslint-disable react/no-danger */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, DialogContent, Grid, Stack, useTheme } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import BaseModal from '@ui-component/Modal/BaseModal';

export interface OrderValidationErrorModalProps {
  title: string;
  html: string;
}

const OrderValidationErrorModal = ({ title, html }: OrderValidationErrorModalProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const onClose = useCallback(() => dispatch(viewsMiddleware.closeModal(ModalName.OrderValidationErrorModal)), []);

  return (
    <BaseModal isLoading={false} title={title} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Stack width="500px" color={theme.palette.common.black}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} data-cy={CypressIds.MODAL_ORDER_VALIDATION_ERROR_BUTTON_OK}>
            {t(Translation.MODAL_ORDER_VALIDATION_ERROR_BUTTON_OK)}
          </Button>
        </DialogActions>
      </Grid>
    </BaseModal>
  );
};

export default OrderValidationErrorModal;
