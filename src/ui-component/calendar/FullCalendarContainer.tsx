/* eslint-disable simple-import-sort/imports */
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';

import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';
import useOnCalendarEventClick from './hooks/useOnCalenderEventClick';
import useOnRangeSelect from './hooks/useOnRangeSelect';
import FULL_CALENDAR_DEFAULT_PROPS from './constants/fullCalendarDefaultProps';

interface FullCalendarContainerProps {
  slots: ICalendarSlot[];
  calendarDate: string;
  calendarRef: FullCalendar['elRef'];
}

const FullCalendarContainer: React.FC<FullCalendarContainerProps> = ({ slots, calendarDate, calendarRef }) => {
  const onEventClick = useOnCalendarEventClick();
  const onRangeSelect = useOnRangeSelect();
  const { timeZone } = useAppSelector(coreSelector.clinicConfigs);

  return (
    <FullCalendar
      {...FULL_CALENDAR_DEFAULT_PROPS}
      timeZone={timeZone}
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
