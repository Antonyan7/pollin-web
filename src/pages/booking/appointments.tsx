import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedServiceProvidersOption } from '@axios/booking/managerBookingTypes';
import MainBreadcrumb from '@components/Breadcrumb/MainBreadcrumb';
import AppointmentsContent from '@components/common/AppointmentsContent';
import { StyledButtonNew } from '@components/common/MaterialComponents';
import { AddAppointmentSources } from '@components/Modals/Booking/AddAppointmentModal/types';
import { DateSelectArg } from '@fullcalendar/common';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, styled, Typography, useTheme } from '@mui/material';
import { BoxProps } from '@mui/system';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { dispatch, useAppSelector } from 'redux/hooks';
import { bookingMiddleware, bookingSelector } from 'redux/slices/booking';
import { viewsMiddleware } from 'redux/slices/views';
import { margins } from 'themes/themeConstants';
import { ModalName } from 'types/modals';

import AppointmentsHeader from '@ui-component/appointments/AppointmentsHeader';
import useOnCalendarEventClick from '@ui-component/calendar/hooks/useOnCalenderEventClick';
import ResourceDropdown from '@ui-component/dropdown/ResourceDropdown';
import PollinDatePickerWithTodayButton from '@ui-component/shared/DatePicker/PollinDatePickerWithTodayButton';
import { DateUtil } from '@utils/date/DateUtil';

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

const useOnRangeSelect = (serviceProviderId: string) =>
  useCallback(
    (arg: DateSelectArg) => {
      const isRangeStartEarlierThanToday = new Date(arg.start).getTime() < new Date().setHours(0, 0, 0, 0);

      if (isRangeStartEarlierThanToday) {
        return;
      }

      dispatch(
        viewsMiddleware.openModal({
          name: ModalName.AddAppointmentModal,
          props: {
            start: arg.startStr,
            source: AddAppointmentSources.Booking,
            providerId: serviceProviderId
          }
        })
      );
    },
    [serviceProviderId]
  );

const Appointments = () => {
  const shouldUpdateAppointments = useAppSelector(bookingSelector.shouldUpdateBookingCalendarAppointments);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const isLoading = useAppSelector(bookingSelector.isBookingCalendarLoading);
  const groupedServiceProvidersList = useAppSelector(bookingSelector.groupedServiceProvidersList);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const isGroupedServiceProvidersLoading = useAppSelector(bookingSelector.isGroupedServiceProvidersLoading);
  const appointments = useAppSelector(bookingSelector.appointmentsList);
  const theme = useTheme();
  const [t] = useTranslation();
  const router = useRouter();

  const onCalendarEventClick = useOnCalendarEventClick();
  const calendarDisabledStateTitle = t(Translation.PAGE_APPOINTMENTS_CALENDAR_TITLE_DISABLED);

  const onOpenAppointmentsModalAdd = useCallback(() => {
    dispatch(
      viewsMiddleware.openModal({
        name: ModalName.AddAppointmentModal,
        props: {
          providerId: serviceProviderId,
          source: AddAppointmentSources.Booking
        }
      })
    );
  }, [serviceProviderId]);

  const onDateChange = useCallback((date?: Date | null) => {
    if (date) {
      dispatch(bookingMiddleware.setDateValue(date));
    }
  }, []);

  const onServiceProviderChange = useCallback((providerOption?: GroupedServiceProvidersOption) => {
    dispatch(bookingMiddleware.updateBookingResourceId(providerOption?.id ?? ''));
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.date) {
        dispatch(bookingMiddleware.setDateValue(new Date(router.query?.date as string)));
      }

      if (router.query.resource) {
        dispatch(bookingMiddleware.updateBookingResourceId(router.query?.resource as string));
      }
    }

    // We are disabling this since linter is asking for router props date and resource include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(bookingMiddleware.getBookingAppointments(serviceProviderId, calendarDate));
    } else {
      dispatch(bookingMiddleware.clearBookingCalendarAppointments());
    }

    router.push({
      query: {
        ...(serviceProviderId
          ? {
              resource: serviceProviderId
            }
          : {}),
        ...(calendarDate ? { date: DateUtil.convertToDateOnly(calendarDate) } : {})
      }
    });

    // We are disabling this since linter is asking for router include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDate, serviceProviderId]);

  useEffect(() => {
    if (shouldUpdateAppointments) {
      if (serviceProviderId) {
        dispatch(bookingMiddleware.getBookingAppointments(serviceProviderId, calendarDate));
      } else {
        dispatch(bookingMiddleware.clearBookingCalendarAppointments());
      }

      dispatch(bookingMiddleware.setShouldUpdateBookingCalendarAppointments(false));
    }
  }, [shouldUpdateAppointments, calendarDate, serviceProviderId]);

  const onRangeSelect = useOnRangeSelect(serviceProviderId);

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
              isLoading={isGroupedServiceProvidersLoading}
              dataCy={CypressIds.PAGE_APPOINTMENTS_SELECT_RESOURCE}
              label={t(Translation.PAGE_APPOINTMENTS_SELECT_RESOURCE)}
              onChange={onServiceProviderChange}
              isSpecimenCollection={false}
            />
          </Box>
          <Box sx={dateFormControlStyle}>
            <PollinDatePickerWithTodayButton calendarDate={calendarDate} onChange={onDateChange} />
          </Box>
          <StyledButtonNew
            disabled={!serviceProviderId}
            data-cy={CypressIds.PAGE_APPOINTMENTS_BUTTON_NEW_APPOINTMENT}
            theme={theme}
            variant="contained"
            endIcon={<AddIcon />}
            sx={{ marginTop: margins.top32 }}
            onClick={onOpenAppointmentsModalAdd}
          >
            <Typography
              variant="subtitle1"
              sx={{
                marginRight: margins.right12,
                color: theme.palette.common.white
              }}
            >
              {t(Translation.PAGE_APPOINTMENTS_BUTTON_BOOK_APPOINTMENT)}
            </Typography>
          </StyledButtonNew>
        </MainHeader>
        <DynamicCalendar
          calendarDate={calendarDate}
          onEventClick={onCalendarEventClick}
          onRangeSelect={onRangeSelect}
          disable={{ title: calendarDisabledStateTitle, state: !serviceProviderId }}
          appointments={{ list: appointments, isLoading }}
        />
      </AppointmentsContent>
    </Box>
  );
};

export default Appointments;
