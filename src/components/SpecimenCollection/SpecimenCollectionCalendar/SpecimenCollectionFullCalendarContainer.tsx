import '@fullcalendar/react/dist/vdom';

import React from 'react';
import { ISpecimenCollectionSlot } from '@components/SpecimenCollection/SpecimenCollectionCalendar/SpecimenCollectionCalendarTypes';
import { CalendarOptions } from '@fullcalendar/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar, { Ref } from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';

import FULL_CALENDAR_DEFAULT_PROPS from '@ui-component/calendar/constants/fullCalendarDefaultProps';

interface Props {
  slots: ISpecimenCollectionSlot[];
  calendarRef: Ref<FullCalendar>;
  calendarDate: string;
}

const SpecimenCollectionFullCalendarContainer = ({ slots, calendarRef, calendarDate }: Props) => {
  const { timeZone } = useAppSelector(coreSelector.clinicConfigs);

  const onRangeSelect: CalendarOptions['select'] = () => {
    // TODO: open modal
  };

  const onEventClick: CalendarOptions['eventClick'] = () => {
    // TODO: pop the proper modal
  };

  return (
    <FullCalendar
      {...FULL_CALENDAR_DEFAULT_PROPS}
      timeZone={timeZone}
      events={slots}
      ref={calendarRef}
      select={onRangeSelect}
      eventClick={onEventClick}
      initialDate={calendarDate}
      plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
    />
  );
};

export default SpecimenCollectionFullCalendarContainer;
