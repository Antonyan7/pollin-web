import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';

import SelectMachineModalForm from './form';

export interface SelectMachineModalProps {
  specimenIds: string[];
  actionType: string;
}

const SelectMachineModal = ({ specimenIds, actionType }: SelectMachineModalProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.SelectMachineModal));
  }, []);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SelectMachineModalForm specimenIds={specimenIds} actionType={actionType} />
      </LocalizationProvider>
    </Dialog>
  );
};

export default SelectMachineModal;
