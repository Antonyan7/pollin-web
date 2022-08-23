/* eslint-disable simple-import-sort/imports */

import React, { useEffect, useRef, useState } from 'react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import FullCalendar, { DateRange, DateSelectArg, EventClickArg } from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';

import { AppointmentsModalTypes } from 'types/appointments';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import DetailsAppointmentModal from '@components/Appointments/DetailsAppointmentModal';
import EditAppointmentsModal from '@components/Appointments/EditAppointmentsModal';
import { addMinutesToTheTime } from '@utils/dateUtils';
import CalendarStyled from './CalendarStyled';
import { dispatch, useAppSelector } from '../../redux/hooks';
import { CreateSlot } from './Slot';
import { bookingMiddleware, bookingSelector } from '../../redux/slices/booking';
import { IAppointment, ICalendarSlot } from '../../types/reduxTypes/booking';
import { StyledDisabledLayer } from './StyledDisabledLayer';

const Calendar = (props: { calendarDate: string }) => {
  const { calendarDate } = props;
  const calendarRef = useRef<FullCalendar>(null);
  const [openAddAppointmentsModal, setOpenAddAppointmentsModal] = useState<boolean>(false);
  const [bookAppointmentDate, setBookAppointmentDate] = useState<DateRange | null>(null);
  const [openDetailsAppointmentsModal, setOpenDetailsAppointmentsModal] = useState<boolean>(false);
  const [openEditAppointmentsModal, setOpenEditAppointmentsModal] = useState<boolean>(false);
  const [appointmentSlotId, setAppointmentSlotId] = useState<string>('');
  const [slots, setSlots] = useState<ICalendarSlot[]>([]);
  const serviceProviderId = useAppSelector(bookingSelector.serviceProviderId);
  const appointments = useAppSelector(bookingSelector.appointmentsList);

  const onCloseAppointmentsModal = (appointmentModalType: AppointmentsModalTypes) => {
    switch (appointmentModalType) {
      case AppointmentsModalTypes.Add:
        setOpenAddAppointmentsModal(false);
        break;
      case AppointmentsModalTypes.Details:
        setOpenDetailsAppointmentsModal(false);
        break;
      case AppointmentsModalTypes.Edit:
        setOpenEditAppointmentsModal(false);
        break;
      default:
        setOpenAddAppointmentsModal(true);
    }
  };

  const onEventClick = (initialEventObject: EventClickArg) => {
    initialEventObject.jsEvent.preventDefault();

    if (new Date(initialEventObject.event.startStr).getTime() < new Date().setHours(0, 0, 0, 0)) {
      setOpenDetailsAppointmentsModal(true);
    } else {
      setOpenEditAppointmentsModal(true);
    }

    setAppointmentSlotId(initialEventObject.event.id);
  };

  const onRangeSelect = (arg: DateSelectArg) => {
    setBookAppointmentDate({
      start: arg.start,
      end: arg.end
    });
    setOpenAddAppointmentsModal(true);
  };

  useEffect(() => {
    dispatch(bookingMiddleware.getServiceProviders());
  }, []);

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
  }, [calendarDate, serviceProviderId]);

  useEffect(() => {
    const calendarEvents = appointments?.map((item: IAppointment) =>
      CreateSlot(
        item.type,
        item.startTime,
        addMinutesToTheTime(item.startTime, 10).toISOString(),
        item.description,
        item.title,
        item.id
      )
    );

    setSlots(calendarEvents as ICalendarSlot[]);
  }, [appointments]);

  return (
    <div style={{ position: 'relative' }}>
      <CalendarStyled>
        {serviceProviderId === '' ? (
          <StyledDisabledLayer>
            <text>
              Select a resource to view, book or modify <br /> appointments
            </text>
          </StyledDisabledLayer>
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
      <EditAppointmentsModal
        openAppointmentsModal={openEditAppointmentsModal}
        onCloseAppointmentsModal={() => onCloseAppointmentsModal(AppointmentsModalTypes.Edit)}
        setOpenAppointmentsModal={setOpenEditAppointmentsModal}
        appointmentSlotId={appointmentSlotId}
      />
      <AddAppointmentsModal
        openAppointmentsModal={openAddAppointmentsModal}
        onCloseAppointmentsModal={() => onCloseAppointmentsModal(AppointmentsModalTypes.Add)}
        setOpenAppointmentsModal={setOpenAddAppointmentsModal}
        bookAppointmentDate={bookAppointmentDate}
      />
      <DetailsAppointmentModal
        openAppointmentsModal={openDetailsAppointmentsModal}
        onCloseAppointmentsModal={() => onCloseAppointmentsModal(AppointmentsModalTypes.Details)}
        setOpenAppointmentsModal={setOpenDetailsAppointmentsModal}
        appointmentSlotId={appointmentSlotId}
      />
    </div>
  );
};

export default Calendar;
