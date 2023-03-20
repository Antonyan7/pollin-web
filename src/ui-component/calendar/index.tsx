/* eslint-disable simple-import-sort/imports */
import React, { useEffect, useMemo, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import { IAppointment } from 'types/reduxTypes/bookingStateTypes';
import { CypressIds } from 'constants/cypressIds';
import { EventClickArg } from '@fullcalendar/common';
import { CreateSlot } from './Slot';
import { StyledDisabledLayer } from './StyledDisabledLayer';
import FullCalendarContainer from './FullCalendarContainer';
import FullCalendarWrapper from './FullCalendarWrapper';
import { CalendarLoading } from './CalendarLoading';
import { calculateSlotEndDate } from './util/calendarUtils';

interface CalendarProps {
  calendarDate: Date;
  onEventClick: (initialEventObject: EventClickArg) => void;
  disable: {
    state: boolean;
    title: string;
  };
  appointments: {
    list: IAppointment[];
    isLoading: boolean;
    slotStyleCallback?: <T extends IAppointment>(appointment: T) => string[];
  };
}

const Calendar: React.FC<CalendarProps> = ({ calendarDate, onEventClick, disable, appointments }) => {
  const calendarRef = useRef<FullCalendar>(null);
  const fullCalendarComponentCypressId = CypressIds.COMMON_FULL_CALENDAR_COMPONENT;

  const slots = useMemo(
    () =>
      appointments.list?.map((item: IAppointment) =>
        CreateSlot(
          item.type,
          item.startTime,
          calculateSlotEndDate(item.startTime, item.timeUnits),
          item.title,
          item.id,
          item.color,
          appointments.slotStyleCallback?.(item)
        )
      ) ?? [],
    [appointments]
  );

  useEffect(() => {
    if (calendarDate) {
      const calendarComponent = calendarRef.current;

      if (calendarComponent) {
        const calendarApi = calendarComponent.getApi();

        calendarApi.gotoDate(calendarDate);
      }
    }
  }, [calendarDate, calendarRef]);

  return (
    <div style={{ position: 'relative' }} data-cy={fullCalendarComponentCypressId}>
      {appointments.isLoading ? <CalendarLoading /> : null}
      <FullCalendarWrapper>
        {disable.state ? <StyledDisabledLayer>{disable.title}</StyledDisabledLayer> : null}
        <FullCalendarContainer
          slots={slots}
          calendarDate={calendarDate}
          calendarRef={calendarRef}
          onEventClick={onEventClick}
        />
      </FullCalendarWrapper>
    </div>
  );
};

export default Calendar;
