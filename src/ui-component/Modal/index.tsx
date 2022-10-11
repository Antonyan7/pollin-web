import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Translation } from 'constants/translations';

import { BaseModalStyled } from '@ui-component/Modal/BaseModalStyled';

import BaseModalTitle from './BaseModalTitle';

export interface BaseModalProps {
  title: string;
  isLoading?: boolean;
  children?: JSX.Element;
  onClose: () => void;
}

const BaseModal = ({ children, isLoading, title, onClose }: BaseModalProps) => {
  const [t] = useTranslation();

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
