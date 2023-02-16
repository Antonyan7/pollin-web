import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { findStatusByID } from 'helpers/tasks';
import { formatDate } from 'helpers/time';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { margins, paddings } from 'themes/themeConstants';

const Body = () => {
  const [t] = useTranslation();
  const taskDetails = useAppSelector(tasksSelector.taskDetails);
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const status = findStatusByID(taskDetails.statusId, taskStatuses);

  return (
    <Grid container spacing={1} sx={{ maxHeight: '581px', minWidth: '500px', overflowY: 'scroll' }}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_PATIENT_NAME)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.patient ? taskDetails?.patient.name : 'N/A'} </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_DUE)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{timeAdjuster(new Date(taskDetails.dueDate)).customizedDate}</Typography>
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
      <Grid item xs={4}>
        <Typography variant="caption" align="right" sx={{ marginLeft: margins.all24 }}>
          {formatDate(new Date(taskDetails.createdBy.date))}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {t(Translation.MODAL_REVIEW_RESULTS_STATUS)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Chip
          sx={{ background: status?.label?.background, color: status?.label?.text, padding: paddings.all8 }}
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
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ marginLeft: margins.all20 }}>
                  {formatDate(new Date(history.date))}
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
