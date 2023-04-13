import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import AddPatientMedicationForm from './form';

const AddPatientPrescriptionModal = () => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
  }, []);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0, minWidth: '700px' } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AddPatientMedicationForm />
      </LocalizationProvider>
    </Dialog>
  );
};

export default AddPatientPrescriptionModal;
