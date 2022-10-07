import { addMinutes, isValid, setDate, setHours, setMonth, setYear } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

import { ESTTimezone, longWeekDays } from '../helpers/constants';

export const neutralDateTime = 'T14:00:00-04:00';

export const toIsoString = (value: Date) => {
  if (isValid(value)) {
    return format(utcToZonedTime(new Date(value), 'Europe/London'), "yyyy-MM-dd'T'HH:mm:ss'+00:00'", {
      timeZone: 'Europe/London'
    });
  }

  return '';
};

export const toESTIsoString = (value: Date) => {
  if (isValid(value)) {
    return format(value, `yyyy-MM-dd'T'HH:mm:ss${ESTTimezone}`);
  }

  return '';
};

export const utcDate = (date: Date): Date => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDay();
  const hour = date.getUTCHours();
  const min = date.getUTCMinutes();
  const convertedDate = new Date();

  convertedDate.setFullYear(year);
  convertedDate.setMonth(month);
  convertedDate.setDate(day);
  convertedDate.setHours(hour);
  convertedDate.setMinutes(min);

  return convertedDate;
};

export const addMinutesToTime = (date: string, minutes: number) => {
  const dateForFormatting = new Date(date);

  return addMinutes(dateForFormatting, minutes);
};

export const getWeekDay = (date: string | Date) => {
  let weekName;

  if (typeof date === 'string') {
    weekName = format(new Date(date), 'EEEE');
  } else {
    weekName = format(date, 'EEEE');
  }

  return longWeekDays.indexOf(weekName);
};

export const changeDate = (oldDate: string, newDate: Date) => {
  const yearDate = setYear(new Date(oldDate), newDate.getFullYear());
  const monthDate = setMonth(yearDate, newDate.getMonth());
  const date = setDate(monthDate, newDate.getDate());

  return toESTIsoString(date);
};

export const changeDateSameTimezone = (oldDate: string, newDate: Date) => {
  const year = newDate.getFullYear();
  const month = newDate.toLocaleDateString('en-US', { month: '2-digit' });
  const day = newDate.toLocaleDateString('en-US', { day: '2-digit' });

  return `${year}-${month}-${day}${oldDate.slice(10)}`;
};

export const changeHours = (oldDate: string, newHour: number) => {
  const date = setHours(new Date(oldDate), newHour);

  return toIsoString(date);
};

export const linkDateAndTime = (date: Date | null, time: Date | null) => {
  let result;

  if (date && time) {
    const isoTime = toESTIsoString(time);
    const T = isoTime.indexOf('T');
    const customizedTime = isoTime.slice(T);
    const customizedDate = toESTIsoString(date).slice(0, T);

    result = customizedDate + customizedTime;
  }

  return result;
};
