import { roundUpTo } from '@constants';
import { format } from 'date-fns';

import { TIME_CONFIG } from './constants';

export const toRoundupTime = (time: Date | string | null) =>
  time ? new Date(Math.floor(new Date(time).getTime() / roundUpTo) * roundUpTo) : null;

export const formatDate = (date: Date | null) =>
  date ? format(new Date(date), `MMM dd, yyy hh:mm a '[${TIME_CONFIG || ''}]'`) : '';
