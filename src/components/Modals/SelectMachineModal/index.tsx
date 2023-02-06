import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { ISpecimensListItem } from 'types/reduxTypes/resultsStateTypes';

import SelectMachineModalForm from './form';

export interface SelectMachineModalProps {
  specimens: ISpecimensListItem[];
  actionType: string;
}

const SelectMachineModal = ({ specimens, actionType }: SelectMachineModalProps) => {
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.SelectMachineModal));
  }, []);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SelectMachineModalForm specimens={specimens} actionType={actionType} />
      </LocalizationProvider>
    </Dialog>
  );
};

export default SelectMachineModal;
