import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import { Translation } from 'constants/translations';
import { maxLength } from 'helpers/constants';

const DescriptionField = () => {
  const [t] = useTranslation();
  const { control, register } = useFormContext();

  const descriptionFieldName = 'description';
  const addDescriptionLabel = t(Translation.PAGE_TASKS_MANAGER_MODAL_CREATE_PATIENT_DESCRIPTION_PLACEHOLDER);
  const { field } = useController({ control, name: descriptionFieldName });

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        {...register('description')}
        fullWidth
        id={descriptionFieldName}
        label={addDescriptionLabel}
        rows={4}
        inputProps={{ maxLength }}
        placeholder={addDescriptionLabel}
        multiline
      />
    </Grid>
  );
};

export default DescriptionField;
