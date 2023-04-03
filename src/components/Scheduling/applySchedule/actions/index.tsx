import React from 'react';

import useHandleApplySchedule from './hooks/useApplySchedule';
import ApplyScheduleButton from './ApplyScheduleButton';

const FormActions = () => {
  const { isAllowedToApplySchedule, handleApplySchedule } = useHandleApplySchedule();

  return (
    <ApplyScheduleButton
      isAllowedToApplySchedule={isAllowedToApplySchedule}
      handleApplySchedule={handleApplySchedule}
    />
  );
};

export default FormActions;
