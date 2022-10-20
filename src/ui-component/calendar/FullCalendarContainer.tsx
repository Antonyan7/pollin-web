/* eslint-disable simple-import-sort/imports */
import React from 'react';
import FullCalendar, { Ref } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';

import useOnCalendarEventClick from './hooks/useOnCalenderEventClick';
import useOnRangeSelect from './hooks/useOnRangeSelect';
import FULL_CALENDAR_DEFAULT_PROPS from './constants/fullCalendarDefaultProps';

interface FullCalendarContainerProps {
  slots: ICalendarSlot[];
  calendarDate: string;
  calendarRef: Ref<FullCalendar>;
}

const FullCalendarContainer: React.FC<FullCalendarContainerProps> = ({ slots, calendarDate, calendarRef }) => {
  const onEventClick = useOnCalendarEventClick();
  const onRangeSelect = useOnRangeSelect();

  return (
    <FullCalendar
      {...FULL_CALENDAR_DEFAULT_PROPS}
      events={slots}
      ref={calendarRef}
      select={onRangeSelect}
      eventClick={onEventClick}
      initialDate={calendarDate}
      plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
    />
  );
};

export default FullCalendarContainer;
