import { DateUtil } from '@utils/date/DateUtil';

export const calculateSlotEndDate = (startTime: string, timeUnits: number) => {
  const startMomentLocal = new Date(startTime);
  const endMomentLocal = new Date(startTime);

  endMomentLocal.setMinutes(startMomentLocal.getMinutes() + timeUnits * 10);

  return DateUtil.getLocalIsoString(endMomentLocal);
};
