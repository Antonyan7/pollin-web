import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch } from '@redux/hooks';
import { schedulingMiddleware } from '@redux/slices/scheduling';
import { viewsMiddleware } from '@redux/slices/views';
import { Translation } from 'constants/translations';
import { calculateWeekByNumber } from 'helpers/scheduling';
import { IApplyScheduleData } from 'types/create-schedule';

import { calculateTimeInUTC } from '@utils/dateUtils';

import { ApplyScheduleFields } from '../../types';

const useHandleApplySchedule = () => {
  const [t] = useTranslation();

  const { control } = useFormContext();
  const [resource, scheduleTemplate, repeatWeeksCount, selectedWeekdaysToApply, startScheduleDate, endScheduleDate] =
    useWatch({
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
    resource !== '' &&
    scheduleTemplate.id !== '' &&
    !!repeatWeeksCount &&
    selectedWeekdaysToApply.length > 0 &&
    !!startScheduleDate &&
    !!endScheduleDate;

  const handleApplySchedule = () => {
    if (isAllowedToApplySchedule) {
      const applyScheduleTemplateData: IApplyScheduleData = {
        resourceId: resource,
        templateId: scheduleTemplate.id,
        // Convert to number repeatWeeksCount which comes from autocomplete as a string
        repeatWeeksCount: +repeatWeeksCount,
        // Transform FE applyDays data to BE acceptable fix PCP-1477!
        applyDays: selectedWeekdaysToApply.map((item: number) => calculateWeekByNumber(item)),
        startDate: calculateTimeInUTC(startScheduleDate),
        endDate: calculateTimeInUTC(endScheduleDate)
      };

      dispatch(schedulingMiddleware.applyScheduleTemplate(applyScheduleTemplateData));
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
      dispatch(schedulingMiddleware.resetApplyStatusState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return {
    isAllowedToApplySchedule,
    handleApplySchedule
  };
};

export default useHandleApplySchedule;
