import React from 'react';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';

import useHandleApplySchedule from './hooks/useApplySchedule';
import useScheduleApplyStatusPopup from './hooks/useScheduleApplyStatusPopup';
import ApplyScheduleButton from './ApplyScheduleButton';

const FormActions = () => {
  const { isAllowedToApplySchedule, handleApplySchedule } = useHandleApplySchedule();
  const isScheduleLoading = useAppSelector(schedulingSelector.scheduleLoading);

  useScheduleApplyStatusPopup();

  return (
    <ApplyScheduleButton
      isScheduleLoading={isScheduleLoading}
      isAllowedToApplySchedule={isAllowedToApplySchedule}
      handleApplySchedule={handleApplySchedule}
    />
  );
};

export default FormActions;
