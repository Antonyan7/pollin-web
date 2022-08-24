import { monthNames } from './constants';

export const timeAdjuster = (date: Date) => {
  const customizedDate = `${monthNames[new Date(date).getMonth()]} ${new Date(date).getDate()}, ${new Date(
    date
  ).getFullYear()}`;
  const customizedTime = new Date(date).toLocaleTimeString();

  return {
    customizedDate,
    customizedTime
  };
};
