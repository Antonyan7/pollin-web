import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledButton } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { ModalName } from 'constants/modals';
import { Translation } from 'constants/translations';
import { timeAdjuster } from 'helpers/timeAdjuster';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware, viewsSelector } from 'redux/slices/views';

import DialogContentRow from '@ui-component/common/DialogContentRow';

const DetailsAppointmentModal = () => {
  const details = useAppSelector(bookingSelector.appointmentDetails);
  const { appointmentId } = useAppSelector(viewsSelector.modal).props;
  const router = useRouter();
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(bookingMiddleware.getAppointmentDetails(appointmentId));
  }, [appointmentId]);

  const onClose = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.NONE, props: {} }));
    dispatch(bookingMiddleware.clearAppointmentDetails());
  }, []);

  const onViewProfileClick = useCallback(() => {
    onClose();
    router.push(`/patient-emr/profile/${details?.patient.id}`);
  }, [router, onClose, details]);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <Grid>
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}
              >
                {t(Translation.MODAL_APPOINTMENTS_DETAILS_TITLE)}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={onClose}>
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_APPOINTMENT_TYPE)}
              body={details?.serviceType?.title}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_PATIENT)}
              body={details?.patient?.name}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_DESCRIPTION)}
              body={details?.appointment.description}
            />
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1">{t(Translation.MODAL_APPOINTMENTS_DETAILS_DATE)}</Typography>
                <Typography variant="body2">
                  {details && timeAdjuster(details?.appointment.date as Date)?.customizedDate}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1">{t(Translation.MODAL_APPOINTMENTS_DETAILS_START_TIME)}</Typography>
                <Typography variant="body2">
                  {details && timeAdjuster(details?.appointment.date as Date)?.customizedTime}
                </Typography>
              </Stack>
            </Grid>
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_STATUS)}
              body={details?.appointment.status}
            />
            <DialogContentRow
              subtitle={t(Translation.MODAL_APPOINTMENTS_DETAILS_REASON)}
              body={details?.appointment.cancellationReason}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <StyledButton onClick={onViewProfileClick} color="secondary" variant="contained">
                  {t(Translation.MODAL_APPOINTMENTS_DETAILS_BUTTON_VIEW)}
                </StyledButton>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default DetailsAppointmentModal;
