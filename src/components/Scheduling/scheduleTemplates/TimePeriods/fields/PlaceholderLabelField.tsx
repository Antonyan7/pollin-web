import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { ITemplateGroup } from 'types/create-schedule';

const PlaceholderLabelField: React.FC<{ index: number }> = ({ index }) => {
  const [t] = useTranslation();
  const { control } = useFormContext<ITemplateGroup>();
  const { field } = useController({ name: `timePeriods.${index}.placeholderName`, control });

  return (
    <TextField
      className="schedule-inputs"
      fullWidth
      color="primary"
      id="outlined-email-address"
      placeholder={t(Translation.PAGE_SCHEDULING_CREATE_TEMPLATES_PLACEHOLDER)}
      {...field}
    />
  );
};

export default PlaceholderLabelField;
