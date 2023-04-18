/* eslint-disable simple-import-sort/imports */

import { DateSelectArg, EventClickArg } from '@fullcalendar/common';
import React from 'react';

import FullCalendar from '@fullcalendar/react';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useCalendarDefaultConfig } from './hooks/useCalendarDefaultConfig';

interface FullCalendarContainerProps {
  slots: ICalendarSlot[];
  calendarDate: Date;
  calendarRef: FullCalendar['elRef'];
  onEventClick: (initialEventObject: EventClickArg) => void;
  onRangeSelect?: (arg: DateSelectArg) => void;
}

const FullCalendarContainer: React.FC<FullCalendarContainerProps> = ({
  slots,
  calendarDate,
  calendarRef,
  onEventClick,
  onRangeSelect
}) => {
  const calendarDefaultConfig = useCalendarDefaultConfig();

  return (
    <FullCalendar
      {...calendarDefaultConfig}
      events={slots}
      ref={calendarRef}
      select={onRangeSelect as () => void}
      eventClick={onEventClick as () => void}
      initialDate={calendarDate}
      plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
    />
  );
};

export default FullCalendarContainer;
