import chunk from 'lodash.chunk';
import { ISingleTemplate } from 'types/create-schedule';

import { setTimeToDate } from '@utils/date';
import { DateUtil } from '@utils/date/DateUtil';

export const calculateWeekByNumber = (day: number) => {
  if (day === 6) {
    return 0;
  }

  return day + 1;
};

export const sumIntervals = (intervals: Date[][]) => {
  const sortedIntervals = intervals.sort(
    (interval1: Date[], interval2: Date[]) => interval1[0].getTime() - interval2[0].getTime()
  );
  let maxTime = -Number.MAX_VALUE;
  let sumOfIntervalTime = 0;

  sortedIntervals.forEach((sortedInterval) => {
    const firstSortedIntervalTimeValue = sortedInterval[0].getTime();
    const secondSortedIntervalTimeValue = sortedInterval[1].getTime();

    maxTime = Math.max(maxTime, firstSortedIntervalTimeValue);
    sumOfIntervalTime += Math.max(0, secondSortedIntervalTimeValue - maxTime);
    maxTime = Math.max(maxTime, secondSortedIntervalTimeValue);
  });

  return sumOfIntervalTime;
};

export const areAllDaysFilled = (timePeriods: ISingleTemplate[], totalHours: number) => {
  const isFilledByDay: Date[][] = [];
  let result = 0;
  const allSelectedDays = timePeriods.reduce((previousWeekDays: number[], currentTimePeriod: ISingleTemplate) => {
    const oldWeekDays = Array.from(previousWeekDays, Number);
    const newWeekDays = Array.from(currentTimePeriod.days, Number);

    return [...new Set([...oldWeekDays, ...newWeekDays])];
  }, []);

  if (allSelectedDays.length === 7) {
    for (let i = 0; i < 7; i += 1) {
      const currentDay = DateUtil.representInClinicDate();

      timePeriods.forEach((item: ISingleTemplate) => {
        if (item.startTime && item.endTime && Array.from(item.days, Number).includes(i)) {
          const { startTime, endTime } = item;

          const startTimeDate = setTimeToDate(startTime, currentDay);
          const endTimeDate = setTimeToDate(endTime, currentDay);

          if (!isFilledByDay[i]) {
            isFilledByDay[i] = [];
          }

          isFilledByDay[i].push(startTimeDate, endTimeDate);
        }
      });
    }

    // Get sum of all Time Periods for each day
    result = isFilledByDay
      .map((timeUnit) => sumIntervals(chunk(timeUnit, 2)))
      .reduce((previous, current) => previous + current, 0);
  }

  return result === totalHours;
};
