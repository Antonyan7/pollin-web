/* eslint-disable simple-import-sort/imports */

import React, { useRef, useState } from 'react';
// The import order DOES MATTER here. If you change it, you'll get an error!
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Theme, useMediaQuery } from '@mui/material';
import CalendarStyled from './CalendarStyled';
import Toolbar from './ToolBar';
import { CreateSlot } from './Slot';
import { SlotTypes, DateValues } from '../../types/calendar';

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const matchSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(matchSm ? 'listWeek' : 'dayGridMonth');

  const events = [
    CreateSlot(SlotTypes.default, 'start', 'end', 'description', 'Jane Doe | D&C | Confirmed'),
    CreateSlot(SlotTypes.canceled, 'start', 'end', 'cancel', 'Title'),
    CreateSlot(SlotTypes.blockedOffTime, 'start', 'end', 'cancel', 'Title'),
    CreateSlot(SlotTypes.placeholder, 'start', 'end', 'cancel', 'Title')
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
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>
    </div>
  );
};

export default Calendar;
