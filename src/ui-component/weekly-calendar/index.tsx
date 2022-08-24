/* eslint-disable simple-import-sort/imports */
import FullCalendar from '@fullcalendar/react';

import React, { useRef, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';

import CalendarStyled from '../calendar/CalendarStyled';
import Toolbar from './ToolBar';

const Calendar = (props: { calendarDate: string }) => {
  const { calendarDate } = props;
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());

  const onDateChangeToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };
  const onDatePrevClick = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const onDateNextClick = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          onClickNext={onDateNextClick}
          onClickPrev={onDatePrevClick}
          onClickToday={onDateChangeToday}
        />
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          ref={calendarRef}
          rerenderDelay={10}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          height="auto"
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
