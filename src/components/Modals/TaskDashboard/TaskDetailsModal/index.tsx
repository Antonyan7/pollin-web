import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid, Theme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

export interface TaskDetailsModalProps {
  row: ITask;
}

const TaskDetailsModal = ({ row }: TaskDetailsModalProps) => {
  const isTaskDetailsLoading = useAppSelector(tasksSelector.isTaskDetailsLoading);

  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_REVIEW_RESULTS_TITLE);

  useEffect(() => {
    dispatch(tasksMiddleware.getTasksDetails(row.uuid));
  }, [row.uuid]);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.TaskDetailsModal));

  return (
    <BaseModal
      isLoading={isTaskDetailsLoading}
      title={modalTitle}
      onClose={onClose}
      titleSx={{
        '& .MuiSvgIcon-root': {
          fill: (theme: Theme) => theme.palette.primary.main
        },
        marginTop: margins.top8
      }}
    >
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body />
            </Grid>
            <Grid item xs={12}>
              <Actions />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default TaskDetailsModal;
