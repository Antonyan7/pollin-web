import { Colors, SlotTypes, Styles } from '../../types/calendar';
import { ICalendarSlot } from '../../types/reduxTypes/booking';

const shortAppointmentClassname = 'short-appointment';

const appointmentDuration = (start: string, end: string): number => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const duration = endTime - startTime;

  return duration / 60000;
};

export const CreateSlot = (
  type: SlotTypes,
  start: string,
  end: string,
  title: string,
  slotId?: string,
  color?: string
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

  const isAppointmentShort = appointmentDuration(start, end) <= 10 ? shortAppointmentClassname : [];

  return <ICalendarSlot>{
    ...(slotId ? { id: slotId } : {}),
    classNames: [...ClassNames[type], isAppointmentShort || []],
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
