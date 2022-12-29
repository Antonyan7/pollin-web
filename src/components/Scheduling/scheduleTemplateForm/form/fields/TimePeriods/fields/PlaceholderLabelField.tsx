import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { CypressIds } from 'constants/cypressIds';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

const PlaceholderLabelField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();
  const { control } = useFormContext<ITemplateGroup>();
  const { field, fieldState } = useController({ name: `timePeriods.${index}.placeholderName`, control });
  const fieldPlaceholder = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER);
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER_ERROR);
  const placeholderCyId = CypressIds.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER;

  return (
    <TextField
      data-cy={placeholderCyId}
      className="schedule-inputs"
      fullWidth
      color="primary"
      id="outlined-email-address"
      helperText={fieldState?.error && errorMessage}
      error={Boolean(fieldState?.error)}
      placeholder={fieldPlaceholder}
      {...field}
      value={field.value}
      ref={field.ref}
    />
  );
};

export default PlaceholderLabelField;
