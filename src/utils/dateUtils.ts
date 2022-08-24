import { addMinutes, format } from 'date-fns';

export const toIsoString = (value: Date) => format(value, "yyyy-MM-dd'T'HH:mm:ss'+00:00'");

export const addMinutesToTheTime = (date: string, minutes: number) => {
  const dateForFormatting = new Date(date);

  return addMinutes(dateForFormatting, minutes);
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
