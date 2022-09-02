import React, { useCallback, useEffect } from 'react';
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
                Appointment Details
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
            <DialogContentRow subtitle="Appointment Type:" body={details?.serviceType?.title} />
            <DialogContentRow subtitle="Patient:" body={details?.patient?.title} />
            <DialogContentRow subtitle="Description:" body={details?.appointment.description} />
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1">Date:</Typography>
                <Typography variant="body2">
                  {details && timeAdjuster(details?.appointment.date)?.customizedDate}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1">Start Time:</Typography>
                <Typography variant="body2">
                  {details && timeAdjuster(details?.appointment.date)?.customizedTime}
                </Typography>
              </Stack>
            </Grid>
            <DialogContentRow subtitle="Status:" body={details?.appointment.status} />
            <DialogContentRow subtitle="Reason for Cancellation:" body={details?.appointment.cancellationReason} />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <StyledButton onClick={onViewProfileClick} variant="contained">
                  View Patient Profile
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
