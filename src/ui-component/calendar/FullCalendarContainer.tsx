/* eslint-disable simple-import-sort/imports */
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';

import { EventClickArg } from '@fullcalendar/common';
import useOnRangeSelect from './hooks/useOnRangeSelect';
import { useCalendarDefaultConfig } from './hooks/useCalendarDefaultConfig';

interface FullCalendarContainerProps {
  slots: ICalendarSlot[];
  calendarDate: Date;
  calendarRef: FullCalendar['elRef'];
  onEventClick: (initialEventObject: EventClickArg) => void;
}

const FullCalendarContainer: React.FC<FullCalendarContainerProps> = ({
  slots,
  calendarDate,
  calendarRef,
  onEventClick
}) => {
  const onRangeSelect = useOnRangeSelect();
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
