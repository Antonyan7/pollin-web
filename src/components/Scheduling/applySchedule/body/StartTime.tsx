import React from 'react';
import { useTranslation } from 'react-i18next';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import DatePickerField from '../common/DatePickerField';
import useFieldControl from '../hooks/useFieldControl';
import useScheduleTimeValidation from '../hooks/useScheduleTimeValidation';
import { ApplyScheduleFields } from '../types';

const StartTime = () => {
  const { field } = useFieldControl(ApplyScheduleFields.START_SCHEDULE_DATE);

  const [t] = useTranslation();

  const startTimeLabel = t(Translation.PAGE_SCHEDULING_APPLY_DATE_START);
  const startDateCyId = CypressIds.PAGE_SCHEDULING_APPLY_DATE_START;

  const { startDateTimeErrorMessage } = useScheduleTimeValidation();

  return (
    <DatePickerField
      label={startTimeLabel}
      data-cy={startDateCyId}
      value={field.value}
      onChange={field.onChange}
      errorMessage={startDateTimeErrorMessage ?? ''}
    />
  );
};

export default StartTime;
