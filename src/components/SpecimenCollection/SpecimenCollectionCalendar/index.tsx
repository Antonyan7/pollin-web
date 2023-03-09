import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { Translation } from 'constants/translations';
import { useRouter } from 'next/router';
import { AppointmentStatus } from 'types/reduxTypes/bookingStateTypes';

import { CalendarLoading } from '@ui-component/calendar/CalendarLoading';
import FullCalendarWrapper from '@ui-component/calendar/FullCalendarWrapper';
import { StyledDisabledLayer } from '@ui-component/calendar/StyledDisabledLayer';
import { calculateEndTime } from '@utils/dateUtils';

import { ISpecimenCollectionSlot } from './SpecimenCollectionCalendarTypes';
import SpecimenCollectionFullCalendarContainer from './SpecimenCollectionFullCalendarContainer';

const SpecimenCollectionCalendar = () => {
  const [t] = useTranslation();
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [slots, setSlots] = useState<ISpecimenCollectionSlot[]>([]);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const serviceProviderId = useAppSelector(bookingSelector.specimenServiceProviderId);
  const specimenAppointments = useAppSelector(bookingSelector.specimenAppointmentsList);
  const selectedSpecimenAppointmentsFilters = useAppSelector(bookingSelector.selectedSpecimenAppointmentsFilters);
  const isCalendarLoading = useAppSelector(bookingSelector.isCalendarLoading);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.date) {
        dispatch(bookingMiddleware.setDateValue(router.query?.date as string));
      }

      if (router.query.resource) {
        dispatch(bookingMiddleware.applyResource(router.query?.resource as string, true));
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

    router.push({
      query: {
        ...(serviceProviderId
          ? {
              resource: serviceProviderId
            }
          : {}),
        ...(calendarDate ? { date: calendarDate } : {})
      }
    });

    // We are disabling this since linter is asking for router include in deps, but it shouldn't
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDate, serviceProviderId]);

  useEffect(() => {
    if (serviceProviderId) {
      dispatch(
        bookingMiddleware.getSpecimenAppointments(
          serviceProviderId,
          calendarDate,
          selectedSpecimenAppointmentsFilters.map(({ id }) => ({ id }))
        )
      );
    } else {
      dispatch(bookingMiddleware.clearSpecimenAppointments());
    }

    if (calendarDate) {
      const calendarEl = calendarRef.current;

      if (calendarEl) {
        const calendarApi = calendarEl.getApi();

        calendarApi.gotoDate(calendarDate);
      }
    }
  }, [calendarDate, selectedSpecimenAppointmentsFilters, serviceProviderId]);

  useEffect(() => {
    const calendarEvents: ISpecimenCollectionSlot[] = specimenAppointments.map(
      ({ startTime, timeUnits, id, color, title, status, isEditable }) => {
        const classNames =
          !isEditable || status === AppointmentStatus.Done ? ['specimen-slot', 'fc-non-clickable'] : ['specimen-slot'];

        return {
          allDay: false,
          classNames,
          start: startTime,
          end: calculateEndTime(startTime, timeUnits),
          title,
          id,
          color: color ?? 'transparent',
          textColor: 'black',
          ...(!color ? { borderColor: 'black' } : {})
        };
      }
    );

    setSlots(calendarEvents);
  }, [specimenAppointments]);

  return (
    <div style={{ position: 'relative' }}>
      {isCalendarLoading && <CalendarLoading />}
      <FullCalendarWrapper>
        {serviceProviderId === '' && (
          <StyledDisabledLayer>{t(Translation.PAGE_SPECIMEN_COLLECTION_CALENDAR_TITLE_DISABLED)}</StyledDisabledLayer>
        )}
        <SpecimenCollectionFullCalendarContainer slots={slots} calendarRef={calendarRef} calendarDate={calendarDate} />
      </FullCalendarWrapper>
    </div>
  );
};

export default SpecimenCollectionCalendar;
