import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITaskStatusOption } from '@axios/tasks/tasksManagerTypes';
import { TestResultReviewConfirmationProps } from '@components/Modals/TaskDashboard/TaskStatusUpdateModal/index';
import { Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { findStatusByID } from 'helpers/tasks';

const Body = ({ row, actionType }: TestResultReviewConfirmationProps) => {
  const [t] = useTranslation();

  const taskStatuses: ITaskStatusOption[] = useAppSelector(tasksSelector.tasksStatusList);
  const previousStatus = findStatusByID(row.statusId, taskStatuses);
  const updatedStatus = taskStatuses.find((status) => status.statusId === actionType);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography>{t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_MESSAGE)}</Typography>
      </Grid>
      <Grid item width="fit-content">
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_TASK)}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_PATIENT)}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_PREVIOUS_STATUS)}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_TASK_MANAGEMENT_TASK_STATUS_UPDATE_UPDATED_STATUS)}
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <Typography variant="subtitle1">{row?.name} </Typography>
        <Typography variant="subtitle1">{row?.patient?.name ?? 'N/A'}</Typography>
        <Typography variant="subtitle1">{previousStatus.title} </Typography>
        <Typography variant="subtitle1">{updatedStatus?.title} </Typography>
      </Grid>
    </Grid>
  );
};

export default Body;
