import { timeAdjuster } from 'helpers/timeAdjuster';

export const encountersCustomizedDate = (date: Date | string) => {
  const { customizedDate, customizedTime } = timeAdjuster(date);
  const fullTime = `${customizedDate} - ${customizedTime}`;

  return fullTime;
};
