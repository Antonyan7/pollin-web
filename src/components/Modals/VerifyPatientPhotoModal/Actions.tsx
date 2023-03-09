import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const Actions = () => {
  const [t] = useTranslation();
  const rejectPhotoLabel = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_REJECT);
  const approvePhotoLabel = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_APPROVE);

  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const setIsVerifyPatientProfilePhotoLoading = useAppSelector(patientsSelector.setIsVerifyPatientProfilePhotoLoading);

  const theme = useTheme();

  const onClickConfirm = useCallback(
    (value: boolean) => {
      if (patientProfile?.id) {
        dispatch(patientsMiddleware.verifyPatientProfilePhoto(patientProfile.id, value));
      }

      dispatch(viewsMiddleware.closeModal(ModalName.VerifyPatientPhotoModal));
    },
    [patientProfile?.id]
  );

  return (
    <DialogActions>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={setIsVerifyPatientProfilePhotoLoading}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24,
                mr: margins.right6,
                color: theme.palette.primary.main,
                background: theme.palette.common.white
              }}
              color="primary"
              variant="outlined"
              onClick={() => onClickConfirm(false)}
            >
              {rejectPhotoLabel}
            </ButtonWithLoading>
            <ButtonWithLoading
              isLoading={setIsVerifyPatientProfilePhotoLoading}
              sx={{
                py: paddings.top12,
                px: paddings.leftRight24
              }}
              color="primary"
              variant="contained"
              onClick={() => onClickConfirm(true)}
            >
              {approvePhotoLabel}
            </ButtonWithLoading>
          </Stack>
        </Grid>
      </Grid>
    </DialogActions>
  );
};

export default Actions;
