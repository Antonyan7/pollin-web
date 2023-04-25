import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { tasksSelector } from '@redux/slices/tasks';
import { Translation } from 'constants/translations';
import { findStatusByID } from 'helpers/tasks';
import { margins, paddings } from 'themes/themeConstants';
import { v5 as uuidv5 } from 'uuid';

import { DateUtil } from '@utils/date/DateUtil';
import { isDashValue } from '@utils/stringUtils';

const Body = () => {
  const [t] = useTranslation();
  const taskDetails = useAppSelector(tasksSelector.taskDetails);
  const taskStatuses = useAppSelector(tasksSelector.tasksStatusList);
  const status = findStatusByID(taskDetails.statusId, taskStatuses);
  const isOverdue = new Date(taskDetails.dueDate).valueOf() < new Date().valueOf();

  return (
    <Grid container spacing={1} sx={{ maxHeight: '400px', minWidth: '500px', overflowY: 'scroll' }}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t(Translation.MODAL_REVIEW_RESULTS_PATIENT_NAME)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.patient?.name ?? 'N/A'}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t(Translation.MODAL_REVIEW_RESULTS_DUE)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" color={(theme) => (isOverdue ? theme.palette.error.main : '')}>
          {taskDetails.dueDate && !isDashValue(taskDetails.dueDate)
            ? DateUtil.formatFullDate(taskDetails.dueDate)
            : '-'}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t(Translation.MODAL_REVIEW_RESULTS_DESCRIPTION)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.description} </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t(Translation.MODAL_REVIEW_RESULTS_PRIORITY)}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">{taskDetails?.priorityId}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
          {t(Translation.MODAL_REVIEW_RESULTS_CREATED_BY)}:
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1">{taskDetails.createdBy.name} </Typography>
      </Grid>
      <Grid item xs={4} alignItems="end">
        <Typography variant="caption" ml={margins.left4}>
          {DateUtil.formatFullDate(taskDetails.createdBy.date)}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight={500}>
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
          taskDetails?.reassigningHistory.map((history, index) => (
            // TODO key from API response TEAMA-5500
            <Grid container key={uuidv5(JSON.stringify(history).concat(index.toString()), uuidv5.URL)} spacing={2}>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {t(Translation.MODAL_REVIEW_RESULTS_REASSIGNED_BY)}:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" display="inline">
                  {history.assignor.name}{' '}
                </Typography>
              </Grid>
              <Grid item xs={4} alignItems="end">
                <Typography variant="caption">{DateUtil.formatFullDate(history.date)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" fontWeight={500}>
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
