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
import { Box, Divider, FormControl, MenuItem, Stack, styled, Typography, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Calendar from 'ui-component/calendar';

const MainHeader = styled(Box)<BoxProps>(() => ({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const Appointments = () => {
  const theme = useTheme();
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());
  const [openAddAppointments, setOpenAddAppointments] = useState<boolean>(false);
  const [openEditAppointments, setOpenEditAppointments] = useState<boolean>(false);
  const [openInfoAppointments, setOpenInfoAppointments] = useState<boolean>(false);

  const onOpenAppointmentsModalEdit = () => {
    setOpenEditAppointments(true);
  };
  const onCloseAppointmentsModalEdit = () => {
    setOpenEditAppointments(false);
  };
  const onOpenAppointmentsModalAdd = () => {
    setOpenAddAppointments(true);
  };
  const onCloseAppointmentsModalAdd = () => {
    setOpenAddAppointments(false);
  };
  const onOpenAppointmentsModalInfo = () => {
    setOpenInfoAppointments(true);
  };
  const onCloseAppointmentsModalInfo = () => {
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
            theme={theme}
            variant="outlined"
            endIcon={<OpenInNewIcon sx={{ color: theme.palette.common.black }} />}
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
              <StyledInputLabel theme={theme} id="resource-label">
                Resource
              </StyledInputLabel>
              <StyledSelectButton
                theme={theme}
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
            <StyledTodayButton theme={theme} variant="outlined" onClick={onOpenAppointmentsModalEdit}>
              Today
            </StyledTodayButton>
            <StyledTodayButton theme={theme} variant="outlined" onClick={onOpenAppointmentsModalInfo}>
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
            theme={theme}
            variant="outlined"
            endIcon={<AddIcon sx={{ color: theme.palette.common.black }} />}
            onClick={onOpenAppointmentsModalAdd}
          >
            <Typography variant="h4" sx={{ marginRight: '10px' }}>
              New Appointment
            </Typography>
          </StyledButtonNewCalendar>
          {/* //TODO For now they can be here for reviewing the code, Then they will be in the right place */}
          <AddAppointmentsModal
            openAppointmentsModal={openAddAppointments}
            onCloseAppointmentsModal={onCloseAppointmentsModalAdd}
            setOpenAppointmentsModal={setOpenAddAppointments}
          />
          <EditAppointmentsModal
            openAppointmentsModal={openEditAppointments}
            onCloseAppointmentsModal={onCloseAppointmentsModalEdit}
            setOpenAppointmentsModal={setOpenEditAppointments}
          />
        </MainHeader>
        <InfoAppointmentsModal
          openAppointmentsModal={openInfoAppointments}
          onCloseAppointmentsModal={onCloseAppointmentsModalInfo}
          setOpenAppointmentsModal={setOpenInfoAppointments}
        />
        <Calendar />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
