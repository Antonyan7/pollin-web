/* eslint-disable simple-import-sort/imports */
import FullCalendar from '@fullcalendar/react';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { dispatch, useAppSelector } from 'redux/hooks';
import { schedulingMiddleware, schedulingSelector } from 'redux/slices/scheduling';
import timelinePlugin from '@fullcalendar/timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useRouter } from 'next/router';
import { CreateSlot } from '@ui-component/calendar/Slot';
import { changeDateSameTime, excludeDates, getWeekDay } from '@utils/dateUtils';
import { SlotTypes } from 'types/calendar';
import { ISingleTemplate, PeriodType } from 'types/create-schedule';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';
import { isValid, setHours } from 'date-fns';
import { coreSelector } from '@redux/slices/core';
import Toolbar from './ToolBar';
import FullCalendarWrapper from '../calendar/FullCalendarWrapper';

const Calendar = () => {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  const [date, setDate] = useState(new Date());
  const scheduleSingleTemplate = useAppSelector(schedulingSelector.scheduleSingleTemplate);
  const { timeZone } = useAppSelector(coreSelector.clinicConfigs);

  const initialDate: Date = useMemo(() => {
    const todaysDay = getWeekDay(new Date());
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

    const nearestDate = setHours(excludeDates(new Date(), todaysDay - nearestDayOfWeek), 15);

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

      const viewTitle = calendarApi.currentDataManager?.getCurrentData().viewTitle as string;

      const getCurrentDate = new Date(viewTitle);

      setDate(getCurrentDate);
    }
  }, []);

  const onDateNextClick = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();

      const viewTitle = calendarApi.currentDataManager?.getCurrentData().viewTitle as string;

      const getCurrentDate = new Date(viewTitle);

      setDate(getCurrentDate);
    }
  }, []);

  const schedules = useMemo(() => {
    const calendarEvents: ICalendarSlot[] = [];

    scheduleSingleTemplate.timePeriods.forEach((item: ISingleTemplate) => {
      if (!isValid(date)) {
        return;
      }

      const isDaysContainingWeekDay = item.days.includes(getWeekDay(date));

      if (!isDaysContainingWeekDay || !initialDate) {
        return;
      }

      calendarEvents.push(
        CreateSlot(
          item.periodType === PeriodType.ServiceType ? SlotTypes.schedule : SlotTypes.block,
          changeDateSameTime(item.startTime as string, date),
          changeDateSameTime(item.endTime as string, date),
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

  return (
    <div style={{ position: 'relative' }}>
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
              timeZone={timeZone}
              displayEventTime={false}
              slotLabelFormat={[{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }]}
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
