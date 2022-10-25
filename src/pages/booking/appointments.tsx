import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentsContent from '@components/Appointments/AppointmentsContent';
import { StyledButtonNew } from '@components/Appointments/CommonMaterialComponents';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Divider, MenuItem, SelectChangeEvent, Stack, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { borderRadius, borders, margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import CalendarIcon from '@assets/images/calendar/icons/CalendarIcon';
import AppointmentsHeader from '@ui-component/appointments/AppointmentsHeader';
import { BaseSelectWithLoading } from '@ui-component/BaseDropdownWithLoading';
import { futureDate180DaysAfter, neutralDateTime } from '@utils/dateUtils';

const DynamicCalendar = dynamic(() => import('ui-component/calendar'));

export const MainHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}));

const formControlStyle = { minWidth: '210px', marginTop: margins.top32, marginRight: margins.right12 };
const dateFormControlStyle = {
  display: 'flex',
  gap: margins.all16,
  flexWrap: 'wrap',
  marginTop: margins.top32,
  marginRight: margins.right12
};

// eslint-disable-next-line max-lines-per-function
const Appointments = () => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const serviceProviders = useAppSelector(bookingSelector.serviceProvidersList);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const isServiceProvidersLoading = useAppSelector(bookingSelector.isServiceProvidersLoading);
  const theme = useTheme();
  const [t] = useTranslation();
  const serviceProviderSelectRef = useRef(null);
  const [serviceProviderCurrentPage, setServiceProviderCurrentPage] = useState<number>(2);
  const isToday = useMemo(
    () => new Date(calendarDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
    [calendarDate]
  );
  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddAppointmentModal, props: {} }));
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
  const onTodayClick = useCallback(() => {
    dispatch(bookingMiddleware.setDateValue(format(new Date(), 'yyyy-MM-dd')));
  }, []);
  const onServiceProviderScroll = (event: UIEvent) => {
    const eventTarget = event.target as HTMLDivElement;

    if (eventTarget.scrollHeight - Math.round(eventTarget.scrollTop) === eventTarget.clientHeight) {
      if (serviceProviders.pageSize * serviceProviderCurrentPage <= serviceProviders.totalItems) {
        setServiceProviderCurrentPage(serviceProviderCurrentPage + 1);
        dispatch(bookingMiddleware.getNewServiceProviders(serviceProviderCurrentPage));
      }
    }
  };

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
        <AppointmentsHeader />
        <Divider
          variant="fullWidth"
          sx={{ marginTop: margins.top24, marginLeft: margins.left4, marginRight: margins.right4 }}
        />
        <MainHeader>
          <Box sx={formControlStyle}>
            <BaseSelectWithLoading
              isLoading={isServiceProvidersLoading}
              MenuProps={{
                style: { maxHeight: 260 },
                PaperProps: {
                  style: {
                    border: `${borders.solid2px} ${theme.palette.primary.main}`,
                    borderRadius: borderRadius.radius12
                  },
                  onScroll: (event) => onServiceProviderScroll(event as unknown as UIEvent)
                }
              }}
              ref={serviceProviderSelectRef}
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
            </BaseSelectWithLoading>
          </Box>
          <Box sx={dateFormControlStyle}>
            <StyledButtonNew variant="outlined" onClick={onTodayClick} disabled={isToday}>
              <Typography sx={{ color: theme.palette.primary.main }} variant="h4">
                {t(Translation.PAGE_APPOINTMENTS_BUTTON_TODAY)}
              </Typography>
            </StyledButtonNew>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  disableMaskedInput
                  maxDate={futureDate180DaysAfter} // Don't allow to select days for future more than 180 days
                  open={datePickerOpen}
                  onOpen={onDateDatePickerOpen}
                  onClose={onDateDatePickerClose}
                  label={t(Translation.PAGE_APPOINTMENTS_DESKTOP_DATE_PICKER)}
                  inputFormat="MMM dd, yyyy"
                  value={new Date(`${calendarDate}${neutralDateTime}`)}
                  onChange={(date: Date | null) => onDateChange(date)}
                  components={{
                    OpenPickerIcon: CalendarIcon
                  }}
                  renderInput={(params) => (
                    <TextField
                      disabled
                      sx={{ width: '320px' }}
                      {...params}
                      onClick={() => setDatePickerOpen(true)}
                      onKeyDown={(event) => {
                        event.preventDefault();
                      }}
                    />
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
            sx={{ marginTop: margins.top32 }}
            onClick={onOpenAppointmentsModalAdd}
          >
            <Typography
              variant="h4"
              sx={{
                marginRight: margins.right12,
                color: !serviceProviderId ? theme.palette.grey[300] : theme.palette.primary.main
              }}
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
