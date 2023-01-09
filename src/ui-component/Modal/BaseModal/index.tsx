import React, { useId } from 'react';
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
  dataCy?: string;
}

const BaseModal = ({
  children,
  isLoading,
  closeIconDataCy,
  dialogContentCy,
  title,
  onClose,
  dataCy
}: BaseModalProps) => {
  const id = useId();

  return (
    <BaseModalStyled open onClose={onClose} data-cy={dataCy} aria-labelledby={id}>
      <BaseModalTitle dataCy={closeIconDataCy} id={id} onClose={onClose}>
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
};

export default BaseModal;
