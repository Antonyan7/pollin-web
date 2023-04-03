import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import { ScheduleFormFields } from '../../types';

const ScheduleTemplateName = () => {
  const [t] = useTranslation();
  const { register } = useFormContext();
  const templateNameCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME;
  const nameFieldPlaceholder = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME);

  return (
    <TextField
      {...register(ScheduleFormFields.Name)}
      data-cy={templateNameCyId}
      className="schedule-inputs"
      color="primary"
      fullWidth
      placeholder={nameFieldPlaceholder}
    />
  );
};

export default memo(ScheduleTemplateName);
