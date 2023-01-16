import { roundUpTo } from '@constants';
import { format } from 'date-fns';

import { pickOnlyValidTime } from '@utils/dateUtils';

import { TIME_CONFIG } from './constants';

export const toRoundupTime = (selectedTime: Date | string | null) => {
  if (selectedTime) {
    const dateTime = pickOnlyValidTime(selectedTime);

    const roundedTimeValue = Math.floor(dateTime.getTime() / roundUpTo);

    return new Date(roundedTimeValue * roundUpTo);
  }

  return null;
};

export const formatDate = (date: Date | null) =>
  date ? format(new Date(date), `MMM dd, yyy hh:mm a '[${TIME_CONFIG || ''}]'`) : '';
