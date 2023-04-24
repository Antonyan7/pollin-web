import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { dispatch } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import { CreateOrEditModalContext } from './context/CreateOrEditModalContext';
import { getInitialTaskValues } from './helpers/getTaskInitialValues';
import CreateOrEditTaskModalForm from './form';

export interface CreateOrEditTaskModalProps {
  task?: ITask;
}

const CreateOrEditTaskModal = ({ task }: CreateOrEditTaskModalProps) => {
  const isEditModal = !!task;

  const onClose = useCallback(() => {
    if (isEditModal) {
      dispatch(viewsMiddleware.closeModal(ModalName.EditTaskModal));
    } else {
      dispatch(viewsMiddleware.closeModal(ModalName.CreateTaskModal));
    }
  }, [isEditModal]);

  return (
    <CreateOrEditModalContext.Provider value={getInitialTaskValues(task)}>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CreateOrEditTaskModalForm taskId={task?.uuid} />
        </LocalizationProvider>
      </Dialog>
    </CreateOrEditModalContext.Provider>
  );
};

export default CreateOrEditTaskModal;
