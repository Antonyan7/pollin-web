import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Translation } from 'constants/translations';

import { BaseModalStyled } from '@ui-component/Modal/BaseModalStyled';

import { ModalName } from '../../constants/modals';
import { dispatch, useAppSelector } from '../../redux/hooks';
import { viewsMiddleware, viewsSelector } from '../../redux/slices/views';

import BaseModalTitle from './BaseModalTitle';

const BaseModal = ({ children }: { children?: JSX.Element }) => {
  const [t] = useTranslation();
  const { title, isLoading } = useAppSelector(viewsSelector.modal).props;

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
  }, []);

  return (
    <BaseModalStyled open onClose={onClose} aria-labelledby="customized-dialog-title">
      <BaseModalTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </BaseModalTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box className="DialogBox">
            <CircularProgress sx={{ margin: 'auto' }} />
          </Box>
        ) : (
          <div>{children}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t(Translation.MODAL_CANCEL)}
        </Button>
        <Button variant="contained">Confirm</Button>
      </DialogActions>
    </BaseModalStyled>
  );
};

export default BaseModal;
