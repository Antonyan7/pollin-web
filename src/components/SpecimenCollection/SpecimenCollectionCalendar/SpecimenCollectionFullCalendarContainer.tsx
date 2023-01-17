import React from 'react';
import { ISpecimenCollectionSlot } from '@components/SpecimenCollection/SpecimenCollectionCalendar/SpecimenCollectionCalendarTypes';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';

import FULL_CALENDAR_DEFAULT_PROPS from '@ui-component/calendar/constants/fullCalendarDefaultProps';

import useOnSpecimenCollectionEventClick from './hooks/useOnSpecimenCollectionEventClick';

interface Props {
  slots: ISpecimenCollectionSlot[];
  calendarRef: FullCalendar['elRef'];
  calendarDate: string;
}

const SpecimenCollectionFullCalendarContainer = ({ slots, calendarRef, calendarDate }: Props) => {
  const { timeZone } = useAppSelector(coreSelector.clinicConfigs);

  const onRangeSelect: CalendarOptions['select'] = () => {
    // TODO: open modal
  };

  const onEventClick = useOnSpecimenCollectionEventClick();

  return (
    <FullCalendar
      {...FULL_CALENDAR_DEFAULT_PROPS}
      timeZone={timeZone}
      events={slots}
      ref={calendarRef}
      select={() => onRangeSelect}
      eventClick={onEventClick as () => void}
      initialDate={calendarDate}
      plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
    />
  );
};

export default SpecimenCollectionFullCalendarContainer;
