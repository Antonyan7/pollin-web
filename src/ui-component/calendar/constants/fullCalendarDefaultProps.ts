import { CalendarOptions } from '@fullcalendar/common';

const FULL_CALENDAR_DEFAULT_PROPS: CalendarOptions = {
  rerenderDelay: 10,
  dayMaxEventRows: 3,
  headerToolbar: false,
  eventDisplay: 'block',
  height: 'auto',
  initialView: 'timeGridDay',
  slotLabelFormat: [{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }],
  eventTimeFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
  allDaySlot: false,
  slotMinTime: '07:00:00',
  slotMaxTime: '18:10:00',
  slotDuration: '00:10',
  slotLabelInterval: '00:10',
  weekends: true,
  editable: false,
  droppable: false,
  selectable: true,
  nowIndicator: true,
  allDayMaintainDuration: true
};

export default FULL_CALENDAR_DEFAULT_PROPS;
