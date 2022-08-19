import React, { useCallback, useState } from 'react';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import AppointmentsContent from '@components/Appointments/AppointmentsContent';
import {
  StyledButtonNewCalendar,
  StyledInputLabel,
  StyledSelectButton,
  StyledTodayButton
} from '@components/Appointments/CommonMaterialComponents';
import EditAppointmentsModal from '@components/Appointments/EditAppointmentsModal';
import InfoAppointmentsModal from '@components/Appointments/InfoAppointmentsModal';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Divider, FormControl, MenuItem, Stack, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from 'ui-component/calendar';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';

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
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const theme = useTheme();

  const onOpenAppointmentsModalEdit = useCallback(() => {
    setOpenEditAppointments(true);
  }, []);

  const onCloseAppointmentsModalEdit = useCallback(() => {
    setOpenEditAppointments(false);
  }, []);

  const onOpenAppointmentsModalAdd = useCallback(() => {
    setOpenAddAppointments(true);
  }, []);

  const onCloseAppointmentsModalAdd = useCallback(() => {
    setOpenAddAppointments(false);
  }, []);

  const onCloseAppointmentsModalInfo = useCallback(() => {
    setOpenInfoAppointments(false);
  }, []);

  return (
    <Box>
      <MainBreadcrumb
        currentPage="Appointments"
        navigation={{
          basePath: '/',
          items: [{ name: 'Appointments', path: '/nav1/appointments' }]
        }}
      />
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
        <Divider variant="fullWidth" sx={{ marginTop: '17px', marginLeft: '-28px', marginRight: '-24px' }} />
        <MainHeader>
          <Box sx={{ minWidth: '210px' }}>
            <FormControl fullWidth>
              <StyledInputLabel theme={theme} id="resource-label">
                Resource
              </StyledInputLabel>
              <StyledSelectButton
                sx={{
                  '& div': {
                    backgroundColor: 'white'
                  }
                }}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  open={datePickerOpen}
                  onOpen={() => setDatePickerOpen(true)}
                  onClose={() => setDatePickerOpen(false)}
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={appointmentDate}
                  onChange={(newValue) => {
                    setAppointmentDate(newValue);
                  }}
                  components={{
                    /* TODO: Tigran Have Asked for this TODO, we need to check usage of this in future */
                    OpenPickerIcon: CalendarIcon
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onClick={() => setDatePickerOpen(true)}
                      sx={{
                        width: '290px',
                        '& > div': {
                          padding: 0,
                          backgroundColor: 'white'
                        },
                        '& > div > input': {
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        },
                        '& > div > div > button': {
                          marginRight: '11px'
                        }
                      }}
                    />
                  )}
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
        <Calendar />
        <InfoAppointmentsModal
          openAppointmentsModal={openInfoAppointments}
          onCloseAppointmentsModal={onCloseAppointmentsModalInfo}
          setOpenAppointmentsModal={setOpenInfoAppointments}
        />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
