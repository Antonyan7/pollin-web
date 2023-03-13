import React, { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
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
}

const Actions = ({ title, alertId }: ActionsProps) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const patientId = router.query.id as string;

  const { control } = useFormContext();
  const titleField = useController({ control, name: 'title' }).field;
  const descriptionField = useController({ control, name: 'description' }).field;

  const isDisabled = !titleField.value || !descriptionField.value;
  const isPatientCustomAlertCreated = useAppSelector(patientsSelector.isPatientCustomAlertCreated);

  const onSaveClick = useCallback(() => {
    if (alertId) {
      dispatch(
        patientsMiddleware.editPatientAlert(patientId, {
          id: alertId,
          title: titleField.value,
          description: descriptionField.value
        })
      );
    } else {
      dispatch(
        patientsMiddleware.createPatientAlert(patientId, {
          title: titleField.value,
          description: descriptionField.value
        })
      );
    }

    dispatch(viewsMiddleware.closeModal(ModalName.AddOrEditCustomAlertModal));
  }, [titleField, descriptionField, patientId, alertId]);

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
                dispatch(
                  viewsMiddleware.openModal({
                    name: ModalName.ConfirmAlertDeleteModal,
                    props: { alertId }
                  })
                );
              }}
            >
              {t(Translation.COMMON_BUTTON_DELETE_LABEL)}
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
            {t(Translation.COMMON_BUTTON_SAVE_LABEL)}
          </ButtonWithLoading>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
