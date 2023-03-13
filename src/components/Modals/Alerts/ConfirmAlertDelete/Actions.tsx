import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface ActionsProps {
  alertId: string;
}

const Actions = ({ alertId }: ActionsProps) => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.COMMON_BUTTON_CONFIRM_LABEL);
  const isAlertDeleted = useAppSelector(patientsSelector.isAlertDeleted);

  const onClickConfirm = () => {
    dispatch(patientsMiddleware.deletePatientAlert(alertId));
    dispatch(viewsMiddleware.closeModal(ModalName.ConfirmAlertDeleteModal));
    dispatch(viewsMiddleware.closeModal(ModalName.AddOrEditCustomAlertModal));
  };

  return (
    <DialogActions sx={{ marginTop: margins.top4 }}>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isAlertDeleted}
              sx={{
                py: paddings.top12,
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
