import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogTitleProps } from 'types/modals';

const BaseModalTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
  <DialogTitle sx={other.sx ? other.sx : { m: 0, px: 6, py: 3, fontSize: '1.25rem', fontWeight: 700 }} {...other}>
    {children}
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 48,
        top: 20,
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
);

export default BaseModalTitle;
