import React, { useCallback, useMemo, useState } from 'react';
import AppointmentsContent from '@components/Appointments/AppointmentsContent';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ModalName } from 'constants/modals';
import { format } from 'date-fns';
import { viewsMiddleware } from 'redux/slices/views';
import Calendar from 'ui-component/calendar';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';

export const MainHeader = styled(Box)<BoxProps>(() => ({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const Appointments = () => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const theme = useTheme();

  const isToday = useMemo(
    () => new Date(calendarDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [calendarDate]
  );

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.setModalState({ name: ModalName.AddAppointmentsModal, props: {} }));
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

  const onNewCalendarClick = useCallback(() => {
    window.open(window.location.href, '_blank');
  }, []);

  const onTodayClick = useCallback(() => {
    dispatch(bookingMiddleware.setDateValue(format(new Date(), 'yyyy-MM-dd')));
  }, []);

  return (
    <Box>
      <MainBreadcrumb
        currentPage="Appointments"
        navigation={{
          basePath: '/',
          items: [{ name: 'Appointments', path: '/booking/appointments' }]
        }}
      />
      <AppointmentsContent>
        <header
          style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <StyledButtonNew theme={theme} variant="outlined" endIcon={<OpenInNewIcon />} onClick={onNewCalendarClick}>
            <Typography variant="h4" sx={{ marginRight: '10px' }}>
              New Calendar
            </Typography>
          </StyledButtonNew>
        </header>
        <Divider variant="fullWidth" sx={{ marginTop: '17px', marginLeft: '-28px', marginRight: '-24px' }} />
        <MainHeader>
          <Box sx={{ minWidth: '210px' }}>
            <FormControl fullWidth>
              <InputLabel id="resource-label">Resource</InputLabel>
              <Select
                IconComponent={KeyboardArrowDownIcon}
                id="demo-simple-select"
                labelId="resource-label"
                label="Resource"
                onChange={onServiceProviderChange}
                value={serviceProviderId}
              >
                {serviceProviders.map((serviceProvider) => (
                  <MenuItem key={`resource-${serviceProvider.id}`} value={serviceProvider.id}>
                    {serviceProvider.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '40px' }}>
            <StyledButtonNew variant="outlined" onClick={onTodayClick} disabled={isToday}>
              <Typography variant="h4">Today</Typography>
            </StyledButtonNew>
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
                    OpenPickerIcon: CalendarIcon
                  }}
                  renderInput={(params) => (
                    <TextField sx={{ width: '290px' }} {...params} onClick={() => setDatePickerOpen(true)} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <StyledButtonNew theme={theme} variant="outlined" endIcon={<AddIcon />} onClick={onOpenAppointmentsModalAdd}>
            <Typography variant="h4" sx={{ marginRight: '10px' }}>
              New Appointment
            </Typography>
          </StyledButtonNew>
        </MainHeader>
        <Calendar calendarDate={calendarDate} />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
