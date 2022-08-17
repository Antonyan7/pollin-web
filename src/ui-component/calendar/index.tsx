/* eslint-disable simple-import-sort/imports */

import React, { useRef, useState } from 'react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Theme, useMediaQuery } from '@mui/material';
import { AppointmentsModalTypes } from 'types/appointments';
import AddAppointmentsModal from '@components/Appointments/AddAppointmentsModal';
import DetailsAppointmentModal from '@components/Appointments/DetailsAppointmentModal';
import CalendarStyled from './CalendarStyled';
import Toolbar from './ToolBar';
import { CreateSlot } from './Slot';
import { SlotTypes, DateValues } from '../../types/calendar';

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');
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

  const handleViewChange = (newView: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleDateChange = (type: string) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      if (type === DateValues.next) {
        calendarApi.next();
      }

      if (type === DateValues.prev) {
        calendarApi.prev();
      }

      if (type === DateValues.today) {
        calendarApi.today();
      }

      setDate(calendarApi.getDate());
    }
  };

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
      <Toolbar date={date} view={view} onDateChange={handleDateChange} onChangeView={handleViewChange} />
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
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>
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
