import { roundUpTo } from '@constants';
import { format } from 'date-fns';

import { TIME_CONFIG } from './constants';

export const toRoundupTime = (selectedTime: Date | string | null) => {
  if (selectedTime) {
    const dateTime = new Date(selectedTime);
    const minutes = dateTime.getMinutes();
    const hours = dateTime.getHours();

    // ? When selected time is greater than maximum available time, then set maximum time value for as a rounding up time to avoid select working hours which are passed.
    if (hours >= 18 && minutes > 0) {
      dateTime.setMinutes(0);
    }

    const roundedTimeValue = Math.floor(dateTime.getTime() / roundUpTo);

    return new Date(roundedTimeValue * roundUpTo);
  }

  return null;
};

export const formatDate = (date: Date | null) =>
  date ? format(new Date(date), `MMM dd, yyy hh:mm a '[${TIME_CONFIG || ''}]'`) : '';
