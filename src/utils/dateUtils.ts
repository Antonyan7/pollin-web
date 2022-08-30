import { addMinutes, format, isValid, setDate, setHours, setMonth, setYear } from 'date-fns';

import { longWeekDays } from '../helpers/constants';

export const toIsoString = (value: Date) => {
  if (isValid(value)) {
    return format(value, "yyyy-MM-dd'T'HH:mm:ss'+00:00'");
  }

  return '';
};

export const utcDate = (date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hour = date.getHours();
  const min = date.getMinutes();

  return new Date(Date.UTC(year, month, day, hour, min));
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

  return toIsoString(date);
};

export const changeHours = (oldDate: string, newHour: number) => {
  const date = setHours(new Date(oldDate), newHour);

  return toIsoString(date);
};

export const linkDateAndTime = (date: Date | null, time: Date | null) => {
  let result;

  if (date && time) {
    const isoTime = toIsoString(time);
    const T = isoTime.indexOf('T');
    const customizedTime = isoTime.slice(T);
    const customizedDate = toIsoString(date).slice(0, T);

    result = customizedDate + customizedTime;
  }

  return result;
};
