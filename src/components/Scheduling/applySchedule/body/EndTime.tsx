import React from 'react';
import { useTranslation } from 'react-i18next';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import DatePickerField from '../common/DatePickerField';
import useFieldControl from '../hooks/useFieldControl';
import useScheduleTimeValidation from '../hooks/useScheduleTimeValidation';
import { ApplyScheduleFields } from '../types';

const EndTime = () => {
  const { field } = useFieldControl(ApplyScheduleFields.END_SCHEDULE_DATE);

  const [t] = useTranslation();

  const endTimeLabel = t(Translation.PAGE_SCHEDULING_APPLY_DATE_END);
  const endDateCyId = CypressIds.PAGE_SCHEDULING_APPLY_DATE_END;

  const { endDateTimeErrorMessage } = useScheduleTimeValidation();

  return (
    <DatePickerField
      label={endTimeLabel}
      dataCy={endDateCyId}
      value={field.value}
      onChange={field.onChange}
      errorMessage={endDateTimeErrorMessage ?? ''}
    />
  );
};

export default EndTime;
