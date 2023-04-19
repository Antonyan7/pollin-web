import React, { useCallback, useState } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import AddPatientMedicationForm from './form';

const AddPatientPrescriptionModal = () => {
  const [isDirty, setIsDirty] = useState(false);

  const onClose = useCallback(() => {
    if (isDirty) {
      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.ConfirmCancellationModal,
          props: { action: () => dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal)) }
        })
      );
    } else {
      dispatch(viewsMiddleware.closeModal(ModalName.AddPatientPrescriptionModal));
    }
  }, [isDirty]);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0, minWidth: '700px' } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AddPatientMedicationForm setIsDirty={setIsDirty} />
      </LocalizationProvider>
    </Dialog>
  );
};

export default AddPatientPrescriptionModal;
