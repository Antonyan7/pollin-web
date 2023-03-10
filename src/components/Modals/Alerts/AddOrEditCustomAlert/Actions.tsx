import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

interface ActionsProps {
  title?: string;
  alertId?: string;
  fieldValue: string;
  descriptionValue: string;
}

const Actions = ({ title, alertId, fieldValue, descriptionValue }: ActionsProps) => {
  const [t] = useTranslation();
  const confirmButtonLabel = t(Translation.COMMON_BUTTON_SAVE_LABEL);
  const deleteButtonLabel = t(Translation.COMMON_BUTTON_DELETE_LABEL);
  const router = useRouter();
  const patientId = router.query.id as string;
  const theme = useTheme();
  const isDisabled = !fieldValue || !descriptionValue;
  const isPatientCustomAlertCreated = useAppSelector(patientsSelector.isPatientCustomAlertCreated);
  const onSaveClick = useCallback(() => {
    if (alertId) {
      dispatch(
        patientsMiddleware.editPatientAlert(patientId, {
          id: alertId,
          title: fieldValue,
          description: descriptionValue
        })
      );
    } else {
      dispatch(patientsMiddleware.createPatientAlert(patientId, { title: fieldValue, description: descriptionValue }));
    }

    dispatch(viewsMiddleware.closeModal(ModalName.AddOrEditCustomAlertModal));
  }, [fieldValue, descriptionValue, patientId, alertId]);

  return (
    <DialogActions>
      <Grid container alignItems="center">
        {title ? (
          <Grid item xs={6} container justifyContent="flex-start">
            <ButtonWithLoading
              isLoading={isPatientCustomAlertCreated}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24,
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.primary.main
              }}
              variant="outlined"
              onClick={() => {
                // TODO add delete modal
              }}
            >
              {deleteButtonLabel}
            </ButtonWithLoading>
          </Grid>
        ) : null}

        <Grid item xs={title ? 6 : 12} container justifyContent="flex-end">
          <ButtonWithLoading
            isLoading={isPatientCustomAlertCreated}
            sx={{
              py: paddings.top12,
              px: paddings.leftRight24
            }}
            color="primary"
            variant="contained"
            onClick={onSaveClick}
            disabled={isDisabled}
          >
            {confirmButtonLabel}
          </ButtonWithLoading>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
