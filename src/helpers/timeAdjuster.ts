import { monthNames } from './constants';

export const timeAdjuster = (date: Date | string) => {
  const customizedDate = `${monthNames[new Date(date).getMonth()]} ${new Date(date).getDate()}, ${new Date(
    date
  ).getFullYear()}`;
  const customizedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const customizedFullDate = `${customizedDate} ${customizedTime} [EST]`;

  return {
    customizedDate,
    customizedTime,
    customizedFullDate
  };
};
