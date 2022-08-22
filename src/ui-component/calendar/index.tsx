/* eslint-disable simple-import-sort/imports */

import React, { useRef, useState } from 'react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import { AppointmentsModalTypes } from 'types/appointments';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import DetailsAppointmentModal from '@components/Appointments/DetailsAppointmentModal';

import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarStyled from './CalendarStyled';
import { SlotTypes } from '../../types/calendar';
import { CreateSlot } from './Slot';

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [openAddAppointmentsModal, setOpenAddAppointmentsModal] = useState<boolean>(false);
  const [bookAppointmentDate, setBookAppointmentDate] = useState<Date | null>(null);
  const [openDetailsAppointmentsModal, setOpenDetailsAppointmentsModal] = useState<boolean>(false);
  const [appointmentSlotId, setAppointmentSlotId] = useState<string>('');

  const onCloseAppointmentsModal = (appointmentModalType: AppointmentsModalTypes) => {
    switch (appointmentModalType) {
      case AppointmentsModalTypes.Add:
        setOpenAddAppointmentsModal(false);
        break;
      case AppointmentsModalTypes.Details:
        setOpenDetailsAppointmentsModal(false);
        break;
      default:
        setOpenAddAppointmentsModal(true);
    }
  };

  const events = [
    CreateSlot(SlotTypes.default, 'start', 'end', 'description', 'Default', 'slot1'),
    CreateSlot(SlotTypes.canceled, 'start', 'end', 'cancel', 'Title', 'slot2'),
    CreateSlot(SlotTypes.blockedOffTime, 'start', 'end', 'cancel', 'Title', 'slot3'),
    CreateSlot(SlotTypes.placeholder, 'start', 'end', 'cancel', 'Title', 'slot4')
  ];

  const onEventClick = (initialEventObject: EventClickArg) => {
    initialEventObject.jsEvent.preventDefault();

    if (initialEventObject.event.title === SlotTypes.default) {
      setOpenDetailsAppointmentsModal(true);
      setAppointmentSlotId(initialEventObject.event.id);
    }
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    if (dateInfo.date) {
      setOpenAddAppointmentsModal(true);
      setBookAppointmentDate(dateInfo.date);
    }
  };

  return (
    <div>
      <CalendarStyled>
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          height="auto"
          dateClick={handleDateClick}
          eventClick={onEventClick}
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
      {openAddAppointmentsModal ? (
        <AddAppointmentsModal
          openAppointmentsModal={openAddAppointmentsModal}
          onCloseAppointmentsModal={() => onCloseAppointmentsModal(AppointmentsModalTypes.Add)}
          setOpenAppointmentsModal={setOpenAddAppointmentsModal}
          bookAppointmentDate={bookAppointmentDate}
        />
      ) : null}
      {openDetailsAppointmentsModal ? (
        <DetailsAppointmentModal
          openAppointmentsModal={openDetailsAppointmentsModal}
          onCloseAppointmentsModal={() => onCloseAppointmentsModal(AppointmentsModalTypes.Details)}
          setOpenAppointmentsModal={setOpenDetailsAppointmentsModal}
          appointmentSlotId={appointmentSlotId}
        />
      ) : null}
    </div>
  );
};

export default Calendar;
