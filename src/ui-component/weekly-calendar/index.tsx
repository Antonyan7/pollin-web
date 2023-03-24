/* eslint-disable simple-import-sort/imports */

import { ISingleTemplate, PeriodType } from 'types/create-schedule';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { dispatch, useAppSelector } from 'redux/hooks';
import { getWeekDayIndex, setTimeToDate } from '@utils/date';
import { isValid, setHours, subDays } from 'date-fns';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';

import { CreateSlot } from '@ui-component/calendar/Slot';
import { CypressIds } from 'constants/cypressIds';
import FullCalendar from '@fullcalendar/react';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';
import { SlotTypes } from 'types/calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { useRouter } from 'next/router';
import Toolbar from './ToolBar';
import FullCalendarWrapper from '../calendar/FullCalendarWrapper';

const Calendar = () => {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const scheduleSingleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);

  const initialDate: Date = useMemo(() => {
    const todaysDay = getWeekDayIndex(new Date());
    let selectedWeekDays: number[] = [];
    let nearestDayOfWeek: number;

    scheduleSingleTemplate.timePeriods.forEach((item: ISingleTemplate) => {
      selectedWeekDays = [...selectedWeekDays, ...item.days];
    });

    if (selectedWeekDays.includes(todaysDay)) {
      nearestDayOfWeek = todaysDay;
    } else {
      const greaterDays = selectedWeekDays.filter((item: number) => item > todaysDay);

      if (greaterDays.length) {
        nearestDayOfWeek = Math.min(...greaterDays);
      } else {
        nearestDayOfWeek = Math.min(...selectedWeekDays);
      }
    }

    const nearestDate = setHours(subDays(new Date(), todaysDay - nearestDayOfWeek), 15);

    setDate(nearestDate);

    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.gotoDate(nearestDate);
    }

    return nearestDate;
  }, [scheduleSingleTemplate.timePeriods]);

  const onDatePrevClick = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();

      const currentDate = calendarApi.getDate();

      setDate(currentDate);
    }
  }, []);

  const onDateNextClick = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();

      const currentDate = calendarApi.getDate();

      setDate(currentDate);
    }
  }, []);

  const schedules = useMemo(() => {
    const calendarEvents: ICalendarSlot[] = [];

    scheduleSingleTemplate.timePeriods.forEach((item: ISingleTemplate) => {
      if (!isValid(date)) {
        return;
      }

      const isDaysContainingWeekDay = item.days.includes(getWeekDayIndex(date));

      if (!isDaysContainingWeekDay || !initialDate) {
        return;
      }

      calendarEvents.push(
        CreateSlot(
          item.periodType === PeriodType.ServiceType ? SlotTypes.schedule : SlotTypes.block,
          setTimeToDate(item.startTime as Date, date),
          setTimeToDate(item.endTime as Date, date),
          item.placeholderName,
          item.periodType
        )
      );
    });

    return calendarEvents;
  }, [date, initialDate, scheduleSingleTemplate.timePeriods]);

  useEffect(() => {
    const { scheduleId } = router.query;

    if (scheduleId && typeof scheduleId === 'string') {
      dispatch(schedulingMiddleware.getSingleSchedule(scheduleId));
    }
  }, [router.query]);

  const fullCalendarComponentCypressId = CypressIds.COMMON_FULL_CALENDAR_COMPONENT;

  return (
    <div style={{ position: 'relative' }} data-cy={fullCalendarComponentCypressId}>
      <FullCalendarWrapper>
        {isValid(initialDate) && (
          <>
            <Toolbar date={date} onClickNext={onDateNextClick} onClickPrev={onDatePrevClick} />
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
              initialDate={initialDate}
              initialView="timeGridDay"
              displayEventTime={false}
              slotLabelFormat={[{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }]}
              eventTimeFormat={{ hour: 'numeric', minute: '2-digit', hour12: false }}
              allDaySlot={false}
              slotMinTime="07:00:00"
              slotMaxTime="18:10:00"
              slotDuration="00:10"
              slotLabelInterval="00:10"
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </>
        )}
      </FullCalendarWrapper>
    </div>
  );
};

export default Calendar;
