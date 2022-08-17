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
  TextField,
  useTheme
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { AppointmentsModalProps } from '../../types/appointments';

const EditAppointmentsModal = ({ openAppointmentsModal, onCloseAppointmentsModal }: AppointmentsModalProps) => {
  const theme = useTheme();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());
  const [appointmentTime, setAppointmentTime] = useState<Date | null>(new Date());
  const handleChange = (newValue: Date | null) => {
    setAppointmentTime(newValue);
  };

  return (
    <Dialog open={openAppointmentsModal} onClose={onCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ width: '500px' }}>
          <DialogTitle>Edit Appointment</DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormControl fullWidth>
              <StyledInputLabel theme={theme} id="edit-appointment-label">
                Appointment type
              </StyledInputLabel>
              <StyledSelectButton
                theme={theme}
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
            <StyledTextareaAutosize
              theme={theme}
              maxRows={4}
              aria-label="maximum height"
              defaultValue="Description (optional)"
            />
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
                <StyledInputLabel theme={theme} id="status-appointment-label">
                  Status
                </StyledInputLabel>
                <StyledSelectButton
                  theme={theme}
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
                theme={theme}
                sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white, width: '50%' }}
              >
                Join Virtual Appointment
              </InternalButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <InternalButton theme={theme}>Cancel</InternalButton>
              <InternalButton
                theme={theme}
                sx={{ backgroundColor: theme.palette.dark[100], color: theme.palette.common.white }}
              >
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
