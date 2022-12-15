import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import { dispatch, useAppSelector } from '@redux/hooks';
import { bookingMiddleware, bookingSelector } from '@redux/slices/booking';
import { Translation } from 'constants/translations';
import dayjs from 'dayjs';

import { CalendarLoading } from '@ui-component/calendar/CalendarLoading';
import FullCalendarWrapper from '@ui-component/calendar/FullCalendarWrapper';
import { StyledDisabledLayer } from '@ui-component/calendar/StyledDisabledLayer';

import { ISpecimenCollectionSlot } from './SpecimenCollectionCalendarTypes';
import SpecimenCollectionFullCalendarContainer from './SpecimenCollectionFullCalendarContainer';

const SpecimenCollectionCalendar = () => {
  const [t] = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const [slots, setSlots] = useState<ISpecimenCollectionSlot[]>([]);
  const calendarDate = useAppSelector(bookingSelector.calendarDate);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const specimenAppointments = useAppSelector(bookingSelector.specimenAppointmentsList);
  const selectedSpecimenAppointmentsFilters = useAppSelector(bookingSelector.selectedSpecimenAppointmentsFilters);
  const isCalendarLoading = useAppSelector(bookingSelector.isCalendarLoading);

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders(1));
  }, []);

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
      setSlots([]);
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
    const calendarEvents: ISpecimenCollectionSlot[] = specimenAppointments.map((item) => ({
      allDay: false,
      classNames: ['open-slot'],
      start: item.startTime,
      end: dayjs(item.startTime)
        .add(item.timeUnits * 10, 'minutes')
        .format(),
      startStr: '',
      title: item.title,
      id: item.id,
      color: item.color ?? 'transparent',
      textColor: 'black',
      ...(!item.color ? { borderColor: 'black' } : {})
    }));

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
