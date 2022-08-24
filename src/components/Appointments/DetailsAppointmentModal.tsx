import React, { useEffect, useState } from 'react';
import { InternalButton, StyledBox } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, useTheme } from '@mui/material';
import { timeAdjuster } from 'helpers/timeAdjuster';
import Router from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { AppointmentsModalProps } from 'types/appointments';
import { AppointmentDetailsProps } from 'types/reduxTypes/appointments';

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
    if (appointmentSlotId) {
      dispatch(bookingMiddleware.getAppointmentDetails());
    }
  }, [appointmentSlotId]);
  useEffect(() => {
    setConfirmedAppointmentDetails(appointmentDetails);
  }, [appointmentDetails]);

  return (
    <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ width: '600px' }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Appointment Details</p>
            <IconButton onClick={() => setOpenAppointmentsModal(false)}>
              <CloseOutlined sx={{ color: theme.palette.common.black }} />
            </IconButton>
          </DialogTitle>
          <Divider sx={{ marginBottom: '10px' }} />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <StyledBox>
              <strong>Appointment Type:</strong> {confirmedAppointmentDetails?.appointmentType?.title}
            </StyledBox>
            <StyledBox>
              <strong>Patient:</strong> {confirmedAppointmentDetails?.patient?.name}
            </StyledBox>
            <StyledBox>
              <strong>Description:</strong> {confirmedAppointmentDetails?.description}
            </StyledBox>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <StyledBox sx={{ width: '50%' }}>
                <strong>Date:</strong>{' '}
                {confirmedAppointmentDetails && timeAdjuster(confirmedAppointmentDetails?.date)?.customizedDate}
              </StyledBox>
              <StyledBox sx={{ width: '50%' }}>
                <strong>Start Time:</strong>{' '}
                {confirmedAppointmentDetails && timeAdjuster(confirmedAppointmentDetails?.date)?.customizedTime}
              </StyledBox>
            </Box>
            <StyledBox>
              <strong>Status:</strong> {confirmedAppointmentDetails?.status}
            </StyledBox>
            <StyledBox>
              <strong>Reason for Cancellation:</strong> {confirmedAppointmentDetails?.cancellationReason}
            </StyledBox>
          </DialogContent>
          <Divider sx={{ marginTop: '10px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <InternalButton
              onClick={() => {
                Router.push('/patient-chart');
              }}
              theme={theme}
              sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white, margin: '15px' }}
            >
              View Patient Profile
            </InternalButton>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default DetailsAppointmentModal;
