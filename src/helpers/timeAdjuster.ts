import { monthNames } from './constants';

export const timeAdjuster = (date: Date) => {
  const customizedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const customizedTime = date.toLocaleTimeString();

  return {
    customizedDate,
    customizedTime
  };
};
