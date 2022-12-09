import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { dispatch } from '@redux/hooks';
import { resultsMiddleware } from '@redux/slices/results';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { borderRadius, margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

const Actions = () => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.COMMON_BUTTON_CONFIRM_LABEL);

  const onClickConfirm = () => {
    dispatch(
      resultsMiddleware.makeTestResultReviewed(
        // Todo get testResultId, reviewerComment from props
        'testResultId'
      )
    );
    dispatch(viewsMiddleware.closeModal(ModalName.TestResultReviewConfirmation));
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Button
              sx={{
                borderRadius: borderRadius.radius8,
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={onClickConfirm}
            >
              {confirmButtonLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
