/* eslint-disable simple-import-sort/imports */
import FullCalendar from '@fullcalendar/react';

import React, { useEffect, useRef, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRouter } from 'next/router';
import { CreateSlot } from '@ui-component/calendar/Slot';
import { changeDate, changeHours, getWeekDay } from '@utils/dateUtils';
import CalendarStyled from '../calendar/CalendarStyled';
import Toolbar from './ToolBar';
import { SlotTypes } from '../../types/calendar';
import { ISingleTemplate, ServiceTypeOrBlock } from '../../types/create-schedule';
import { ICalendarSlot } from '../../types/reduxTypes/booking';

const Calendar = (props: { calendarDate: string }) => {
  const { calendarDate } = props;
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState<ICalendarSlot[]>([]);
  const scheduleSingleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);

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

  useEffect(() => {
    const { scheduleId } = router.query;

    if (scheduleId && typeof scheduleId === 'string') {
      dispatch(schedulingMiddleware.getSingleSchedule(scheduleId));
    }
  }, [router.query]);

  useEffect(() => {
    const calendarEvents: ICalendarSlot[] = [];

    scheduleSingleTemplate.timePeriods.forEach((item: ISingleTemplate, index: number) => {
      if (getWeekDay(item.startTime) === getWeekDay(date)) {
        calendarEvents.push(
          CreateSlot(
            item.periodType === ServiceTypeOrBlock.ServiceType ? SlotTypes.schedule : SlotTypes.block,
            // TODO: remove changeHours function after actual server implementation
            changeHours(changeDate(item.startTime, date), index ? 8 : 10),
            changeHours(changeDate(item.endTime, date), index ? 8 : 10),
            item.periodType,
            item.placeholderName
          )
        );
      }
    });
    setSchedules(calendarEvents);
  }, [date, scheduleSingleTemplate.timePeriods]);

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
          ref={calendarRef}
          rerenderDelay={10}
          dayMaxEventRows={3}
          eventDisplay="block"
          events={schedules}
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
