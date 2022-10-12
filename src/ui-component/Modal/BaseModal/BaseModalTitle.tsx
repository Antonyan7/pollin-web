import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogTitleProps } from 'types/modals';

const BaseModalTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
  <DialogTitle sx={other.sx ? other.sx : { m: 0, p: 2 }} {...other}>
    {children}
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 10,
        top: 10,
        color: (theme) => theme.palette.grey[500]
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
);

export default BaseModalTitle;
