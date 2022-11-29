import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

const PlaceholderLabelField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();
  const { control, formState, getValues } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.placeholderName`, control });
  const {
    errors: { timePeriods }
  } = formState;
  const placeholderError = timePeriods?.[index]?.placeholderName;
  const placeholderField = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER);
  const errorMessage = t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER_ERROR);
  const placeholderValue = getValues().timePeriods[index]?.placeholderName;

  return (
    <TextField
      className="schedule-inputs"
      fullWidth
      color="primary"
      id="outlined-email-address"
      helperText={placeholderError?.message && errorMessage}
      error={Boolean(placeholderError)}
      placeholder={placeholderField}
      {...field}
      value={placeholderValue}
    />
  );
};

export default PlaceholderLabelField;
