import React from 'react';

import useHandleApplySchedule from './hooks/useApplySchedule';
import useScheduleApplyStatusPopup from './hooks/useScheduleApplyStatusPopup';
import ApplyScheduleButton from './ApplyScheduleButton';

const FormActions = () => {
  const { isAllowedToApplySchedule, handleApplySchedule } = useHandleApplySchedule();

  useScheduleApplyStatusPopup();

  return (
    <ApplyScheduleButton
      isAllowedToApplySchedule={isAllowedToApplySchedule}
      handleApplySchedule={handleApplySchedule}
    />
  );
};

export default FormActions;
