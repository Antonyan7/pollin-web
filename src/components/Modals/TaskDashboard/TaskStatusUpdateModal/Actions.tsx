import React from 'react';
import { useTranslation } from 'react-i18next';
import { TestResultReviewConfirmationProps } from '@components/Modals/TaskDashboard/TaskStatusUpdateModal/index';
import { DialogActions, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { tasksMiddleware, tasksSelector } from '@redux/slices/tasks';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const Actions = ({ row, actionType }: TestResultReviewConfirmationProps) => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.COMMON_BUTTON_CONFIRM_LABEL);
  const isTaskUpdated = useAppSelector(tasksSelector.isTaskUpdated);

  const onClickConfirm = () => {
    dispatch(tasksMiddleware.updateTaskStatus(row.uuid, actionType));
    dispatch(viewsMiddleware.closeModal(ModalName.TaskStatusUpdateModal));
  };

  return (
    <DialogActions>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isTaskUpdated}
              sx={{
                py: paddings.topBottom12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={onClickConfirm}
            >
              {confirmButtonLabel}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
