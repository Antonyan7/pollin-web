import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { applyScheduleFormInitialValues } from '@components/Scheduling/applySchedule/constants/defaultValues';
import { SeveritiesType } from '@components/Scheduling/types';
import { dispatch, useAppSelector } from '@redux/hooks';
import { schedulingMiddleware, schedulingSelector } from '@redux/slices/scheduling';
import { viewsMiddleware } from '@redux/slices/views';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

const useScheduleApplyStatusPopup = () => {
  const scheduleApplyStatus = useAppSelector(schedulingSelector.scheduleApplyStatus);
  const scheduleApplyErrorMessage = useAppSelector(schedulingSelector.scheduleError)?.response?.data?.status?.message;

  const [t] = useTranslation();
  const { reset } = useFormContext();

  useEffect(() => {
    if (scheduleApplyStatus.success) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.success,
            description: t(Translation.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS),
            dataCy: CypressIds.PAGE_SCHEDULING_APPLY_ALERT_SUCCESS
          }
        })
      );
      reset(applyScheduleFormInitialValues);
    } else if (scheduleApplyStatus.fail) {
      dispatch(
        viewsMiddleware.setToastNotificationPopUpState({
          open: true,
          props: {
            severityType: SeveritiesType.error,
            description: scheduleApplyErrorMessage ?? t(Translation.PAGE_SCHEDULING_APPLY_ALERT_ERROR)
          }
        })
      );
    }

    dispatch(schedulingMiddleware.resetApplyStatusState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleApplyStatus.success, scheduleApplyStatus.fail]);
};

export default useScheduleApplyStatusPopup;
