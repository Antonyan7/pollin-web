import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AppointmentsContent from '@components/common/AppointmentsContent';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import getDesktopDatePickerDefaultProps from '@components/DefaultDesktopDatePicker/defaultProps';
import { CalendarTodayTwoTone } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, outlinedInputClasses, Stack, styled, TextField, Typography, useTheme } from '@mui/material';
import { BoxProps } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import useAppointmentStatusState from '@hooks/useAppointmentStatusState';
import AppointmentsHeader from '@ui-component/appointments/AppointmentsHeader';
import ResourceDropdown from '@ui-component/dropdown/ResourceDropdown';
import { futureDate180DaysAfter, getCurrentDate, getDate, neutralDateTime } from '@utils/dateUtils';

const DynamicCalendar = dynamic(() => import('ui-component/calendar'));

export const MainHeader = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}));

const CalendarPopupIcon = styled(CalendarTodayTwoTone)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const formControlStyle = { minWidth: '210px', marginTop: margins.top32, marginRight: margins.right12 };
const dateFormControlStyle = {
  display: 'flex',
  gap: margins.all16,
  flexWrap: 'wrap',
  marginTop: margins.top32,
  marginRight: margins.right12
};

const Appointments = () => {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const groupedServiceProvidersList = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  const theme = useTheme();
  const [t] = useTranslation();

  const currentDay = getCurrentDate();
  const isToday = getDate(calendarDate) === getDate(currentDay);
  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(viewsMiddleware.openModal({ name: ModalName.AddResourceAppointmentModal, props: {} }));
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
  const onTodayClick = useCallback(() => {
    dispatch(bookingMiddleware.setDateValue(getDate(getCurrentDate())));
  }, []);

  useAppointmentStatusState();

  return (
    <Box>
      <MainBreadcrumb
        data-cy={CypressIds.PAGE_APPOINTMENTS_TITLE}
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
            <ResourceDropdown
              groupedServiceProvidersList={groupedServiceProvidersList}
              serviceProviderId={serviceProviderId}
              isGroupedServiceProvidersLoading={isGroupedServiceProvidersLoading}
              dataCy={CypressIds.PAGE_APPOINTMENTS_SELECT_RESOURCE}
              label={t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE)}
            />
          </Box>
          <Box sx={dateFormControlStyle}>
            <StyledButtonNew
              variant="outlined"
              onClick={onTodayClick}
              disabled={isToday}
              data-cy={CypressIds.PAGE_APPOINTMENTS_BUTTON_TODAY}
            >
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
                    OpenPickerIcon: CalendarPopupIcon
                  }}
                  // TODO: Make DesktopDatePicker one component with all updated styles.
                  {...getDesktopDatePickerDefaultProps(theme)}
                  showToolbar={false}
                  renderInput={(params) => (
                    <TextField
                      disabled
                      data-cy={CypressIds.PAGE_APPOINTMENTS_DESKTOP_DATE_PICKER}
                      sx={{
                        width: 300,
                        [`.${outlinedInputClasses.notchedOutline}`]: {
                          borderWidth: `1px !important`
                        }
                      }}
                      {...params}
                      focused={datePickerOpen}
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
            data-cy={CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT}
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
