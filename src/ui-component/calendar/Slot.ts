import { Colors, SlotTypes, Styles } from '../../types/calendar';
import { ICalendarSlot } from '../../types/reduxTypes/booking';

export const CreateSlot = (
  type: SlotTypes,
  start: string,
  end: string,
  description: string,
  title: string,
  slotId?: string
): ICalendarSlot => {
  const BackgroundColors: Colors = {
    AppointmentBooked: '#18A0FB',
    BlockedSchedule: '',
    AppointmentCancelled: 'white',
    OpenSchedule: 'transparent'
  };

  const BorderColors: Colors = {
    AppointmentBooked: '',
    BlockedSchedule: 'white',
    AppointmentCancelled: '#18A0FB',
    OpenSchedule: '#B6B6B6'
  };

  const TextColors: Colors = {
    AppointmentBooked: 'white',
    BlockedSchedule: '#111111',
    AppointmentCancelled: '#18A0FB',
    OpenSchedule: '#B9B9B9'
  };

  const ClassNames: Styles = {
    AppointmentBooked: ['slot-border-radius', 'font-type'],
    BlockedSchedule: ['background-blocked', 'slot-border-radius', 'font-type'],
    AppointmentCancelled: ['slot-border-radius', 'font-type'],
    OpenSchedule: ['open-slot', 'font-type']
  };

  return {
    ...(slotId ? { id: slotId } : {}),
    classNames: ClassNames[type],
    ...(type === SlotTypes.schedule ? { display: 'background' } : {}),
    allDay: false,
    color: BackgroundColors[type],
    borderColor: BorderColors[type],
    textColor: TextColors[type],
    description,
    title,
    start,
    end
  };
};
