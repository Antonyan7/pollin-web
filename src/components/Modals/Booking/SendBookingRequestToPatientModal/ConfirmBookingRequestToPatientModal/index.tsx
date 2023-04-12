import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IConfirmBookingRequestToPatientModalProps } from '@components/Modals/Booking/SendBookingRequestToPatientModal/types';
import { CloseOutlined } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { dispatch, useAppSelector } from '@redux/hooks';
import { patientsMiddleware, patientsSelector } from '@redux/slices/patients';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { margins, paddings } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import { ButtonWithLoading } from '@ui-component/common/buttons';

const ConfirmBookingRequestToPatient = (props: IConfirmBookingRequestToPatientModalProps) => {
  const [t] = useTranslation();
  const isBookingRequestToPatientLoading = useAppSelector(patientsSelector.isBookingRequestToPatientLoading);

  const onConfirmClick = useCallback(() => {
    dispatch(patientsMiddleware.sendBookingRequestToPatient(props));
  }, [props]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.closeModal(ModalName.ConfirmBookingRequestToPatientModal));
  }, []);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h3">{t(Translation.MODAL_CONFIRM_BOOKING_REQUEST_TITLE)}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Typography> {t(Translation.MODAL_CONFIRM_BOOKING_REQUEST_DESCRIPTION)}</Typography>
          <Typography sx={{ marginTop: margins.top24 }}>{t(Translation.MODAL_CONFIRM_BOOKING_REQUEST_NOTE)}</Typography>
        </DialogContent>

        <DialogActions sx={{ padding: `${paddings.top0} ${paddings.right24} ${paddings.bottom24} ${paddings.left24}` }}>
          <Grid container justifyContent="flex-end">
            <Grid>
              <ButtonWithLoading
                isLoading={isBookingRequestToPatientLoading}
                color="primary"
                variant="contained"
                onClick={onConfirmClick}
              >
                {t(Translation.COMMON_BUTTON_CONFIRM_LABEL)}
              </ButtonWithLoading>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default ConfirmBookingRequestToPatient;
