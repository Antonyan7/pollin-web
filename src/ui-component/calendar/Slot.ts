import { Colors, SlotTypes, Styles } from 'types/calendar';
import { ICalendarSlot } from 'types/reduxTypes/bookingStateTypes';

const shortAppointmentClassName = 'short-appointment';

const appointmentDuration = (start: Date, end: Date): number => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const duration = endTime - startTime;

  return duration / 60000;
};

export const CreateSlot = (
  type: SlotTypes,
  start: Date,
  end: Date,
  title: string,
  slotId?: string,
  color?: string,
  addonClasses?: string[]
): ICalendarSlot => {
  const BackgroundColors: Colors = {
    AppointmentBooked: '#18A0FB',
    BlockedSchedule: '',
    AppointmentCancelled: 'white',
    OpenSchedule: 'transparent',
    ServiceType: 'transparent'
  };

  const BorderColors: Colors = {
    AppointmentBooked: '#B6B6B6',
    BlockedSchedule: '#B6B6B6',
    AppointmentCancelled: '#18A0FB',
    OpenSchedule: '#B6B6B6',
    ServiceType: '#B6B6B6'
  };

  const TextColors = {
    AppointmentColor: '#202e27',
    AppointmentCancelled: '#18A0FB'
  };

  const ClassNames: Styles = {
    AppointmentBooked: ['font-type'],
    BlockedSchedule: ['background-blocked', 'font-type'],
    AppointmentCancelled: ['font-type'],
    OpenSchedule: ['open-slot', 'font-type'],
    ServiceType: ['open-slot', 'font-type']
  };

  const isAppointmentShort = appointmentDuration(start, end) <= 10 ? [shortAppointmentClassName] : [];
  const classNames = ClassNames[type] ? [...ClassNames[type], ...isAppointmentShort] : isAppointmentShort;

  if (addonClasses) {
    classNames.push(...addonClasses);
  }

  return <ICalendarSlot>{
    ...(slotId ? { id: slotId } : {}),
    classNames,
    ...(type === SlotTypes.schedule || type === SlotTypes.serviceType ? { display: 'background' } : {}),
    allDay: false,
    color: type === SlotTypes.canceled ? BackgroundColors[type] : color,
    borderColor: type === SlotTypes.canceled ? BorderColors[type] : color,
    textColor: type === SlotTypes.canceled ? TextColors.AppointmentCancelled : TextColors.AppointmentColor,
    title,
    start,
    end
  };
};

export const calculateSlotEndDate = (startTime: string, timeUnits: number): Date => {
  const startMomentLocal = new Date(startTime);
  const endMomentLocal = new Date(startTime);

  endMomentLocal.setMinutes(startMomentLocal.getMinutes() + timeUnits * 10);

  return endMomentLocal;
};
