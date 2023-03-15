import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogActions, Grid, Stack, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const Actions = () => {
  const [t] = useTranslation();
  const rejectPhotoLabel = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_REJECT);
  const approvePhotoLabel = t(Translation.MODAL_VERIFY_PATIENT_PHOTO_APPROVE);

  const patientProfile = useAppSelector(patientsSelector.patientProfile);
  const isVerifyPatientProfilePhotoLoading = useAppSelector(patientsSelector.isVerifyPatientProfilePhotoLoading);

  const theme = useTheme();

  const onClickConfirm = useCallback(
    (value: boolean) => {
      if (patientProfile?.id) {
        dispatch(patientsMiddleware.verifyPatientProfilePhoto(patientProfile.id, value));
      }
    },
    [patientProfile?.id]
  );

  return (
    <DialogActions>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ButtonWithLoading
              isLoading={isVerifyPatientProfilePhotoLoading}
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
              isLoading={isVerifyPatientProfilePhotoLoading}
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
