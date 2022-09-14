/* eslint-disable simple-import-sort/imports */

import React, { useCallback, useEffect, useRef, useState } from 'react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import FullCalendar, { DateSelectArg, EventClickArg } from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';

import { addMinutesToTime } from '@utils/dateUtils';
import { useRouter } from 'next/router';
import { viewsMiddleware } from 'redux/slices/views';
import { ModalName } from 'constants/modals';
import { SlotTypes } from 'types/calendar';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import CalendarStyled from './CalendarStyled';
import { dispatch, useAppSelector } from '../../redux/hooks';
import { CreateSlot } from './Slot';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';
import { IAppointment, ICalendarSlot } from '../../types/reduxTypes/booking';
import { StyledDisabledLayer } from './StyledDisabledLayer';

// TODO update component to contain 150 lines
// eslint-disable-next-line max-lines-per-function
const Calendar = (props: { calendarDate: string }) => {
  const { calendarDate } = props;
  const calendarRef = useRef<FullCalendar>(null);
  const [slots, setSlots] = useState<ICalendarSlot[]>([]);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const appointments = useAppSelector(bookingSelector.appointmentsList);
  const isCalendarLoading = useAppSelector(bookingSelector.isCalendarLoading);
  const router = useRouter();
  const [t] = useTranslation();
  const loadingSx = {
    display: 'grid',
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 300
  };
  const onEventClick = useCallback(
    (initialEventObject: EventClickArg) => {
      initialEventObject.jsEvent.preventDefault();

      const { id } = initialEventObject.event;
      const targetAppointment = appointments.find((appointment) => appointment.id === id);

      const nonIntractableAppointments = [SlotTypes.block, SlotTypes.schedule];

      if (nonIntractableAppointments.includes(targetAppointment?.type as SlotTypes)) {
        return;
      }

      if (new Date(initialEventObject.event.startStr).getTime() < new Date().setHours(0, 0, 0, 0)) {
        dispatch(
          viewsMiddleware.setModalState({ name: ModalName.DetailsAppointmentModal, props: { appointmentId: id } })
        );
      } else {
        dispatch(viewsMiddleware.setModalState({ name: ModalName.EditAppointmentModal, props: { appointmentId: id } }));
      }
    },
    [appointments]
  );

  const onRangeSelect = (arg: DateSelectArg) => {
    if (new Date(arg.start).getTime() < new Date().setHours(0, 0, 0, 0)) {
      return;
    }

    dispatch(
      viewsMiddleware.setModalState({
        name: ModalName.AddAppointmentsModal,
        props: {
          start: arg.start,
          end: arg.end
        }
      })
    );
  };

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders());
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
        addMinutesToTime(item.startTime, item.timeUnits * 10).toISOString(),
        item.description,
        item.title,
        item.id
      )
    );

    setSlots(calendarEvents);
  }, [appointments]);

  return (
    <div style={{ position: 'relative' }}>
      {isCalendarLoading && (
        <Box sx={loadingSx}>
          <CircularProgress sx={{ margin: 'auto' }} size={70} />
          <span style={{ marginTop: '20px' }}>{t(Translation.PAGE_APPOINTMENTS_LOADING)}</span>
        </Box>
      )}
      <CalendarStyled>
        {serviceProviderId === '' ? (
          <StyledDisabledLayer>{t(Translation.PAGE_APPOINTMENTS_CALENDAR_TITLE_DISABLED)}</StyledDisabledLayer>
        ) : null}
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={slots}
          ref={calendarRef}
          rerenderDelay={10}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          height="auto"
          select={onRangeSelect}
          eventClick={onEventClick}
          initialDate={calendarDate}
          initialView="timeGridDay"
          displayEventTime={false}
          slotLabelFormat={[{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }]}
          allDaySlot={false}
          slotMinTime="07:00:00"
          slotMaxTime="18:10:00"
          slotDuration="00:10"
          slotLabelInterval="00:10"
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>
    </div>
  );
};

export default Calendar;
