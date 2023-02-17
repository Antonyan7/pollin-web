import React, { useId } from 'react';
import { Box, CircularProgress, DialogContent, SxProps } from '@mui/material';
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
  disableDivider?: boolean;
  titleSx?: SxProps;
}

const BaseModal = ({
  children,
  isLoading,
  closeIconDataCy,
  dialogContentCy,
  title,
  onClose,
  dataCy,
  disableDivider,
  titleSx
}: BaseModalProps) => {
  const id = useId();

  return (
    <BaseModalStyled open onClose={onClose} data-cy={dataCy} aria-labelledby={id}>
      <BaseModalTitle
        data-cy={closeIconDataCy}
        id={id}
        onClose={onClose}
        {...(titleSx && {
          sx: titleSx
        })}
      >
        {title}
      </BaseModalTitle>
      <DialogContent dividers={!disableDivider} data-cy={dialogContentCy}>
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
