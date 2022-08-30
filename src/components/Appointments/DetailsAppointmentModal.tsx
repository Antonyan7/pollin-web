import React, { useEffect, useState } from 'react';
import { InternalButton } from '@components/Appointments/CommonMaterialComponents';
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
  Typography,
  useTheme
} from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import Router from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AppointmentsModalProps } from 'types/appointments';
import { AppointmentDetailsProps } from 'types/reduxTypes/appointments';

import DialogContentRow from '@ui-component/common/DialogContentRow';

const DetailsAppointmentModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  setOpenAppointmentsModal,
  appointmentSlotId
}: AppointmentsModalProps) => {
  const theme = useTheme();
  const appointmentDetails = useAppSelector(bookingSelector.appointmentDetails);
  const [confirmedAppointmentDetails, setConfirmedAppointmentDetails] = useState<AppointmentDetailsProps | null>(null);

  useEffect(() => {
    dispatch(bookingMiddleware.getAppointmentDetails(appointmentSlotId as string));
  }, [appointmentSlotId]);

  useEffect(() => {
    setConfirmedAppointmentDetails(appointmentDetails);
  }, [appointmentDetails]);

  return (
    <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal} fullWidth maxWidth="sm">
      {openAppointmentsModal && (
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
                <IconButton
                  onClick={() => {
                    setOpenAppointmentsModal(false);
                  }}
                >
                  <CloseOutlined sx={{ color: theme.palette.common.black }} />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={3}>
              <DialogContentRow
                subtitle="Appointment Type:"
                body={confirmedAppointmentDetails?.appointmentType?.title}
              />
              <DialogContentRow subtitle="Patient:" body={confirmedAppointmentDetails?.patient?.name} />
              <DialogContentRow subtitle="Description:" body={confirmedAppointmentDetails?.description} />
              <Grid item xs={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle1">Date:</Typography>
                  <Typography variant="body2">
                    {confirmedAppointmentDetails && timeAdjuster(confirmedAppointmentDetails?.date)?.customizedDate}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle1">Start Time:</Typography>
                  <Typography variant="body2">
                    {confirmedAppointmentDetails && timeAdjuster(confirmedAppointmentDetails?.date)?.customizedTime}
                  </Typography>
                </Stack>
              </Grid>
              <DialogContentRow subtitle="Status:" body={confirmedAppointmentDetails?.status} />
              <DialogContentRow
                subtitle="Reason for Cancellation:"
                body={confirmedAppointmentDetails?.cancellationReason}
              />
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            <Grid container>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                  <InternalButton
                    onClick={() => {
                      Router.push('/patient-chart');
                    }}
                    theme={theme}
                    sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white }}
                  >
                    View Patient Profile
                  </InternalButton>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Grid>
      )}
    </Dialog>
  );
};

export default DetailsAppointmentModal;
