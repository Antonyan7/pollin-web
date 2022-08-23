import { addMinutes, format } from 'date-fns';

export const toIsoString = (value: Date) => format(value, "yyyy-MM-dd'T'HH:mm:ss'+00:00'");

export const addMinutesToTheTime = (date: string, minutes: number) => {
  const dateForFormatting = new Date(date);

  return addMinutes(dateForFormatting, minutes);
};
