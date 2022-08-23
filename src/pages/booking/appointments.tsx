import React, { useCallback, useState } from 'react';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import AppointmentsContent from '@components/Appointments/AppointmentsContent';
import {
  StyledButtonNewCalendar,
  StyledInputLabel,
  StyledSelectButton,
  StyledTodayButton
} from '@components/Appointments/CommonMaterialComponents';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Divider, FormControl, MenuItem, SelectChangeEvent, Stack, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import Calendar from 'ui-component/calendar';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';

const MainHeader = styled(Box)<BoxProps>(() => ({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: '290px',
  '& > div': {
    padding: 0,
    backgroundColor: theme.palette.common.white
  },
  '& > div > input': {
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer'
  },
  '& > div > div > button': {
    marginRight: '11px'
  }
}));

const Appointments = () => {
  const [openAddAppointments, setOpenAddAppointments] = useState<boolean>(false);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const theme = useTheme();

  const onOpenAppointmentsModalAdd = useCallback(() => {
    setOpenAddAppointments(true);
  }, []);

  const onCloseAppointmentsModalAdd = useCallback(() => {
    setOpenAddAppointments(false);
  }, []);

  const onDateDatePickerOpen = useCallback(() => {
    setDatePickerOpen(true);
  }, []);

  const onDateDatePickerClose = useCallback(() => {
    setDatePickerOpen(false);
  }, []);

  const onDateChange = useCallback((date: Date | null) => {
    if (date) {
      dispatch(bookingMiddleware.setDateValue(format(date, 'yyyy-MM-dd')));
    }
  }, []);

  const onServiceProviderChange = useCallback((event: SelectChangeEvent<unknown>) => {
    dispatch(bookingMiddleware.applyResource(event.target ? `${event.target.value}` : ''));
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
                onChange={onServiceProviderChange}
              >
                {serviceProviders.map((serviceProvider) => (
                  <MenuItem key={`resource-${serviceProvider.id}`} value={serviceProvider.id}>
                    {serviceProvider.title}
                  </MenuItem>
                ))}
              </StyledSelectButton>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <StyledTodayButton theme={theme} variant="outlined">
              Today
            </StyledTodayButton>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  open={datePickerOpen}
                  onOpen={onDateDatePickerOpen}
                  onClose={onDateDatePickerClose}
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={calendarDate}
                  onChange={(date: Date | null) => onDateChange(date)}
                  components={{
                    /* TODO: Tigran Have Asked for this TODO, we need to check usage of this in future */
                    OpenPickerIcon: CalendarIcon
                  }}
                  renderInput={(params) => (
                    <StyledTextField theme={theme} {...params} onClick={() => setDatePickerOpen(true)} />
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
          <AddAppointmentsModal
            openAppointmentsModal={openAddAppointments}
            onCloseAppointmentsModal={onCloseAppointmentsModalAdd}
            setOpenAppointmentsModal={setOpenAddAppointments}
          />
        </MainHeader>
        <Calendar calendarDate={calendarDate} />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
