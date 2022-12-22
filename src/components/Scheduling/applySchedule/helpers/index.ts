import { weekDays } from 'helpers/constants';
import { calculateWeekByNumber } from 'helpers/scheduling';
import { ISingleTemplate } from 'types/create-schedule';

export const convertStringDateToDate = (date: string) => date && new Date(date).setHours(0, 0, 0, 0);

export const getUniqueTimePeriodsApplyDates = (scheduleApplyTemplates: {
  name: string;
  timePeriods?: ISingleTemplate[];
}) => {
  // Extract unique time periods from schedule template
  const timePeriodsApplyDates: number[] = (scheduleApplyTemplates?.timePeriods ?? [])
    .map((item: ISingleTemplate) => item.days)
    .flat();

  return Array.from(new Set(timePeriodsApplyDates));
};

export const getApplyDaysToDisplay = (uniqueTimePeriodsApplyDates: number[]) => {
  // Pick all weekdays which includes in the current scheduleTemplate days
  const availableWeekDays = weekDays
    .map((_, index) => {
      if (uniqueTimePeriodsApplyDates.includes(calculateWeekByNumber(index))) {
        return index;
      }

      return undefined;
    })
    .filter((item) => Number.isInteger(item));

  return availableWeekDays;
};
