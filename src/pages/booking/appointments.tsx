import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { viewsMiddleware } from 'redux/slices/views';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';

import { dispatch, useAppSelector } from '../../redux/hooks';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';

const DynamicCalendar = dynamic(() => import('ui-component/calendar'));

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
  const [t] = useTranslation();

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
        currentPage={t(Translation.PAGE_APPOINTMENTS_TITLE)}
        navigation={{
          basePath: '/',
          items: [{ name: `${t(Translation.PAGE_APPOINTMENTS_TITLE)}`, path: '/booking/appointments' }]
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
              {t(Translation.PAGE_APPOINTMENTS_BUTTON_NEW_CALENDAR)}
            </Typography>
          </StyledButtonNew>
        </header>
        <Divider variant="fullWidth" sx={{ marginTop: '17px', marginLeft: '-28px', marginRight: '-24px' }} />
        <MainHeader>
          <Box sx={{ minWidth: '210px' }}>
            <FormControl fullWidth>
              <InputLabel id="resource-label">{t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE)}</InputLabel>
              <Select
                IconComponent={KeyboardArrowDownIcon}
                id="demo-simple-select"
                labelId="resource-label"
                label={t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE)}
                onChange={onServiceProviderChange}
                value={serviceProviderId}
              >
                {serviceProviders.providers.map((serviceProvider) => (
                  <MenuItem key={`resource-${serviceProvider.id}`} value={serviceProvider.id}>
                    {serviceProvider.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: '40px' }}>
            <StyledButtonNew variant="outlined" onClick={onTodayClick} disabled={isToday}>
              <Typography variant="h4">{t(Translation.PAGE_APPOINTMENTS_BUTTON_TODAY)}</Typography>
            </StyledButtonNew>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  open={datePickerOpen}
                  onOpen={onDateDatePickerOpen}
                  onClose={onDateDatePickerClose}
                  label={t(Translation.PAGE_APPOINTMENTS_DESKTOP_DATE_PICKER)}
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
          <StyledButtonNew
            disabled={!serviceProviderId}
            theme={theme}
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={onOpenAppointmentsModalAdd}
          >
            <Typography
              variant="h4"
              sx={{ marginRight: '10px', color: !serviceProviderId ? theme.palette.grey[300] : 'initial' }}
            >
              {t(Translation.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT)}
            </Typography>
          </StyledButtonNew>
        </MainHeader>
        <DynamicCalendar calendarDate={calendarDate} />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
