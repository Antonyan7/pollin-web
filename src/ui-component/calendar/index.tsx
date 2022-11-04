/* eslint-disable simple-import-sort/imports */
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { calculateEndTime } from '@utils/dateUtils';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';
import { dispatch, useAppSelector } from 'redux/hooks';
import { IAppointment, ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';
import { CreateSlot } from './Slot';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';
import { StyledDisabledLayer } from './StyledDisabledLayer';
import FullCalendarContainer from './FullCalendarContainer';
import FullCalendarWrapper from './FullCalendarWrapper';
import { CalendarLoading } from './CalendarLoading';

interface CalendarProps {
  calendarDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ calendarDate }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [slots, setSlots] = useState<ICalendarSlot[]>([]);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const appointments = useAppSelector(bookingSelector.appointmentsList);
  const isCalendarLoading = useAppSelector(bookingSelector.isCalendarLoading);
  const router = useRouter();
  const [t] = useTranslation();

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.date) {
        dispatch(bookingMiddleware.setDateValue(router.query?.date as string));
      }

      if (router.query.resource) {
        dispatch(bookingMiddleware.applyResource(router.query?.resource as string));
      }
    }

    // We are disabling this since linter is asking for router props date and resource include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(bookingMiddleware.getAppointments(serviceProviderId, calendarDate));
    }

    if (calendarDate) {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.gotoDate(calendarDate);
      }
    }

    if (calendarDate && serviceProviderId) {
      const updateQueryParams = () => {
        router.push({
          query: { resource: serviceProviderId, date: calendarDate }
        });
      };

      updateQueryParams();
    }

    // We are disabling this since linter is asking for router include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDate, serviceProviderId]);

  useEffect(() => {
    const calendarEvents = appointments?.map((item: IAppointment) =>
      CreateSlot(
        item.type,
        item.startTime,
        calculateEndTime(item.startTime, item.timeUnits),
        item.title,
        item.id,
        item.color
      )
    );

    setSlots(calendarEvents);
  }, [appointments]);

  return (
    <div style={{ position: 'relative' }}>
      {isCalendarLoading && <CalendarLoading />}
      <FullCalendarWrapper>
        {serviceProviderId === '' && (
          <StyledDisabledLayer>{t(Translation.PAGE_APPOINTMENTS_CALENDAR_TITLE_DISABLED)}</StyledDisabledLayer>
        )}
        <FullCalendarContainer slots={slots} calendarDate={calendarDate} calendarRef={calendarRef} />
      </FullCalendarWrapper>
    </div>
  );
};

export default Calendar;
