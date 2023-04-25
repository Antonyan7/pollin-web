import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Stack } from '@mui/material';

interface Props {
  header: React.ReactNode;
  modalContent: React.ReactNode;
  footer: React.ReactNode;
}

const ViewModal = ({ header, modalContent, footer, ...props }: Props & Partial<DialogProps>) => {
  const { open = true, maxWidth = 'sm', fullWidth = true, ...dialogProps } = props;

  return (
    <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth} {...dialogProps}>
      <Stack px={1.5}>
        {typeof header === 'string' ? <DialogTitle>{header}</DialogTitle> : header}
        <DialogContent>{modalContent}</DialogContent>
        <DialogActions>{footer}</DialogActions>
      </Stack>
    </Dialog>
  );
};

export default ViewModal;
