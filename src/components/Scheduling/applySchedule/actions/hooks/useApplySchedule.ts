import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch } from '@redux/hooks';
import { schedulingMiddleware } from '@redux/slices/scheduling';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { calculateWeekByNumber } from 'helpers/scheduling';
import { IApplyScheduleData } from 'types/create-schedule';

import { DateUtil } from '@utils/date/DateUtil';

import { ApplyScheduleFields } from '../../types';

const useHandleApplySchedule = () => {
  const [t] = useTranslation();

  const { control, reset } = useFormContext();
  const [resourceId, scheduleTemplate, repeatWeeksCount, selectedWeekdaysToApply, startDate, endDate] = useWatch({
    name: [
      ApplyScheduleFields.RESOURCE,
      ApplyScheduleFields.SCHEDULE_TEMPLATE,
      ApplyScheduleFields.WEEKS_REPEAT_COUNT,
      ApplyScheduleFields.SELECTED_WEEKDAYS_TO_APPLY,
      ApplyScheduleFields.START_SCHEDULE_DATE,
      ApplyScheduleFields.END_SCHEDULE_DATE
    ],
    control
  });

  const isAllowedToApplySchedule =
    resourceId !== '' &&
    scheduleTemplate.id !== '' &&
    !!repeatWeeksCount &&
    selectedWeekdaysToApply.length > 0 &&
    !!startDate &&
    !!endDate;

  const handleApplySchedule = () => {
    if (isAllowedToApplySchedule) {
      const applyScheduleTemplateData: IApplyScheduleData = {
        resourceId,
        templateId: scheduleTemplate.id,
        // Convert to number repeatWeeksCount which comes from autocomplete as a date
        repeatWeeksCount: +repeatWeeksCount,
        applyDays: selectedWeekdaysToApply.map((item: number) => calculateWeekByNumber(item)),
        startDate: DateUtil.convertToDateOnly(startDate),
        endDate: DateUtil.convertToDateOnly(endDate)
      };

      dispatch(schedulingMiddleware.applyScheduleTemplate(applyScheduleTemplateData, reset));
    } else {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
    }
  };

  return {
    isAllowedToApplySchedule,
    handleApplySchedule
  };
};

export default useHandleApplySchedule;
