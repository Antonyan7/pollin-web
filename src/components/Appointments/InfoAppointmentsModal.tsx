import React from 'react';
import { InternalButton } from '@components/Appointments/CommonMaterialComponents';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography, useTheme } from '@mui/material';

import { AppointmentsModalProps } from '../../types/appointments';

const InfoAppointmentsModal = ({ openAppointmentsModal, onCloseAppointmentsModal }: AppointmentsModalProps) => {
  const theme = useTheme();

  return (
    <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ width: '500px' }}>
          <DialogTitle>Start Time Error</DialogTitle>
          <Divider sx={{ padding: '10px 0px' }} />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography>
              The duration of the selected appointment type and the selection start time conflict with clinic operating
              hours and/or calendar blocks.
              <br />
              <br />
              Please select another start time.
            </Typography>
          </DialogContent>
          <Divider sx={{ padding: '10px 0px' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <InternalButton
              theme={theme}
              sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white, margin: '10px 15px' }}
            >
              Add
            </InternalButton>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default InfoAppointmentsModal;
