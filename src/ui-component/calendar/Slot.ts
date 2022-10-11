import { Colors, SlotTypes, Styles } from '../../types/calendar';
import { ICalendarSlot } from '../../types/reduxTypes/booking';

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
    OpenSchedule: 'transparent'
  };

  const BorderColors: Colors = {
    AppointmentBooked: '',
    BlockedSchedule: 'white',
    AppointmentCancelled: '#18A0FB',
    OpenSchedule: '#B6B6B6'
  };

  const TextColors = {
    AppointmentColor: '#111111',
    AppointmentCancelled: '#18A0FB'
  };

  const ClassNames: Styles = {
    AppointmentBooked: ['slot-border-radius', 'font-type'],
    BlockedSchedule: ['background-blocked', 'slot-border-radius', 'font-type'],
    AppointmentCancelled: ['slot-border-radius', 'font-type'],
    OpenSchedule: ['open-slot', 'font-type']
  };

  return <ICalendarSlot>{
    ...(slotId ? { id: slotId } : {}),
    classNames: ClassNames[type],
    ...(type === SlotTypes.schedule ? { display: 'background' } : {}),
    allDay: false,
    color: type === SlotTypes.canceled ? BackgroundColors[type] : color,
    borderColor: type === SlotTypes.canceled ? BorderColors[type] : color,
    textColor: type === SlotTypes.canceled ? TextColors.AppointmentCancelled : TextColors.AppointmentColor,
    title,
    start,
    end
  };
};
