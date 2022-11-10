import { addMinutes, formatISO, isValid, setDate, setMonth, setYear, subDays } from 'date-fns';
import { format } from 'date-fns-tz';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import store from 'redux/store';

import { longWeekDays, TIME_CONFIG, UTCTimezone } from '../helpers/constants';

dayjs.extend(utc);
dayjs.extend(timezone);

export const neutralDateTime = `T14:00:00${UTCTimezone}`;

export const futureDate180DaysAfter = new Date(new Date().setDate(new Date().getDate() + 180));

export const toUTCIsoString = (value: Date) => {
  if (isValid(value)) {
    return format(value, `yyyy-MM-dd'T'HH:mm:ss${UTCTimezone}`);
  }

  return '';
};

export const toLocalIsoString = (value: Date | null) => {
  if (value && isValid(value)) {
    return formatISO(value);
  }

  return '';
};

export const changeTimezone = (date: string | Date, toTimezone: string) => {
  if (!date) {
    return '';
  }

  if (typeof date === 'string') {
    return `${date.slice(0, 10)}T${date.slice(11, 19)}${toTimezone}`;
  }

  const dateWithTimezone = toLocalIsoString(date);

  return `${dateWithTimezone.slice(0, 10)}T${dateWithTimezone.slice(11, 19)}${toTimezone}`;
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

export const excludeDates = (date: Date, days: number) => subDays(date, days);

export const changeDate = (oldDate: string, newDate: Date) => {
  const yearDate = setYear(new Date(oldDate), newDate.getFullYear());
  const monthDate = setMonth(yearDate, newDate.getMonth());
  const date = setDate(monthDate, newDate.getDate());

  return toUTCIsoString(date);
};

export const changeDateSameTime = (oldDate: string, newDate: Date) => {
  const year = newDate.getFullYear();
  const month = newDate.toLocaleDateString('en-US', { month: '2-digit' });
  const day = newDate.toLocaleDateString('en-US', { day: '2-digit' });

  return `${year}-${month}-${day}${oldDate.slice(10)}`;
};

export const getTimezoneOffset = () => {
  const { currentDate } = store.getState().core.clinicConfig;

  return currentDate.slice(-6);
};

export const calculateTimeInUTC = (date: string) => {
  const timezoneOffset = getTimezoneOffset();

  if (timezoneOffset[0] === '-') {
    const utcDate = dayjs(date)
      .add(Number(timezoneOffset.slice(1, 3)) * 60 + Number(timezoneOffset.slice(4, 6)), 'minutes')
      .format();

    return changeTimezone(utcDate, UTCTimezone);
  }

  const utcDate = dayjs(date)
    .subtract(Number(timezoneOffset.slice(1, 3)) * 60 + Number(timezoneOffset.slice(4, 6)), 'minutes')
    .format();

  return changeTimezone(utcDate, UTCTimezone);
};

export const changeDateSameTimeString = (oldDate: string, newDate: string) => {
  const year = newDate.slice(0, 4);
  const month = newDate.slice(5, 7);
  const day = newDate.slice(8, 10);

  return `${year}-${month}-${day}${oldDate.slice(10)}`;
};

export const linkDateAndTime = (date: Date | null, time: Date | null) => {
  let result = '';

  if (date && time) {
    const isoTime = formatISO(time);
    const T = isoTime.indexOf('T');
    const customizedTime = isoTime.slice(T);
    const customizedDate = formatISO(date).slice(0, T);

    result = customizedDate + customizedTime;
  }

  return result;
};

export const convertToLocale = (value?: string) => {
  if (!value) {
    return '';
  }

  const offset = new Date().getTimezoneOffset();
  const absoluteOffset = Math.abs(offset);

  const date = value.slice(0, 19);
  const sign = offset < 0 ? '+' : '-';
  const hours = `00${Math.floor(absoluteOffset / 60)}`.slice(-2);
  const minutes = `00${absoluteOffset % 60}`.slice(-2);

  return `${date}${sign}${hours}:${minutes}`;
};

export const calculateEndTime = (startTime: string, timeUnits: number) => {
  const startDateTimezone = startTime.slice(-6);

  const startTimeInLocal = convertToLocale(startTime);
  const endTime = dayjs(startTimeInLocal)
    .add(timeUnits * 10, 'minutes')
    .format();

  return changeTimezone(endTime, startDateTimezone);
};

export const dateInputValue = (date: string) => {
  if (!date) {
    return '';
  }

  const initialDate = convertToLocale(date);

  return dayjs(initialDate).format(`MMM DD, YYYY HH:mm a [${TIME_CONFIG || ''}]`);
};
