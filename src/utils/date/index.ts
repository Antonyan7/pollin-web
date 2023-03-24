import { format, isDate } from 'date-fns';
import { longWeekDays } from 'helpers/constants';

import { DateAcceptableType, DateUtil } from './DateUtil';

export const getWeekDayIndex = (date: Date | string) => {
  let weekName;

  if (isDate(date)) {
    weekName = format(date as Date, 'EEEE');
  } else {
    weekName = format(new Date(date), 'EEEE');
  }

  return longWeekDays.indexOf(weekName);
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

export const setTimeToDate = (dateString: DateAcceptableType, targetDate: Date = DateUtil.representInClinicDate()) => {
  const timeString = DateUtil.convertToTimeOnly(dateString);
  const [hours, minutes, seconds] = timeString.split(':').map((value) => +value);
  const dateInstance = new Date(targetDate);

  dateInstance.setHours(hours);
  dateInstance.setMinutes(minutes);
  dateInstance.setSeconds(seconds ?? 0);

  return dateInstance;
};
