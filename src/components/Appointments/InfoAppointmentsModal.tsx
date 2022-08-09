import React from 'react';
import { InternalButton } from '@components/Appointments/CommonMaterialComponents';
import { Box, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';

import { AppointmentsModalProps } from '@types';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const InfoAppointmentsModal = ({ openAppointmentsModal, handleCloseAppointmentsModal }: AppointmentsModalProps) => (
  <Dialog open={openAppointmentsModal} onClose={handleCloseAppointmentsModal}>
    {openAppointmentsModal && (
      <Box sx={{ maxWidth: '500px', width: '800px' }}>
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
            sx={{ backgroundColor: cssVariables.hoverBackgroundDark, color: cssVariables.paper, margin: '10px 15px' }}
          >
            Add
          </InternalButton>
        </Box>
      </Box>
    )}
  </Dialog>
);

export default InfoAppointmentsModal;
