/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Translation } from 'constants/translations';

import { TODAYS_DATE } from '../constants';
import { convertStringDateToDate } from '../helpers';
import { ApplyScheduleFields } from '../types';

const useScheduleTimeValidation = () => {
  const { control } = useFormContext();

  const [startDate, endDate] = useWatch({
    name: [ApplyScheduleFields.START_SCHEDULE_DATE, ApplyScheduleFields.END_SCHEDULE_DATE],
    control
  });

  const [t] = useTranslation();

  const startDateTime = convertStringDateToDate(startDate);
  const endDateTime = convertStringDateToDate(endDate);

  const isStartDateLowerThanTodaysDate = startDateTime && startDateTime < TODAYS_DATE;
  const isEndDateLowerThanTodaysDate = endDateTime && endDateTime < TODAYS_DATE;
  const isStartDateGreaterThanEndDate = startDateTime && endDateTime && startDateTime > endDateTime;

  const startDateTimeErrorMessage = useMemo(() => {
    if (isStartDateLowerThanTodaysDate) {
      return t(Translation.PAGE_SCHEDULING_APPLY_DATE_START_BEFORE_TODAY_ERROR);
    }

    if (isStartDateGreaterThanEndDate) {
      return t(Translation.PAGE_SCHEDULING_APPLY_DATE_START_AFTER_END_DATE_ERROR);
    }

    return '';
  }, [isStartDateGreaterThanEndDate, isStartDateLowerThanTodaysDate]);

  const endDateTimeErrorMessage = useMemo(() => {
    if (isStartDateGreaterThanEndDate) {
      return t(Translation.PAGE_SCHEDULING_APPLY_DATE_END_BEFORE_START_DATE_ERROR);
    }

    if (isEndDateLowerThanTodaysDate) {
      return t(Translation.PAGE_SCHEDULING_APPLY_DATE_END_BEFORE_TODAY_ERROR);
    }

    return '';
  }, [isStartDateGreaterThanEndDate, isEndDateLowerThanTodaysDate]);

  return {
    startDateTimeErrorMessage,
    endDateTimeErrorMessage
  };
};

export default useScheduleTimeValidation;
