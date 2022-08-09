import React, { useState } from 'react';
import {
  InternalButton,
  StyledInputLabel,
  StyledPatientButton,
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

import { AppointmentsModalProps } from '@types';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const AddAppointmentsModal = ({ openAppointmentsModal, handleCloseAppointmentsModal }: AppointmentsModalProps) => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Dialog open={openAppointmentsModal} onClose={handleCloseAppointmentsModal}>
      {openAppointmentsModal && (
        <Box sx={{ maxWidth: '500px', width: '800px' }}>
          <DialogTitle>Add Appointment</DialogTitle>
          <Divider />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormControl fullWidth>
              <StyledInputLabel id="add-appointment-label">Appointment type</StyledInputLabel>
              <StyledSelectButton
                IconComponent={KeyboardArrowDownIcon}
                id="add-appointment-label"
                labelId="add-appointment-label"
                label="Appointment type"
              >
                <MenuItem value={10}>MenuItem1</MenuItem>
                <MenuItem value={20}>MenuItem2</MenuItem>
                <MenuItem value={30}>MenuItem3</MenuItem>
              </StyledSelectButton>
            </FormControl>
            <StyledPatientButton fullWidth>Patient</StyledPatientButton>
            <StyledTextareaAutosize maxRows={4} aria-label="maximum height" defaultValue="Description (optional)" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <MobileDateTimePicker
                  label="Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <InternalButton>Cancel</InternalButton>
              <InternalButton sx={{ backgroundColor: cssVariables.hoverBackgroundDark, color: cssVariables.paper }}>
                Add
              </InternalButton>
            </Box>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default AddAppointmentsModal;
