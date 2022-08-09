import React, { useState } from 'react';
import {
  InternalButton,
  StyledInputLabel,
  StyledSelectButton,
  StyledTextareaAutosize
} from '@components/Appointments/CommonMaterialComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { AppointmentsModalProps } from '@types';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const EditAppointmentsModal = ({ openAppointmentsModal, handleCloseAppointmentsModal }: AppointmentsModalProps) => {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());
  const [appointmentTime, setAppointmentTime] = useState<Date | null>(new Date());
  const handleChange = (newValue: Date | null) => {
    setAppointmentTime(newValue);
  };

  return (
    <Dialog open={openAppointmentsModal} onClose={handleCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ maxWidth: '500px', width: '800px' }}>
          <DialogTitle>Edit Appointment</DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormControl fullWidth>
              <StyledInputLabel id="edit-appointment-label">Appointment type</StyledInputLabel>
              <StyledSelectButton
                IconComponent={KeyboardArrowDownIcon}
                id="edit-appointment-label"
                labelId="edit-appointment-label"
                label="Appointment type"
              >
                <MenuItem value={10}>MenuItem1</MenuItem>
                <MenuItem value={20}>MenuItem2</MenuItem>
                <MenuItem value={30}>MenuItem3</MenuItem>
              </StyledSelectButton>
            </FormControl>
            <StyledTextareaAutosize maxRows={4} aria-label="maximum height" defaultValue="Description (optional)" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <MobileDateTimePicker
                  label="Date"
                  value={appointmentDate}
                  onChange={(newValue) => {
                    setAppointmentDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  label="Time"
                  value={appointmentTime}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
              <FormControl sx={{ width: '50%' }}>
                <StyledInputLabel id="status-appointment-label">Status</StyledInputLabel>
                <StyledSelectButton
                  IconComponent={KeyboardArrowDownIcon}
                  id="status-appointment-label"
                  labelId="status-appointment-label"
                  label="Status"
                >
                  <MenuItem value="Booked">Booked</MenuItem>
                  <MenuItem value={20}>MenuItem2</MenuItem>
                  <MenuItem value={30}>MenuItem3</MenuItem>
                </StyledSelectButton>
              </FormControl>
              <InternalButton
                sx={{ backgroundColor: cssVariables.hoverBackgroundDark, color: cssVariables.paper, width: '50%' }}
              >
                Join Virtual Appointment
              </InternalButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <InternalButton>Cancel</InternalButton>
              <InternalButton sx={{ backgroundColor: cssVariables.hoverBackgroundDark, color: cssVariables.paper }}>
                Save
              </InternalButton>
            </Box>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default EditAppointmentsModal;
