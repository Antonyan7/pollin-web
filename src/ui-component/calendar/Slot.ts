import { EventInput } from '@fullcalendar/common';
import { set } from 'date-fns';

import { Colors, SlotTypes, Styles } from '../../types/calendar';

export const CreateSlot = (
  type: SlotTypes,
  start: string,
  end: string,
  description: string,
  title: string,
  slotId: string
): EventInput => {
  const BackgroundColors: Colors = {
    Default: '#18A0FB',
    BlockedOffTime: '',
    Cancelled: 'white',
    Placeholder: 'white'
  };

  const BorderColors: Colors = {
    Default: '',
    BlockedOffTime: 'white',
    Cancelled: '#18A0FB',
    Placeholder: '#B6B6B6'
  };

  const TextColors: Colors = {
    Default: 'white',
    BlockedOffTime: '#111111',
    Cancelled: '#18A0FB',
    Placeholder: '#B9B9B9'
  };

  const ClassNames: Styles = {
    Default: ['slot-border-radius', 'font-type'],
    BlockedOffTime: ['background-blocked', 'slot-border-radius', 'font-type'],
    Cancelled: ['slot-border-radius', 'font-type'],
    Placeholder: ['open-slot', 'font-type']
  };

  return {
    id: slotId,
    classNames: ClassNames[type],
    allDay: false,
    color: BackgroundColors[type],
    borderColor: BorderColors[type],
    textColor: TextColors[type],
    description,
    title,
    start: set(new Date(), { hours: 10, minutes: 30 }),
    end: set(new Date(), { hours: 13, minutes: 30 })
  };
};
