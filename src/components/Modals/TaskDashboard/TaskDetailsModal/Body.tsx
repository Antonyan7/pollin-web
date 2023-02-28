import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import { findStatusByID } from 'helpers/tasks';
import { margins, paddings } from 'themes/themeConstants';

import { convertToLocale, getCurrentDate, getDate } from '@utils/dateUtils';

const Body = () => {
  const [t] = useTranslation();
  const taskDetails = useAppSelector(tasksSelector.taskDetails);
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const status = findStatusByID(taskDetails.statusId, taskStatuses);
  const currentDay = getCurrentDate();
  const isOverdue = getDate(taskDetails.dueDate) < getDate(currentDay);

  return (
    <Grid container spacing={1} sx={{ maxHeight: '400px', minWidth: '500px', overflowY: 'scroll' }}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_PATIENT_NAME)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.patient?.name ?? 'N/A'}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_DUE)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" color={(theme) => (isOverdue ? theme.palette.error.main : '')}>
          {format(new Date(convertToLocale(taskDetails.dueDate)), 'MMM dd, yyyy HH:mm')}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_DESCRIPTION)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.description} </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_PRIORITY)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.priorityId}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_CREATED_BY)}:
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">{taskDetails.createdBy.name} </Typography>
      </Grid>
      <Grid item xs={4} alignItems="end">
        <Typography variant="caption" ml={margins.left4}>
          {format(new Date(convertToLocale(taskDetails.createdBy.date)), 'MMM dd, yyyy HH:mm')}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_STATUS)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Chip
          sx={{ background: status?.label?.backgroundColor, color: status?.label?.textColor, padding: paddings.all8 }}
          label={status?.title}
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        {taskDetails.reassigningHistory &&
          taskDetails?.reassigningHistory.map((history) => (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t(Translation.MODAL_REVIEW_RESULTS_REASSIGNED_BY)}:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" display="inline">
                  {history.assignor.name}{' '}
                </Typography>
              </Grid>
              <Grid item xs={4} alignItems="end">
                <Typography variant="caption">
                  {format(new Date(convertToLocale(history.date)), 'MMM dd, yyyy HH:mm')}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {t(Translation.MODAL_REVIEW_RESULTS_REASSIGNMENT_NOTES)}:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">{history.note}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Body;
