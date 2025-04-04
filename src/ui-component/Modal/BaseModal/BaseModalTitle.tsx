import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton } from '@mui/material';
import { DialogTitleProps } from 'types/modals';

const BaseModalTitle = ({ children, onClose, hideCloseIcon = false, ...other }: DialogTitleProps) => (
  <DialogTitle sx={other.sx ? other.sx : { m: 0, px: 4, py: 3, fontSize: '1.25rem', fontWeight: 500 }} {...other}>
    {children}
    {!hideCloseIcon ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 20,
          top: 20,
          color: (theme) => theme.palette.primary.main
        }}
        data-cy={other.dataCy}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
  </DialogTitle>
);

export default BaseModalTitle;
