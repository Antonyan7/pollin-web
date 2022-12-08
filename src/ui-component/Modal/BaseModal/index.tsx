import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import BaseModalTitle from 'ui-component/Modal/BaseModal/BaseModalTitle';

import { BaseModalStyled } from '@ui-component/Modal/BaseModal/BaseModalStyled';

export interface BaseModalProps {
  title: string;
  closeIconDataCy?: string;
  dialogContentCy?: string;
  isLoading?: boolean;
  children?: JSX.Element;
  onClose: () => void;
}

const BaseModal = ({ children, isLoading, closeIconDataCy, dialogContentCy, title, onClose }: BaseModalProps) => (
  <BaseModalStyled open onClose={onClose} aria-labelledby="customized-dialog-title">
    <BaseModalTitle dataCy={closeIconDataCy} id="customized-dialog-title" onClose={onClose}>
      {title}
    </BaseModalTitle>
    <DialogContent dividers data-cy={dialogContentCy}>
      {isLoading ? (
        <Box className="Dialog-box">
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      ) : (
        <div>{children}</div>
      )}
    </DialogContent>
  </BaseModalStyled>
);

export default BaseModal;
