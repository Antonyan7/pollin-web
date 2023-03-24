import { roundUpTo } from '@constants';
import { useAppSelector } from '@redux/hooks';
import { coreSelector } from '@redux/slices/core';
import { IWorkingHoursConfig } from 'types/reduxTypes/coreStateTypes';

import { DateAcceptableType, DateUtil } from '@utils/date/DateUtil';

const fitTimeToConfig = (workingHours: IWorkingHoursConfig, value: string | Date | null) => {
  if (!value) {
    return '' as string;
  }

  const [startHours, startMinutes] = workingHours.start.split(':').map((element) => +element);
  const [endHours, endMinutes] = workingHours.end.split(':').map((element) => +element);
  const dateTime = new Date(value);
  const minutes = dateTime.getMinutes();
  const hours = dateTime.getHours();

  if (hours > endHours || (hours === endHours && minutes > endMinutes)) {
    dateTime.setHours(endHours);
    dateTime.setMinutes(endMinutes);
  } else if (hours < startHours || (hours === startHours && minutes < startMinutes)) {
    dateTime.setHours(startHours);
    dateTime.setMinutes(startMinutes);
  }

  const roundedTimeValue = Math.floor(dateTime.getTime() / roundUpTo);

  return new Date(roundedTimeValue * roundUpTo);
};

const getWorkingHours = (workingHours: IWorkingHoursConfig) => {
  const workingDays = 7; // TODO: PCP-7575: if we'll define it in clinic configs we need to update this

  const [startHours, startMinutes, startSeconds] = workingHours.start.split(':').map((element) => +element);
  const [endHours, endMinutes, endSeconds] = workingHours.end.split(':').map((element) => +element);

  const MIN_SELECTABLE_DATE_TIME = new Date(1970, 1, 1, startHours, startMinutes, startSeconds, 0);
  const MAX_SELECTABLE_DATE_TIME = new Date(1970, 1, 1, endHours, endMinutes, endSeconds, 0);
  const WORKING_DAY_DURATION = MAX_SELECTABLE_DATE_TIME.getTime() - MIN_SELECTABLE_DATE_TIME.getTime();
  const WORKING_WEEK_DURATION = workingDays * WORKING_DAY_DURATION;

  return { MIN_SELECTABLE_DATE_TIME, MAX_SELECTABLE_DATE_TIME, WORKING_DAY_DURATION, WORKING_WEEK_DURATION };
};

export const getFutureDate = (daysAmount: number): Date => {
  const currentClinicDate = DateUtil.representInClinicDate();
  const dateValue = currentClinicDate.getDate();

  currentClinicDate.setDate(dateValue + daysAmount);

  return currentClinicDate;
};

const useClinicConfig = () => {
  const { workingHours, timeZone, currentDate } = useAppSelector(coreSelector.clinicConfigs);
  const workingHoursConfig = getWorkingHours(workingHours);
  const futureDate180DaysLimit = getFutureDate(180);
  const fitSelectedTimeToConfig = (value: DateAcceptableType) => fitTimeToConfig(workingHours, value);

  return {
    timeZone,
    currentDate,
    ...workingHoursConfig,
    futureDate180DaysLimit,
    fitSelectedTimeToConfig
  };
};

export default useClinicConfig;
