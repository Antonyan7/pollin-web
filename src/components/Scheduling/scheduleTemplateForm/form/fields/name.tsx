import React, { memo } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { schedulingSelector } from '@redux/slices/scheduling';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';

import { ScheduleFormFields } from '../../types';

const ScheduleTemplateName = () => {
  const [t] = useTranslation();
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = useAppSelector(schedulingSelector.scheduleError)?.response?.data.status.message;
  const templateNameCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME;
  const nameFieldPlaceholder = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME);
  const errorMessage =
    error ||
    (errors.name?.type === 'required' && t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME_ERROR)) ||
    (errors.name?.type === 'max' && t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_NAME_LENGTH_ERROR));

  return (
    <TextField
      {...register(ScheduleFormFields.Name)}
      data-cy={templateNameCyId}
      className="schedule-inputs"
      color="primary"
      fullWidth
      helperText={(errors.name?.message || error) && errorMessage}
      error={Boolean(errors.name?.message) || Boolean(error)}
      placeholder={nameFieldPlaceholder}
    />
  );
};

export default memo(ScheduleTemplateName);
