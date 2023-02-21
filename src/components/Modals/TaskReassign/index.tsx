import React, { useCallback, useEffect } from 'react';
import { CircularProgress, Dialog, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { dispatch, useAppSelector } from 'redux/hooks';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import ReassignForm from './form';

export interface TaskReassignModalProps {
  row: ITask;
}

const Reassign = ({ row }: TaskReassignModalProps) => {
  const isTaskDetailsLoading = useAppSelector(tasksSelector.isTaskDetailsLoading);
  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.ReassignTaskModal));
  }, []);

  useEffect(() => {
    dispatch(tasksMiddleware.getTasksDetails(row.uuid));
  }, [row.uuid]);

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { p: 0 } }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {!isTaskDetailsLoading ? (
          <ReassignForm id={row.uuid} />
        ) : (
          <Grid sx={{ minHeight: '300px' }} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Grid>
        )}
      </LocalizationProvider>
    </Dialog>
  );
};

export default Reassign;
