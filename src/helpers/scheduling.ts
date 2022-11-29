import chunk from 'lodash.chunk';
import { ISingleTemplate } from 'types/create-schedule';

import { MAX_SELECTABLE_TIME } from '../constants/time';

export const calculateWeekByNumber = (day: number) => {
  if (day === 6) {
    return 0;
  }

  return day + 1;
};

export const calculateWeekDays = (weekDays: number[]) => weekDays.map((day) => calculateWeekByNumber(day));

export const sumIntervals = (intervals: string[][]) => {
  const sortedIntervals = intervals.sort(
    (interval1: string[], interval2: string[]) => new Date(interval1[0]).getTime() - new Date(interval2[0]).getTime()
  );
  let maxTime = -Number.MAX_VALUE;
  let sumOfIntervalTime = 0;

  sortedIntervals.forEach((sortedInterval) => {
    const firstSortedIntervalTimeValue = new Date(sortedInterval[0]).getTime();
    const secondSortedIntervalTimeValue = new Date(sortedInterval[1]).getTime();

    maxTime = Math.max(maxTime, firstSortedIntervalTimeValue);
    sumOfIntervalTime += Math.max(0, secondSortedIntervalTimeValue - maxTime);
    maxTime = Math.max(maxTime, secondSortedIntervalTimeValue);
  });

  return sumOfIntervalTime;
};

export const isAllDaysFilled = (timePeriods: ISingleTemplate[]) => {
  const isFilledByDay: string[][] = [];
  let result = 0;
  const allSelectedDays = timePeriods.reduce((previousWeekDays: number[], currentTimePeriod: ISingleTemplate) => {
    const oldWeekDays = Array.from(previousWeekDays, Number);
    const newWeekDays = Array.from(currentTimePeriod.days, Number);

    return [...new Set([...oldWeekDays, ...newWeekDays])];
  }, []);

  if (allSelectedDays.length === 7) {
    for (let i = 0; i < 7; i += 1) {
      timePeriods.forEach((item: ISingleTemplate) => {
        if (item.startTime && item.endTime && Array.from(item.days, Number).includes(i)) {
          const { startTime, endTime } = item;

          if (!isFilledByDay[i]) {
            isFilledByDay[i] = [startTime, endTime];
          } else {
            isFilledByDay[i].push(startTime, endTime);
          }
        }
      });
    }

    // Get sum of all Time Periods for each day
    result = isFilledByDay
      .map((timeUnit) => sumIntervals(chunk(timeUnit, 2)))
      .reduce((previous, current) => previous + current, 0);
  }

  return result === MAX_SELECTABLE_TIME;
};
