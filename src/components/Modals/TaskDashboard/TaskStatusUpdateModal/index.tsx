import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogContent, Grid } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';
import { ITask } from 'types/reduxTypes/tasksStateTypes';

import BaseModal from '@ui-component/Modal/BaseModal';

import Actions from './Actions';
import Body from './Body';

export interface TestResultReviewConfirmationProps {
  row: ITask;
  actionType: string;
}

const TaskStatusUpdateModal = ({ row, actionType }: TestResultReviewConfirmationProps) => {
  const [modalLoading] = useState(false);
  const [t] = useTranslation();
  const modalTitle = t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_TITLE);

  const onClose = () => dispatch(viewsMiddleware.closeModal(ModalName.TaskStatusUpdateModal));

  return (
    <BaseModal isLoading={modalLoading} title={modalTitle} onClose={onClose}>
      <Grid>
        <DialogContent sx={{ p: paddings.all8 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Body row={row} actionType={actionType} />
            </Grid>
            <Grid item xs={12}>
              <Actions row={row} actionType={actionType} />
            </Grid>
          </Grid>
        </DialogContent>
      </Grid>
    </BaseModal>
  );
};

export default TaskStatusUpdateModal;
