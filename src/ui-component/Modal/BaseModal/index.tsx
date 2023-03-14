import React, { useId } from 'react';
import { Box, CircularProgress, DialogContent, SxProps, Theme } from '@mui/material';
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
  titleSx?: SxProps<Theme>;
  hideCloseIcon?: boolean;
  sx?: SxProps<Theme>;
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
  titleSx,
  hideCloseIcon,
  sx
}: BaseModalProps) => {
  const id = useId();

  return (
    <BaseModalStyled open onClose={onClose} data-cy={dataCy} aria-labelledby={id} sx={sx}>
      <BaseModalTitle
        data-cy={closeIconDataCy}
        id={id}
        onClose={onClose}
        {...(titleSx && {
          sx: titleSx
        })}
        hideCloseIcon={hideCloseIcon}
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
