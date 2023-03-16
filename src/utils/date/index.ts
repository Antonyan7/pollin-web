import { format, isDate } from 'date-fns';
import { longWeekDays } from 'helpers/constants';

import { DateUtil } from './DateUtil';

export const getWeekDayIndex = (date: Date | string) => {
  let weekName;

  if (isDate(date)) {
    weekName = format(date as Date, 'EEEE');
  } else {
    weekName = format(new Date(date), 'EEEE');
  }

  return longWeekDays.indexOf(weekName);
};

export const calculateSlotEndDate = (startTime: string, timeUnits: number) => {
  const startMomentLocal = new Date(startTime);
  const endMomentLocal = new Date(startTime);

  endMomentLocal.setMinutes(startMomentLocal.getMinutes() + timeUnits * 10);

  return DateUtil.getLocalIsoString(endMomentLocal);
};

export const compareStartAndEndTime = (startDate: Date | string | null, endDate: Date | string | null) => {
  if (!startDate || !endDate) {
    return false;
  }

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setFullYear(today.getFullYear());
  start.setMonth(today.getMonth());
  start.setDate(today.getDate());
  end.setFullYear(today.getFullYear());
  end.setMonth(today.getMonth());
  end.setDate(today.getDate());

  return start.valueOf() > end.valueOf();
};
