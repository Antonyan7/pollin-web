import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import CreateTaskModalForm from './form';

const CreateTaskModal = () => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.CreateTaskModal));
  }, []);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CreateTaskModalForm />
      </LocalizationProvider>
    </Dialog>
  );
};

export default CreateTaskModal;
