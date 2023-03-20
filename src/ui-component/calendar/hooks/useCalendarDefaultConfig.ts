import { CalendarOptions } from '@fullcalendar/core';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';

export const useCalendarDefaultConfig = () => {
  const { workingHours } = useAppSelector(coreSelector.clinicConfigs);

  const [hours, minutes, seconds] = workingHours.end.split(':');

  // to make end time visible in calendar
  const endTime = `${hours}:${+minutes + 10}:${seconds}`;

  const config: CalendarOptions = {
    rerenderDelay: 10,
    dayMaxEventRows: 3,
    headerToolbar: false,
    eventDisplay: 'block',
    height: 'auto',
    initialView: 'timeGridDay',
    allDaySlot: false,
    slotLabelFormat: [{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }],
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    slotMinTime: workingHours.start,
    slotMaxTime: endTime,
    slotDuration: '00:10',
    slotLabelInterval: '00:10',
    weekends: true,
    editable: false,
    droppable: false,
    selectable: true,
    nowIndicator: true,
    allDayMaintainDuration: true
  };

  return config;
};
