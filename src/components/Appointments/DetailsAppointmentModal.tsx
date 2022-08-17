import React, { useEffect, useState } from 'react';
import { InternalButton } from '@components/Appointments/CommonMaterialComponents';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, useTheme } from '@mui/material';
import { dispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/store';
import { getAppointmentDetails } from 'redux/utils/appointments';
import { AppointmentDetailsProps } from 'types/reduxTypes/appointments';

import { redirectTo } from '@utils/redirectTo';

import { AppointmentsModalProps } from '../../types/appointments';

const DetailsAppointmentModal = ({
  openAppointmentsModal,
  onCloseAppointmentsModal,
  setOpenAppointmentsModal,
  appointmentSlotId
}: AppointmentsModalProps) => {
  const theme = useTheme();
  const { appointmentDetails } = useAppSelector((state: RootState) => state.appointments);
  const [confirmedAppointmentDetails, setConfirmedAppointmentDetails] = useState<AppointmentDetailsProps[]>([]);

  useEffect(() => {
    dispatch(getAppointmentDetails(appointmentSlotId));
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
          <Divider sx={{ padding: '10px 0px' }} />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box sx={{ textAlign: 'left', m: 1 }}>
              <strong>Appointment Type:</strong> {confirmedAppointmentDetails[0]?.appointmentType?.title}
            </Box>
            <Box sx={{ textAlign: 'left', m: 1 }}>
              <strong>Patient:</strong> {confirmedAppointmentDetails[0]?.patient?.name}
            </Box>
            <Box sx={{ textAlign: 'left', m: 1 }}>
              <strong>Description:</strong> {confirmedAppointmentDetails[0]?.description}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ textAlign: 'left', m: 1, width: '50%' }}>
                <strong>Date:</strong> {confirmedAppointmentDetails[0]?.date.getDate()}
              </Box>
              <Box sx={{ textAlign: 'left', m: 1, width: '50%' }}>
                <strong>Start Time:</strong> {new Date().getTime()}
              </Box>
            </Box>
            <Box sx={{ textAlign: 'left', m: 1 }}>
              <strong>Status:</strong> {confirmedAppointmentDetails[0]?.status[0]}
            </Box>
            <Box sx={{ textAlign: 'left', m: 1 }}>
              <strong>Reason for Cancellation:</strong> {confirmedAppointmentDetails[0]?.cancellationReason}
            </Box>
          </DialogContent>
          <Divider sx={{ padding: '10px 0px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <InternalButton
              onClick={() => {
                redirectTo('/patient-chart');
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
