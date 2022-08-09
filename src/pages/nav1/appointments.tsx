import React, { useState } from 'react';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import AppointmentsContent from '@components/Appointments/AppointmentsContent';
import AppointmentsHeader from '@components/Appointments/AppointmentsHeader';
import {
  StyledButtonNewCalendar,
  StyledInputLabel,
  StyledSelectButton,
  StyledTodayButton
} from '@components/Appointments/CommonMaterialComponents';
import EditAppointmentsModal from '@components/Appointments/EditAppointmentsModal';
import InfoAppointmentsModal from '@components/Appointments/InfoAppointmentsModal';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Divider, FormControl, MenuItem, Stack, styled, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import cssVariables from 'assets/scss/_themes-vars.module.scss';

const MainHeader = styled(Box)<BoxProps>(() => ({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const Appointments = () => {
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());
  const [openAddAppointments, setOpenAddAppointments] = useState<boolean>(false);
  const [openEditAppointments, setOpenEditAppointments] = useState<boolean>(false);
  const [openInfoAppointments, setOpenInfoAppointments] = useState<boolean>(false);

  const handleOpenAppointmentsModalEdit = () => {
    setOpenEditAppointments(true);
  };
  const handleCloseAppointmentsModalEdit = () => {
    setOpenEditAppointments(false);
  };
  const handleOpenAppointmentsModalAdd = () => {
    setOpenAddAppointments(true);
  };
  const handleCloseAppointmentsModalAdd = () => {
    setOpenAddAppointments(false);
  };
  const handleOpenAppointmentsModalInfo = () => {
    setOpenInfoAppointments(true);
  };
  const handleCloseAppointmentsModalInfo = () => {
    setOpenInfoAppointments(false);
  };

  return (
    <Box>
      <AppointmentsHeader />
      <AppointmentsContent>
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <StyledButtonNewCalendar
            variant="outlined"
            endIcon={<OpenInNewIcon sx={{ color: cssVariables.paperDark }} />}
          >
            <Typography variant="h4" sx={{ marginRight: '10px' }}>
              New Calendar
            </Typography>
          </StyledButtonNewCalendar>
        </header>
        <Divider variant="fullWidth" sx={{ mt: 5 }} />
        <MainHeader>
          <Box sx={{ minWidth: '210px' }}>
            <FormControl fullWidth sx={{ marginLeft: '30px' }}>
              <StyledInputLabel id="resource-label">Resource</StyledInputLabel>
              <StyledSelectButton
                IconComponent={KeyboardArrowDownIcon}
                id="demo-simple-select"
                labelId="resource-label"
                label="Resource"
              >
                <MenuItem value={10}>MenuItem1</MenuItem>
                <MenuItem value={20}>MenuItem2</MenuItem>
                <MenuItem value={30}>MenuItem3</MenuItem>
              </StyledSelectButton>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <StyledTodayButton variant="outlined" onClick={handleOpenAppointmentsModalEdit}>
              Today
            </StyledTodayButton>
            <StyledTodayButton variant="outlined" onClick={handleOpenAppointmentsModalInfo}>
              Information
            </StyledTodayButton>
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
              </Stack>
            </LocalizationProvider>
          </Box>
          <StyledButtonNewCalendar
            variant="outlined"
            endIcon={<AddIcon sx={{ color: cssVariables.paperDark }} />}
            onClick={handleOpenAppointmentsModalAdd}
          >
            <Typography variant="h4" sx={{ marginRight: '10px' }}>
              Add Appointment
            </Typography>
          </StyledButtonNewCalendar>
          {/* //TODO For now they can be here for reviewing the code, Then they will be in the right place */}
          <AddAppointmentsModal
            openAppointmentsModal={openAddAppointments}
            handleCloseAppointmentsModal={handleCloseAppointmentsModalAdd}
          />
          <EditAppointmentsModal
            openAppointmentsModal={openEditAppointments}
            handleCloseAppointmentsModal={handleCloseAppointmentsModalEdit}
          />
        </MainHeader>
        <InfoAppointmentsModal
          openAppointmentsModal={openInfoAppointments}
          handleCloseAppointmentsModal={handleCloseAppointmentsModalInfo}
        />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
