import { Translation } from 'constants/translations';
import { utcToZonedTime } from 'date-fns-tz';
import { t } from 'i18next';

import { monthNames, TIME_CONFIG } from './constants';

export const timeAdjuster = (date: Date | string) => {
  const customizedDate = `${monthNames[new Date(date).getMonth()]} ${new Date(date).getDate()}, ${new Date(
    date
  ).getFullYear()}`;
  const customizedTime = new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const customizedFullDate = `${customizedDate} ${customizedTime} ${TIME_CONFIG}`;

  const zonedTime = utcToZonedTime(date, 'utc');
  const customizedTimeWithAmOrPm = new Date(zonedTime).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const customizedTransportCreationDate = `${t(
    Translation.PAGE_SPECIMENS_TRACKING_TRANSPORTS_ADD_NEW_TRANSPORT_FOLDER_CREATION_DAY
  )} ${customizedTimeWithAmOrPm}`;

  return {
    customizedDate,
    customizedTime,
    customizedFullDate,
    customizedTransportCreationDate
  };
};
